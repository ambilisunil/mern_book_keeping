const express = require("express");
const router = express.Router();



 router.use("/", require("./bookrouter"));
 router.use("/book", require("./bookrouter"));

router.use("/user",require("./user.routes")); 


module.exports = router;
