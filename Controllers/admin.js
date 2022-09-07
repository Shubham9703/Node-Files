const admin = require("../Models/admin");
const bcrypt=require("bcrypt");
const sequelize=require("sequelize");
const Op = sequelize.Op;
// Service
const userService = require("../service/user");
const adminService=require("../service/admin");

//Login...................
exports.adminLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)  {
        return res.json({
            status: 400,
            result: "error",
            message: "Please provide valid input details1."
        });
    }
    let criteria = {
        [Op.or]: [
            { mobile: email }, { email: email }
        ]
    }
    let admin = await adminService.checkAdmin(criteria);
    if (admin) {
        const userJsn = JSON.parse(JSON.stringify(admin));
        const isEqual = await bcrypt.compare (password, userJsn.password);
        if (isEqual) {
            delete userJsn.password;
            // const theToken = jwt.sign({id:user.id}, 'the-super-strong-secrect', { expiresIn: '24h' });
            return res.json({
                status: 200,
                result: "success",
                message: " Admin Login successfully",
                // token: theToken,
                data: userJsn
            });
        } else {
            return res.json({
                status: 400,
                result: "error",
                message: "Invalid credentials"
            });
        }
    } else {
        return res.json({
            status: 400,
            result: "error",
            message: "Please enter valid credentials"
        });
    }
}

// User Details.........................
exports.userDetails = async (req, res, next) => {
    try {
        const{id}=req.body;
        let criteria = {
            id:id
        }
        // console.log(criteria);
        let user = await userService.checkUser(criteria);
        if (user) {
            user.password = undefined
            return res.json({
                status: 200,
                result: "success",
                message: "user data fetched successfully!",
                data: user
            });
        } else {
            return res.json({
                status: 404,
                result: "Data not found",
                message: "user not exist's in database",
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            result: "error",
            message: "catch error",
        });
    }
}

//All User List.......................
exports.allUser = async (req, res, next) => {
    try {
        const{ offset,limit}=req.query;
        let criteria = {
        }
        // let offsetVal = offset ? offset : 0;
        let offsetVal=(offset-1)*limit ? offset:0
        let limitVal = limit ? limit : 10;
        let user = await userService.allUser(criteria,offsetVal,limitVal);
        if (user) {
            delete user.password;
            user.password = undefined
            return res.json({
                status: 200,
                result: "success",
                message: "user data fetched successfully!",
                data: user
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            result: "error",
            message: "catch error",
        });
    }
}

// Login Complete
exports.loginComplete = async (req, res, next) => {
    try {
        const{offset,limit}=req.body;
        let criteria = {
            step:0
        }
        let offsetVal = offset ? offset : 0;
        let limitVal = limit ? limit : 10;
        let user = await userService.allUser(criteria,offsetVal,limitVal);
        if (user) {
            user.password = undefined
            return res.json({
                status: 200,
                result: "success",
                message: "user data fetched successfully!",
                data: user
            });
        } 
    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            result: "error",
            message: "catch error",
        });
    }
}

// Login Inomplete
exports.loginInComplete = async (req, res, next) => {
    try {
        const{offset,limit}=req.body;
        let criteria = {
            step: { [Op.ne]: 0 }
        }
        let offsetVal = offset ? offset : 0;
        let limitVal = limit ? limit : 10;
        let user = await userService.allUser(criteria,offsetVal,limitVal);
        if (user) {
            user.password = undefined
            return res.json({
                status: 200,
                result: "success",
                message: "user data fetched successfully!",
                data: user
            });
        } else {
            return res.json({
                status: 404,
                result: "Data not found",
                message: "user not exist's in database",
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 500,
            result: "error",
            message: "catch error",
        });
    }
}