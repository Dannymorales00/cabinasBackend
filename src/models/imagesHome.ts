import { DataTypes } from 'sequelize';
import db from '../db/connection';

const ImagesHome = db.define('ImagenesHomes', {
  codigo: {
    type: DataTypes.NUMBER,
  },
  url: {
    type: DataTypes.STRING,
  }
});

export default ImagesHome;