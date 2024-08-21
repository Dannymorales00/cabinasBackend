import { Request, Response } from "express";
import Usuario from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import random from 'string-random';
import sendEmail from '../helpers/mail';



const getUsers = async (_req: Request, _res: Response) => {
  const users = await Usuario.findAll({ attributes: { exclude: ['contrasena'] } });
  return _res.send(users);
};

const getUser = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  const tokenData: any = _req.headers['tokenData'];

  if (tokenData.tipo !== "Administrador" && tokenData.id != id) {
    return _res.status(404).send({ msg: `no tienes acceso al usuario del id: ${id}` });
  }

  const user = await Usuario.findByPk(id, { attributes: { exclude: ['contrasena'] } });
  if (user) {
    return _res.send(user)
  } else {
    return _res.status(404).send({ msg: `no existe el usuario del id: ${id}` });
  }
};

const postUser = async (_req: Request, _res: Response) => {
  const { body } = _req;

  try {
    const existUsers = await Usuario.findAndCountAll();
    if (existUsers.count == 0) {
      body.tipo = 'Administrador';
      body.estado = 'Activo';
    } else {
      body.tipo = 'Cliente';
    }

    const existCedula = await Usuario.findOne({ where: { cedula: body.cedula } });
    if (existCedula) {
      return _res.status(404).send({ msg: 'Ya se encuentra esa cedula registrada' });
    }

    const existEmail = await Usuario.findOne({ where: { correo: body.correo } });
    if (existEmail) {
      return _res.status(404).send({ msg: 'Ya se encuentra ese correo registrado' });
    }

    const user = Usuario.build(body);
    const passHash = await bcrypt.hash(user.getDataValue('contrasena'), 10,);
    user.setDataValue('contrasena', passHash)
    await user.save();
    return _res.send(user);
  } catch (error) {
    console.log(error);
    return _res.status(404).send({ msg: `no se registro el usuario` });

  }
};

const editUser = async (_req: Request, _res: Response) => {
  const { body } = _req;
  const { id } = _req.params;
  try {
    const tokenData: any = _req.headers['tokenData'];

    if (tokenData.tipo !== "Administrador" && tokenData.id != id) {
      return _res.status(404).send({ msg: `no tienes permiso para actualizar al usuario del id: ${id}` });
    }

    if (tokenData.tipo !== "Administrador" && (body.estado || body.tipo)) {
      return _res.status(404).send({ msg: `solo un administrador puede editar los campos opcionales 'estado' y 'tipo'` });
    }

    if (body.estado && tokenData.tipo === "Administrador" &&  tokenData.id == id && body.estado==='Inactivo' ) {
      return _res.status(404).send({ msg: `Solo te puede cambiarte a Inactivo otro Administrador` });
    }

    if (body.tipo && tokenData.tipo === "Administrador" &&  tokenData.id == id && body.tipo==='Cliente' ) {
      return _res.status(404).send({ msg: `Solo te puede cambiarte a cliente otro Administrador` });
    }

    console.log(tokenData.id)
    console.log(id)

    const userEdit = await Usuario.findByPk(id);
    if (!userEdit) {
      return _res.status(404).send({ msg: 'No se encuentra registrado ese usuario' });
    }
    await userEdit.update(body)

    return _res.send(userEdit);
  } catch (error) {
    console.log(error);
    return _res.status(404).send({ msg: `no se editó el usuario` });

  }
};

const deleteUser = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  const tokenData: any = _req.headers['tokenData'];

  if (tokenData.tipo != "Administrador") {
    return _res.status(404).send({ msg: `solo un adminstrador puede eliminar a un usuario` });
  }

  try {
    const userDelete = await Usuario.findByPk(id);
    if (!userDelete) {
      return _res.status(404).send({ msg: 'No se encuentra registrado ese usuario' });
    }

    if (userDelete.dataValues.tipo === "Administrador") {
      return _res.status(404).send({ msg: `No se puede eliminar a un administrador` });
    }
    // await userDelete.destroy();
    await userDelete.destroy();
    return _res.send(userDelete);
  } catch (error) {
    console.log(error);
    return _res.status(404).send({ msg: `no se elimino el usuario` });
  }
};

const postLogin = async (_req: Request, _res: Response) => {
  const { body } = _req;

  try {
    const user = await Usuario.findOne({ where: { cedula: body.cedula } });
    if (!user) {
      return _res.status(404).send({ msg: 'No se encuentra esa cedula registrada' });
    }

    if (user.dataValues.estado === "Inactivo") {
      return _res.status(404).send({ msg: 'Esta cuenta está Inactiva, contácta al administrador.' });
    }
    const userLogin = Usuario.build(body);
    const coinciden = await bcrypt.compare(userLogin.getDataValue('contrasena'), user.getDataValue('contrasena'))
    if (!coinciden) {
      return _res.status(404).send({ msg: `cedula o contraseña incorrectos` });
    }
    user.dataValues.contrasena = "NULL";
    return _res.send({ token: jwt.sign(user.dataValues, process.env.TOKEN_PASSWORD as string) })

  } catch (error) {
    console.log(error);
    return _res.status(404).send({ msg: `No se ha logrado su autenticación` });

  }
};

const postForgotPassword = async (_req: Request, _res: Response) => {
  try {
    const { correo } = _req.body;
    let codigoRecuperacion;
    let existCodigo;
    const userEmail = await Usuario.findOne({ where: { correo: correo } });
    if (!userEmail) {
      return _res.status(404).send({ msg: 'No se encuentra ese correo registrado' });
    }

    do {
      codigoRecuperacion = random(6);
      existCodigo = await Usuario.findOne({ where: { codigoRecuperacion: codigoRecuperacion } });
    } while (existCodigo);

    const isSendEmail = await sendEmail(correo, codigoRecuperacion, userEmail.dataValues.nombre);
    if (isSendEmail && userEmail) {

      await userEmail.update({ codigoRecuperacion: codigoRecuperacion, fechaRecuperacion: (new Date().toISOString().slice(0, 19).replace('T', ' ')) })
      _res.setHeader("Location", "http://localhost:3001/newPassword");
      return _res.send({ msg: 'se envio las intrucciones al correo electronico para la recuperación de la contraseña' });
    } else {
      console.log(isSendEmail)
      return _res.status(404).send({ msg: 'No se logro enviar el codigo al correo' });
    }
  } catch (error) {
    return _res.status(404).send({ msg: 'no se logro recuperar la contraseña del usuario' });
  }
};


const postNewPassword = async (_req: Request, _res: Response) => {
  try {
    const { codigoRecuperacion, nuevaContrasena, correo } = _req.body;

    const userForgotPass = await Usuario.findOne({ where: { codigoRecuperacion: codigoRecuperacion, correo: correo } });
    if (!userForgotPass) {
      _res.setHeader("Location", "http://localhost:3001/forgotPassword");
      return _res.status(404).send({ msg: 'No se encuentró el codigo en su cuenta, vuelva a intentar recuperar su cuenta' });
    }
    const passHash = await bcrypt.hash(nuevaContrasena, 10,);
    userForgotPass.update({ contrasena: passHash, codigoRecuperacion: "NULL" })
    _res.setHeader("Location", "http://localhost:3001/login");
    return _res.send({ msg: 'contraseña restablecida exitosamente' });

  } catch (error) {
    console.log(error);
    _res.setHeader("Location", "http://localhost:3001/forgotPassword");
    return _res.status(404).send({ msg: 'no se logro recuperar la contraseña del usuario' });
  }
};


const getUserToken = async (_req: Request, _res: Response) => {

  try {
    const tokenData: any = _req.headers['tokenData'];
    if ((tokenData == null || tokenData == undefined)) {
      return _res.status(404).send({ msg: 'token de sesion no encontrado' });
    }

    return _res.status(200).send({ tokenData })
  } catch (error) {
    console.log(error);
    return _res.status(404).send({ msg: 'no se obtuvo el usuario del token' });
  }

};

export { getUsers, getUser, editUser, deleteUser, postUser, postLogin, postForgotPassword, postNewPassword, getUserToken };