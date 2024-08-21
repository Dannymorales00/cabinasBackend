import { DataTypes } from 'sequelize';
import db from '../db/connection';

const InfoContact = db.define('InformacionContactos', {
  telefono1: {
    type: DataTypes.NUMBER,
  },
  telefono2: {
    type: DataTypes.NUMBER,
  },
  correo: {
      type: DataTypes.STRING
  },
  urlWhatsApp: {
    type: DataTypes.STRING,
  },
  direccion: {
      type: DataTypes.STRING
  }
});

export default InfoContact;