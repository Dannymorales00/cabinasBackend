import { NextFunction, Request, Response } from "express";
import Reservation from "../models/reservations";
import Usuario from "../models/user";
import Room from "../models/room";
import { Op } from 'sequelize';
require('dotenv').config();

const getReservations = async (_req: Request, _res: Response) => {
  const reservations = await Reservation.findAll();
  for (const reservation of reservations) {

    const currentDate = new Date();
    const reservationEndDate = new Date(reservation.dataValues.fechaReservaHasta);

    // Si la fecha actual es posterior a la fecha de reserva hasta, marcar como completada
    if (currentDate > reservationEndDate && reservation.dataValues.estadoReserva==='Confirmada') {
      await reservation.update({ estadoReserva: 'Completada' });
    }

    const user = await Usuario.findByPk(reservation.dataValues.idUsuario, { attributes: { exclude: ['contrasena'] } });
    user ? reservation.dataValues.idUsuario = user : null;
  }
  return _res.send(reservations);
};

const getReservation = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  const reservation = await Reservation.findByPk(id);

  if (reservation) {
    return _res.send(reservation)
  } else {
    return _res.status(404).send({ msg: `no existe una habitación con el id: ${id}` });
  }
};

const getReservationUserId = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  const tokenData: any = _req.headers['tokenData'];

  if (tokenData.tipo !== "Administrador" && tokenData.id != id) {
    return _res.status(404).send({ msg: `no tienes acceso al usuario del id: ${id}` });
  }

  const user = await Usuario.findByPk(id, { attributes: { exclude: ['contrasena', 'codigoRecuperacion', 'fechaRecuperacion'] } });
  if (!user) {
    return _res.status(404).send({ msg: 'no se encuentra el usuario en el sistema' });
  }
  console.log(user);

  const reservations = await Reservation.findAll({ where: { idUsuario: id } });
  if (reservations) {
    for (const reservation of reservations) {
      reservation.dataValues.idUsuario = user;
    }
    return _res.send(reservations)
  } else {
    return _res.status(404).send({ msg: `no existe una habitación con el id: ${id}` });
  }
};

const postReservationAvailableId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fechaReservaDesde, fechaReservaHasta } = req.body;

  try {
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).send({ msg: 'La habitación no está disponible para una reservación' });
    }
    // Verificar si hay reservaciones que coincidan con el rango de fechas
    const overlappingReservations = await Reservation.findAll({
      where: {
        numeroHabitacion: room.dataValues.numero,
        fechaReservaDesde: {
          [Op.lt]: new Date(fechaReservaHasta),
        },
        fechaReservaHasta: {
          [Op.gt]: new Date(fechaReservaDesde),
        },
      },
    });

    if (overlappingReservations.length > 0) {
      return res.status(404).send({ msg: 'Esa fecha ya se encuentra reservada' });
    }

    return res.send({ msg: 'La fecha está disponible para reservar' });
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    return res.status(404).send({ msg: 'ha ocurrido un problema al verificar disponibilidad' });
  }
};

const postReservation = async (_req: Request, _res: Response) => {
  const { body } = _req;

  console.log(body);


  try {
    const userExist = await Usuario.findByPk(body.idUsuario);
    if (!userExist) {
      return _res.status(404).send({ msg: 'No se encuentra registrado ese usuario' });
    }

    const reservation = await Reservation.create(body);
    return _res.send(reservation);

  } catch (error) {
    console.log(error);
    return _res.status(404).send({ msg: `no se registro la habitación` });
  }
};

const editReservation = async (_req: Request, _res: Response) => {
  const { body } = _req;
  const { id } = _req.params;
  try {
    const userEdit = await Reservation.findByPk(id);
    if (!userEdit) {
      return _res.status(404).send({ msg: 'No se encuentra registrado esa habitación' });
    }
    await userEdit.update(body)

    return _res.send(userEdit);
  } catch (error) {
    console.log(error);
    return _res.status(404).send({ msg: `No se editó la habitación` });
  }
};

const deleteReservation = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  try {
    const userDelete = await Reservation.findByPk(id);
    if (!userDelete) {
      return _res.status(404).send({ msg: 'No se encuentra registrado esa habitación' });
    }
    // await userDelete.destroy();
    await userDelete.update({ estadoReserva: "Cancelada" })
    return _res.send(userDelete);
  } catch (error) {
    console.log(error);
    return _res.status(404).send({ msg: `No se elimino la habitación` });
  }
};

const validateIdPaypal = async (_req: Request, _res: Response, next: NextFunction) => {
  const { body } = _req;

  var fetch = require('node-fetch');

  // Obtener el token de acceso
  var clientId = process.env.PAYPAL_CLIENT_ID;
  var secret = process.env.PAYPAL_SECRET;

  var accessToken;

  fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
    .then((response: { json: () => any; }) => response.json())
    .then((data: { access_token: any; }) => {
      accessToken = data.access_token;
      console.log('Token de acceso:', accessToken);

      // Realizar la segunda solicitud con el token
      return fetch(`https://api-m.sandbox.paypal.com/v1/checkout/orders/${body.idPaypalPago}`, {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      });
    })
    .then((response: { status: number; json: () => any; }) => {
      if (response.status === 200) {
        // Manejar la respuesta de la segunda solicitud aquí
        return response.json();
      } else {
        throw new Error('Error al realizar la segunda solicitud');
      }
    })
    .then((data: any) => {
      console.log('Datos de la orden:', data);
      return next();

    })
    .catch((error: any) => {
      console.error('Error:', error);
      _res.status(404).send('No se encontro el Id de la orden paypal');
    });




};

export { getReservations, validateIdPaypal, getReservation, postReservationAvailableId, getReservationUserId, editReservation, deleteReservation, postReservation };