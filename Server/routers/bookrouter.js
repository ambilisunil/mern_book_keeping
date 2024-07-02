const express = require("express");
const router = express.Router();
const {userAuthunication} = require("../middlewares/userAuthuntication");


const Book_controller = require("../controller/bookcontroler");



router.post("/add",userAuthunication, Book_controller.create_book);
router.delete("/delete/:id",userAuthunication,Book_controller.deletedBook);
router.patch("/update/:id",userAuthunication, Book_controller.edit_book);
router.get("/view/:id", userAuthunication, Book_controller.view_book);
router.get("/list", userAuthunication, Book_controller.list_book);

module.exports = router;
