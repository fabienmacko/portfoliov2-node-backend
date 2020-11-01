const express = require("express");
const http = require("http");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const commentsRoute = require("./routes/comments");
const config = require('./config');


require("dotenv/config");

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

app.use(bodyParser.json());
app.use("/comments", commentsRoute);
const server = http.createServer(app);

// ROUTES

app.get("/", (req, res) => {
  res.send("We are on home");
})

// Connect to db 
mongoose.connect(config.MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

var db = mongoose.connection;
db.once('open', function () {
  console.log("Connected to portfoliov2");
})
db.on('error', err => {
  throw err;
});

// How to listen on the server
server.listen(5000, () => {
  console.log('Listen PORT', 5000);
});