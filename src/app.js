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
// const adminR = require("./routes/adminRoute")
// const user = require("./routes/userRoute")
// const location = require("./routes/locationRoute")

// //Routes uses
// app.use("/api/admin", adminR);
// app.use("/api/user", user);
// app.use("/api/location", location);


//Middleware for errors
app.use(errorMiddleware)

module.exports = app
