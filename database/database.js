
const {Sequelize,DataTypes} = require("sequelize");
const sequelize = new Sequelize(
  'curd',//Database name
  'debian-sys-maint',//user
  'Shubham@1998',//password 
  {
    host: 'localhost',
    dialect: 'mysql',
    // logging:false
  }
);

sequelize.authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => {
    console.log("error" + err);
  })


  const db = {}
  db.Sequelize = Sequelize
  db.sequelize = sequelize
  db.product = require('../Models/qualification')(sequelize, DataTypes)
  db.sequelize.sync({ force: false })
  .then(() => {
      console.log('yes re-sync done!')
  })
  module.exports = db
module.exports = sequelize;

