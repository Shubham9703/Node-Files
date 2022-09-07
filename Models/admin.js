const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const admin = sequelize.define("admin", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
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
 

}, 
// {
//     // If don't want createdAt
//     createdAt: false,

//     // If don't want updatedAt
//     updatedAt: false,
// }
);
// const db={};
// db.Sequelize=Sequelize;
// db.sequelize=sequelize
// db.sequelize.sync()
// .then(()=>{
//     console.log("yes re-sync");
// })
module.exports =admin;