const adminModel = require("../models/mongo/admin")
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const mongoose = require("mongoose")


exports.signUpAdmin = catchAsyncErrors(async (req, res, next) => {
    const { name, phoneCountryCode, phoneNumber } = req.body;
    if (!name || !phoneCountryCode || !phoneNumber) {
        return next(new errorHandler("Please Enter All Details", 400))
    }
    let admin = await adminModel.findOne({ phoneCountryCode, phoneNumber });
    if (admin) {
        return next(new errorHandler("Mobile Number Already Exists", 409))
    }
    admin = await adminModel.create({
        name,
        phoneCountryCode,
        phoneNumber
    })
    sendToken(admin, 201, res, "Logged In Successfully")
})