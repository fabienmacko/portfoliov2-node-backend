const express = require("express");
const http = require("http");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const commentsRoute = require("./routes/comments");
const config = require('./config');


require("dotenv/config");

// Middlewares in express

// Allow all
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());
app.use("/comments", commentsRoute);
const server = http.createServer(app);

// ROUTES

app.get("/", (req, res) => {
  res.send("We are on home with http://localhost:3000 full config");
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