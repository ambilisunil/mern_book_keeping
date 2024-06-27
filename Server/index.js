const express = require("express");
const mongoose = require("mongoose");
const booklRoute = require("./routers/bookrouter");

var  uri="mongodb://localhost:27017/Book"
var bodyParser = require('body-parser');
var cors = require('cors')



mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

const app = express();
app.use(bodyParser.json());
app.use(cors({
    // origin: 'https://reactbooklcrud.herokuapp.com'
    origin:'http://localhost:3000'
}));
const port = process.env.PORT || 4000;
app.use("/storage", express.static("storage"));

app.use(express.json());
app.use(booklRoute);
//app.use(roomRoute);

app.get("*", async (req, res) => {
  res.status(404).send("Invalid request");
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
