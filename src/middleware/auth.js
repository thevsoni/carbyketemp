const userModel = require("../models/mongo/user");
const adminModel = require("../models/mongo/admin");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    let token = req.headers.token;

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401))
    }
    let decodedData;
    try {
        decodedData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.log("error ", error)
        return next(new ErrorHandler("Invalid Access Token", 400))
    }
    let currentUser = await userModel.findById(decodedData.id);
    if (!currentUser) {
        return next(new ErrorHandler("User Not Found", 400))
    }

    req.user = currentUser;
    next();
})


exports.isAuthenticatedAdmin = catchAsyncErrors(async (req, res, next) => {

    let token = req.headers.token;

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401))
    }
    let decodedData;
    try {
        decodedData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.log("error ", error)
        return next(new ErrorHandler("Invalid Access Token", 400))
    }
    let currentAdmin = await adminModel.findById(decodedData.id);
    if (!currentAdmin) {
        return next(new ErrorHandler("Admin Not Found", 400))
    }
    req.admin = currentAdmin;
    next();
})