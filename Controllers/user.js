const user = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const commonFunction = require("../helper/commanFunction");



// Service
const userService = require("../service/user");

// *********************USER MANAGEMENT************************************

//Registraction...............
exports.registerUser = async function (req, res, next) {
    try {
        const { email, mobile, password } = req.body;
        let criteria = {
            email: email
        }
        let exUser = await userService.checkUser(criteria);
        if (exUser) {
            return res.json({
                status: 400,
                result: "error",
                message: "Email already exists!"
            });
        }
        const bcryptPassword = await bcrypt.hash(password + "", 12);
        let dataToSet = {
            email: email,
            mobile: mobile,
            password: bcryptPassword,
            step: 1
        }
        const user = await userService.createUser(dataToSet);
        if (user) {
            user.password = undefined
            return res.json({
                status: 200,
                result: "success",
                message: "User registered successfully!",
                data: user
            });
        }
    } catch (error) {
        console.log(error)
        return res.json({
            status: 500,
            result: "catch error",
        });
    }
}

//Login...................
exports.login = async (req, res, next) => {
    const { email, password, } = req.body;
    if (!email || !password) {
        return res.json({
            status: 400,
            result: "error",
            message: "Please provide valid input details."
        });
    }
    let criteria = {
        [Op.or]: [
            { mobile: email }, { email: email }
        ]
    }
    let user = await userService.checkUser(criteria);
    if (user) {
        const userJsn = JSON.parse(JSON.stringify(user));
        const isEqual = await bcrypt.compare(password, userJsn.password);
        if (isEqual) {
            delete userJsn.password;
            const theToken = jwt.sign({ id: user.id }, 'the-super-strong-secrect', { expiresIn: '2h' });
            return res.json({
                status: 200,
                result: "success",
                message: "Login successfully",
                token: theToken,
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

//Profile.....................
exports.addProfile = async function (req, res, next) {
    try {
        const { name, age, gender } = req.body;
        let criteria = {
            id: req.decoded,
            step: 1
        }
        let exUser = await userService.checkUser(criteria);
        if (exUser) {
            let dataToSet = {
                name: name,
                age: age,
                gender: gender,
                step: 2
            };
            const add_user = userService.updateUser(criteria, dataToSet);
            return res.json({
                status: 200,
                result: "success",
                message: "user Profile updated successfully",
                data: dataToSet
            })
        } else {
            return res.json({
                status: 400,
                result: "error",
                message: "Please Complete previous step",
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            result: "catch error",
        });
    }
}

//Address......................
exports.addAddress = async function (req, res, next) {
    try {
        const { address } = req.body;
        let criteria = {
            id: req.decoded,
            step:2
        }
        let exUser = await userService.checkUser(criteria);
        if (exUser) {
            let dataToSet = {
                address: address,
                step: 3
            };
            const add_address = userService.updateUser(criteria, dataToSet);
            return res.json({
                status: 200,
                result: "success",
                message: "address details updated successfully",
                data: dataToSet
            })
        }else {
            return res.json({
                status: 400,
                result: "error",
                message: "Please Complete previous step",
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            result: "catch error",

        });
    }
}

//Qualification...................
exports.addQualification = async function (req, res, next) {
    try {
        const { qualification } = req.body;
        let criteria = {
            id: req.decoded,
            step:3
        }
        let exUser = await userService.checkUser(criteria);
        if (exUser) {
            let dataToSet = {
                qualification: qualification,
                step: 0
            };
            const add_qualification = userService.updateUser(criteria, dataToSet);
            return res.json({
                status: 200,
                result: "success",
                message: "qualification details updated successfully",
                data: dataToSet
            })
        }else {
            return res.json({
                status: 400,
                result: "error",
                message: "Please Complete previous step",
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            result: "catch error",

        });
    }
}

// user Dashboard
exports.userDashboard = async (req, res, next) => {
    try {
        const { id } = req.body;
        let criteria = {
            id: req.decoded,
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

// OTP send..........
exports.sendOtp = async function (req, res) {
    try {
        const { email } = req.body;
        let criteria = {
            email: email,
            // id: req.decoded,
            step:0
        }
        let result = await userService.checkUser(criteria);
        if (result) {
            let otp = commonFunction.getOtp();
            let otpTime = new Date().getTime();
            let subject = "verify your otp";
            let text = `Dear User Please verify your otp using this: ${otp}\n`
            let dataToSet = {
                otp: otp,
                otpTime: otpTime,
                // otpVerify:0
            }
            user.update(dataToSet, { where: { email: email } }).then(data => {
            // user.update(dataToSet, { where: { id: req.decoded } }).then(data => {
                if (!data) {
                    return res.send({
                        status: 500,
                        result: "error",
                        message: "Internal server error"
                    });
                } else {
                    //send email
                    commonFunction.sendMail(email, subject, text, (sendMailError, sendMailResult) => {
                        console.log(sendMailResult);
                        if (sendMailError) {
                            return res.json({
                                status: 500,
                                result: "error",
                                message: "Internal server error"
                            });
                        }
                    });
                    return res.send({
                        status: 200,
                        result: "success",
                        message: "OTP send successfully",
                        data: dataToSet
                    });
                }
            });
        } else {
            return res.send({
                status: 400,
                result: "error",
                // message: "This email is not registered with us"
                message: "Please Complete the All previous steps "
            });
        }
    } catch (error) {
        console.log(error);
        return res.send({
            status: 500,
            result: "error",
            message: "catch  error"
        });
    }
}

// Verify Otp.......
exports.otpVerify = async function (req, res) {
    try {
        const { email, otp } = req.body;
        let criteria = {
            email: email,
            // id: req.decoded,
        }
        let result = await userService.checkUser(criteria);
        if (result) {
            let dataToSet = {
                otpVerify: 1,
                otp:0,
                status:1
            }
            if (result.otpVerify != 1) {
                let otpTimeDifference = (new Date().getTime()) - result.otpTime;
                if (otpTimeDifference <= (3 * 60 * 1000)) {
                    if (result.otp == otp) {
                        user.update(dataToSet, { where: { email: email } }).then(data => {
                            // user.update(dataToSet, { where: { id: req.decoded } }).then(data => {
                            if (!data) {
                                return res.json({
                                    status: 500,
                                    result: "error",
                                    message: "Data not found"
                                });
                            } else {
                                return res.json({
                                    status: 200,
                                    result: "success",
                                    message: "OTP verify successfully.",
                                    data: dataToSet
                                });
                            }
                        });
                    } else {
                        return res.json({
                            ststus: 500,
                            result: "error",
                            message: "OTP not match"
                        })
                    }
                } else {
                    return res.json({
                        status: 403,
                        result: "error",
                        message: "OTP time has been expired: Please resend otp and try again."
                    });
                }
            } else {
                return res.json({
                    status: 409,
                    result: "error",
                    message: "OTP already verified."
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            result: "error",
            message: "catch error"
        });
    }
}

// Add Post
exports.addPost = async function (req, res, next) {
    try {
        const {id, user_id,title,description } = req.body;
        let criteria = {
            id:id,
            step:0,
            status:1
        }
        let exUser = await userService.checkUser(criteria);
        if (exUser) {
            let dataToSet = {
               user_id:user_id,
               title:title,
               description:description
            };
            const addPost = userService.createPost(dataToSet);
            return res.json({
                status: 200,
                result: "success",
                message: "Post created successfully",
                data: dataToSet
            })
        } else {
            return res.json({
                status: 400,
                result: "error",
                message: "Please Complete previous step",
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            result: "catch error",
        });
    }
}

// Post Details
exports.postDetail = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        let criteria = {
            user_id:user_id
        }
        let user = await userService.postDetails(criteria);
         // user details
         let criteria1 = {
            id: user.user_id
        }
        let userData = await userService.checkUser(criteria1);
        // user.userDetails = userData; (For getting all details of user)
        user.name=userData.name;
        user.email=userData.email;
        user.mobile=userData.mobile;
        if (user) {
            return res.json({
                status: 200,
                result: "success",
                message: "Post data fetched successfully!",
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


exports.association = async (req, res, next) => {
    try {
        const { id } = req.body;
        let criteria = {
            id:id
        }
        let user = await userService.Association(criteria);
        if (user) {
            return res.json({
                status: 200,
                result: "success",
                message: "Post data fetched successfully!",
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
