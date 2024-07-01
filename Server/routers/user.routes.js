const express = require("express");
const router = express.Router();

const User_controller = require("../controller/usercontroler");



router.post("/signup", User_controller.signup);
router.delete("/delete/:id",User_controller.deletedUser);
router.patch("/update/:id", User_controller.edit_User);
router.get("/view/:id",  User_controller.view_User);
router.get("/list",  User_controller.list_User);

module.exports = router;
