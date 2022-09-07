const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/database");
module.exports = (sequelize,DataTypes)=>{
const qualification = sequelize.define("qualification", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: "",
        allowNull: true,
    },


});
return qualification;
}



