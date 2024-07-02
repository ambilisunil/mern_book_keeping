const express = require("express");
const router = express.Router();

const User_controller = require("../controller/usercontroler");



router.post("/signup", User_controller.signup);
router.post("/login", User_controller.Login);


module.exports = router;
