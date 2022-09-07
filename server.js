
const express= require('express');
const app=express();
app.use(express.json());
const mysql= require("mysql")
const bodyparser= require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const port=5151;
const sequelize= require("./database/database"); // Database  
const usersRouter= require("./Routes/user"); //  User Router
app.use("/users",usersRouter);

const adminRouter= require("./Routes/admin"); //  Admin Router
app.use("/admin",adminRouter);


app.get('/',(req,res)=>{
res.send('Testing')
})
app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`);
})
module.exports=sequelize;
module.exports = app;


