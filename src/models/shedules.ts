import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Horarios = db.define('Horarios', {
  dia: {
    type: DataTypes.STRING,
  },
  horaApertura: {
    type: DataTypes.TIME,
  },
  horaCierre: {
    type: DataTypes.TIME,
  },
  estado: {
    type: DataTypes.STRING,
  }

});

export default Horarios;