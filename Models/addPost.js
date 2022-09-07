const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const addPost = sequelize.define("addPost", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        defaultValue: "",
        allowNull: true
    },
    title: {
        type: Sequelize.STRING(100),
        defaultValue: "",
        allowNull: true,
    },
    description: {
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
// qualification.sequelize.sync().then(()=>{
//     console.log("yes re-sync");
// })
module.exports = addPost;
