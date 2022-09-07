const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const joi = require("joi");
const user = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(100),
        defaultValue: "",
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING(100),
        defaultValue: "",
        allowNull: true,
    },
    mobile: {
        type: Sequelize.STRING(50),
        unique: true,
        defaultValue: "",
        allowNull: true,
    },
    password: {
        type: Sequelize.STRING(100),
        defaultValue: "",
        allowNull: true,
    },
    age: {
        type: Sequelize.STRING(100),
        defaultValue: "",
        allowNull: true,
    },
    gender: {
        type: Sequelize.STRING(100),
        defaultValue: "",
        allowNull: true,
    },
    address: {
        type: Sequelize.STRING(100),
        defaultValue: "",
        allowNull: true,
    },
    qualification: {
        type: Sequelize.STRING(100),
        defaultValue: "",
        allowNull: true,
    },
    step: {
        type: Sequelize.STRING(100),
        defaultValue: "",
        allowNull: true,
    },
    otp: {
        type: Sequelize.STRING(50),
        defaultValue: "",
        allowNull: true,
    },
    otpTime: {
        type: Sequelize.STRING(50),
        defaultValue: "",
        allowNull: true,
    },
    otpVerify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    status: {
        type: Sequelize.STRING(50),
        defaultValue:0,
        allowNull: true
    },

}, 
// {
//     // If don't want createdAt
//     createdAt: false,

//     // If don't want updatedAt
//     updatedAt: false,
// }
);

module.exports = user;