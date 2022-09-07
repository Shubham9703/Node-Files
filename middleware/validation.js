const joi = require('joi');


const registervalidator = joi.object({
    email: joi.string().email().trim(true).required(),
    mobile: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required().trim(),
    password: joi.string().min(6).max(20).trim(true).required()
});
const loginvalidator = joi.object({
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(6).max(20).trim(true).required()
});
const personalDetailsvalidator = joi.object({
    name:joi.string().trim(true).required(),
    age:joi.number().required(),
    gender:joi.string().required().trim(true)
});
const addressDetailsvalidator =joi.object({
    address:joi.string().trim(true).required()
});
const qualificationDetailsvalidator = joi.object({
    qualification:joi.string().trim(true).required(),
    
});
module.exports = {
    registrationValidation: (req, res, next) => {
        const { error } = registervalidator.validate(req.body);
        if (error) {
            res.status(406);
            res.json({
                status: 406,
                message: error.details[0].message
            })
        }else next();
    },
    loginValidation: (req, res, next) => {
        const { error } = loginvalidator.validate(req.body);
        if (error) {
            res.status(404);
            res.json({
                status: 404,
                message: error.details[0].message
            })
        }  else {
            next();
        }
    },
    profilevalidation: (req, res, next) => {
        const { error } = personalDetailsvalidator.validate(req.body);
        if (error) {
            res.status(404);
            res.json({
                status: 404,
                message: error.details[0].message
            })
        }  else {
            next();
        }
    },
    addressvalidation: (req, res, next) => {
        const { error } = addressDetailsvalidator.validate(req.body);
        if (error) {
            res.status(404);
            res.json({
                status: 404,
                message: error.details[0].message
            })
        }  else {
            next();
        }
    },
    qualificationvalidation: (req, res, next) => {
        const { error } = qualificationDetailsvalidator.validate(req.body);
        if (error) {
            res.status(404);
            res.json({
                status: 404,
                message: error.details[0].message
            })
        }  else {
            next();
        }
    },
}