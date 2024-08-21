import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Image = db.define('ImagenesHabitaciones', {
  numeroHabitacion: {
    type: DataTypes.NUMBER,
  },
  url: {
    type: DataTypes.STRING,
  }
});

export default Image;