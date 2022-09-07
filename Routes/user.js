const express=require("express");
const router=express.Router();
const userController=require("../Controllers/user");
const auth=require("../middleware/auth");
const validation=require("../middleware/validation");


router.post("/register",validation.registrationValidation,userController.registerUser);
router.post("/login",userController.login);
router.put("/addProfile/Step1",validation.profilevalidation,auth.authorization,userController.addProfile);
router.put("/addAddress/Step2",validation.addressvalidation,auth.authorization,userController.addAddress);
router.put("/addQualification/Step3",validation.qualificationvalidation,auth.authorization,userController.addQualification);
router.post("/userDashboard",auth.authorization,userController.userDashboard);
router.post("/sendOtp",userController.sendOtp);
router.post("/otpVerify",userController.otpVerify);
router.post("/addPost",userController.addPost);
router.post("/postDetail",userController.postDetail);
router.post("/association",userController.association);





// -----------------------------------------



module.exports=router;