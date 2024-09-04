const express = require("express");
const router = express.Router();

const {
  homepageController,
  logoutController,
  profileController,
  registerPageController,
  registerController,
  loginController
} = require("../controllers/indexController");


const{
  isLoggedin 
} = require ("../middlewares/index")

router.get("/", homepageController);
router.post('/login', loginController)
router.get("/register", registerPageController);
router.post("/register",registerController)
router.get("/profile", isLoggedin, profileController);
router.get("/logout",(req,res) => {
  res.clearCookie("token")
  res.redirect("/")
} );

module.exports = router;
