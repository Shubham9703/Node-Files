const express=require("express");
const router=express.Router();
const adminController=require("../Controllers/admin");

router.post("/loginAdmin",adminController.adminLogin);
router.post("/userDetails",adminController.userDetails);
router.get("/allUser",adminController.allUser);
router.get("/loginComplete",adminController.loginComplete);
router.get("/loginInComplete",adminController.loginInComplete);





module.exports=router;