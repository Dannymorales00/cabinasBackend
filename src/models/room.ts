import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Imagen from "../models/image";



const Room = db.define('Habitaciones', {
    numero: {
        type: DataTypes.NUMBER
    },
    descripcion: {
        type: DataTypes.STRING
    },
    capacidad: {
        type: DataTypes.NUMBER
    },
    estado: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.NUMBER
    },
    porcentajeDescuento: {
        type: DataTypes.NUMBER
    }
});

Room.hasMany(Imagen, { as: 'imagenes', foreignKey: 'numeroHabitacion' })



export default Room;