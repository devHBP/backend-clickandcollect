const { Sequelize }= require('sequelize')
require('dotenv').config();


const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect:'mariadb',
    host:'127.0.0.1',
    logging: (query) => {
        if (!query.includes("SELECT")) {
          console.log(query);
        }
      },
})


module.exports = sequelize