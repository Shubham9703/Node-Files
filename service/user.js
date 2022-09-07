const user = require("../Models/user");
const addPost = require("../Models/addPost");
const sequelize = require("sequelize");

user.hasOne(addPost,{foreignKey:"user_id",as:"PostDetails"});
addPost.belongsTo(user,{foreignKey:"user_id"});


const Association = (criteria) =>
    new Promise((reslove, reject) => {
        addPost.findOne({
            include:user,   
            // attributes:['name','email'],
            // include:[{
            //     model:addPost,
            //     as:"PostDetails",
            //     attributes:['title']
            // }],
            where: criteria, raw: true })
            .then(client => reslove(client))
            .catch(err => reject(err));
    })

const createUser = (dataToSet) =>
    new Promise((reslove, reject) => {
        user.create(dataToSet)
            .then(client => reslove(client))
            .catch(err => reject(err));
    });

const checkUser = (criteria) =>
    new Promise((reslove, reject) => {
        user.findOne({ where: criteria, raw: true })
            .then(client => reslove(client))
            .catch(err => reject(err));
    })
const updateUser = (criteria, dataToSet) =>
    new Promise((resolve, reject) => {
        user.update(dataToSet, { where: criteria })
            .then(client => resolve(client))
            .catch(err => reject(err));
    });

const allUser = (criteria, offset, limit) =>
    new Promise((resolve, reject) => {
        user.findAndCountAll({ where: criteria, raw: true, 'offset': parseInt(offset), 'limit': parseInt(limit) })
            .then(client => resolve(client))
            .catch(err => reject(err));
    });

const createPost = (dataToSet) =>
    new Promise((reslove, reject) => {
        addPost.create(dataToSet)
            .then(client => reslove(client))
            .catch(err => reject(err));
    });

const postDetails = (criteria) =>
    new Promise((reslove, reject) => {
        addPost.findOne({ where: criteria, raw: true })
            .then(client => reslove(client))
            .catch(err => reject(err));
    })

module.exports = {
    createUser: createUser,
    checkUser: checkUser,
    updateUser: updateUser,
    allUser: allUser,
    createPost: createPost,
    postDetails: postDetails,
    Association:Association
}