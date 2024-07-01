const express = require("express");
const router = express.Router();


const Book_controller = require("../controller/bookcontroler");



router.post("/add", Book_controller.create_book);
router.delete("/delete/:id",Book_controller.deletedBook);
router.patch("/update/:id", Book_controller.edit_book);
router.get("/view/:id",  Book_controller.view_book);
router.get("/list",  Book_controller.list_book);

module.exports = router;
