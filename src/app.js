const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const errorMiddleware = require("./middleware/error");
require("dotenv").config();
require("./config/mongoose");


//cors
app.use("*", cors({
    origin: true,
    credentials: true,
}))

app.set('trust proxy', true)

//uses
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }))

//Routes imports
const user = require("./routes/user")
const admin = require("./routes/admin")
const location = require("./routes/location")
const vehicle = require("./routes/vehicle")

//Routes uses
app.use("/api/user", user);
app.use("/api/admin", admin);
app.use("/api/location", location);
app.use("/api/vehicle", vehicle);


//Middleware for errors
app.use(errorMiddleware)

module.exports = app
