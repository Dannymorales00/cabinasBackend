
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/user";

/**
* Verifies if the token is found into headears in the request
* @param {Request} _req
* @param {Response} _res
* @param {NextFunction} next
*/
const validateToken = async (_req: Request, _res: Response, next: NextFunction) => {
    const bearerHeader = _req.headers['authorization'];

    if ((bearerHeader == null || bearerHeader == undefined)) {
        return _res.status(401).json({ msg: 'no se encontró un token', data: {} });
    }
    const bearer = bearerHeader.split(" ");

    if (bearer[1] == undefined) {
        return _res.status(401).json({ msg: 'no se encontró un token tipo bearer', data: {} });
    }

    let data: any = null;
    try {
        data = jwt.verify(bearer[1], process.env.TOKEN_PASSWORD as string);
    } catch (err) {
        console.log(err);
        return _res.status(401).json({ msg: 'el token es inválido', data: { exampleToken: "Bearer axzzmceoinca.dncjoncoan.adwadsada4" } });
    }

    try {
        const user = await Usuario.findOne({
            where:
                { id: data.id, cedula: data.cedula, nombre: data.nombre, correo: data.correo, telefono: data.telefono, tipo: data.tipo, estado: data.estado }
        });
        if (!user) {
            _res.setHeader("Location", "http://localhost/login");
            return _res.status(401).json({ msg: `la información del token a expirado, vuelve a Iniciar Sesión`, data: {} });
        }
        _req.headers['tokenData'] = (data as string);
        // console.log( _req.headers['tokenData']); //info del token del usuario
        return next();
    } catch (err) {
        console.log(err);
        return _res.status(401).json({ msg: 'el token es inválido', data: { exampleToken: "Bearer axzzmceoinca.dncjoncoan.adwadsada4" } });
    }
}


export default validateToken;