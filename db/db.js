const { Sequelize }= require('sequelize')

const sequelize = new Sequelize('clickandcollect', 'root', 'torototo', {
    dialect:'mariadb',
    host:'127.0.0.1'
})
module.exports = sequelize