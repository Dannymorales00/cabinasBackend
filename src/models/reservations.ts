import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Room from '../models/room';
import User from '../models/user';

const Reservation = db.define('Reservaciones', {

    idUsuario: {
        type: DataTypes.NUMBER
    },
    idPaypalPago: {
        type: DataTypes.STRING
    },
    numeroHabitacion: {
        type: DataTypes.NUMBER
    },
    fechaReservaDesde: {
        type: DataTypes.STRING
    },
    fechaReservaHasta: {
        type: DataTypes.STRING
    },
    cantidadHuespedes: {
        type: DataTypes.NUMBER
    },
    estadoReserva: {
        type: DataTypes.STRING
    },
    montoReserva: {
        type: DataTypes.NUMBER
    },
    montoTotal: {
        type: DataTypes.NUMBER
    },
    metodoPago: {
        type: DataTypes.STRING
    },
    estadoPago: {
        type: DataTypes.STRING
    },
    porcentajeDescuento: {
        type: DataTypes.NUMBER
    }

});

Reservation.hasOne(Room, { as: 'habitacion', foreignKey: 'id' })
Reservation.hasOne(User, { as: 'usuario', foreignKey: 'id' })

export default Reservation;
