import { Sequelize } from "sequelize";

const db = new Sequelize('cabinas','root','',{
    host: 'localhost',
    dialect: "mysql",
    //logging: false,

});

export default db;