import { DataTypes } from 'sequelize';
import db from '../db/connection';

const User = db.define('Usuarios', {

    cedula: {
        type: DataTypes.NUMBER
    },
    nombre: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.NUMBER
    },
    tipo: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    }, 
    fechaRecuperacion: {
        type: DataTypes.STRING
    },
    codigoRecuperacion: {
        type: DataTypes.STRING
    },
    contrasena: {
        type: DataTypes.STRING
    }
}
// , {
//     defaultScope: {
//         attributes: { exclude: ['codigoRecuperacion'] },
//     }
// }
);

export default User;