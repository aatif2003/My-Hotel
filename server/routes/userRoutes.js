const {Router}=require("express");
const {getUsers, createUsers, loginUser, logoutUser}=require("../controllers/userController");
const auth=require("../middleware/authMiddleware");
const router=Router();
//get the users
router.get("/",auth,getUsers);
//create the user
router.post("/",createUsers)
//login the user
router.post("/login",loginUser)
//logout the uer
router.get("/logout",logoutUser)
module.exports=router