const userModel = require("../models/mongo/user")
const vehicleModel = require("../models/mongo/vehicle")
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const mongoose = require("mongoose")


exports.signUpUser = catchAsyncErrors(async (req, res, next) => {
    const { name, phoneCountryCode, phoneNumber } = req.body;
    if (!name || !phoneCountryCode || !phoneNumber) {
        return next(new errorHandler("Please Enter All Details", 400))
    }
    let user = await userModel.findOne({ phoneCountryCode, phoneNumber });
    if (user) {
        return next(new errorHandler("Mobile Number Already Exists", 409))
    }
    user = await userModel.create({
        name,
        phoneCountryCode,
        phoneNumber
    })
    sendToken(user, 201, res, "Logged In Successfully")
})

exports.addOrRemoveAsFavourite = catchAsyncErrors(async (req, res, next) => {

    let user = await userModel.findById(req.user.id)
    if (!user) {
        return next(new errorHandler("User does not exist", 400))
    }
    let vehicleID = req.body.vehicleID;
    if (!vehicleID || !mongoose.isValidObjectId(vehicleID)) {
        return next(new errorHandler("Please Provide Correct Vehicle Info", 404))
    }
    let vehicle = await vehicleModel.findById(vehicleID);
    if (!vehicle) {
        return next(new errorHandler("Vehicle does not exist", 404))
    }

    const vehicleIndex = user.favouriteVehicle.indexOf(vehicleID);
    let message = ''
    if (vehicleIndex === -1) {
        user.favouriteVehicle.push(vehicleID);
        message = "successfully added as favourite"
    } else {
        user.favouriteVehicle.splice(vehicleIndex, 1);
        message = "successfully removed from favourite"
    }
    await user.save();

    res.status(200).json({
        success: true,
        message: message,
    })
})

exports.myFavouriteVehicle = catchAsyncErrors(async (req, res, next) => {
    let user = await userModel.findById(req.user.id)
    if (!user) {
        return next(new errorHandler("User does not exist", 400))
    }
    let allVehicle = await userModel.find({ _id: req.user.id })
        .populate({
            path: "favouriteVehicle"
        })
    if (allVehicle.length == 0) {
        return res.status(400).json({
            success: false,
            message: "no favourite vehicle found."
        })
    }
    res.status(200).json({
        success: true,
        message: "Successfully fetched all favourite vehicle",
        data: allVehicle
    })
})

exports.myVehicle = catchAsyncErrors(async (req, res, next) => {
    let user = await userModel.findById(req.user.id)
    if (!user) {
        return next(new errorHandler("User does not exist", 400))
    }
    let myVehicle = await vehicleModel.find({ owner: req.user.id });
    if (myVehicle.length == 0) {
        return res.status(400).json({
            success: false,
            message: "no vehicle found."
        })
    }
    res.status(200).json({
        success: true,
        message: "Successfully fetched my vehicle",
        data: myVehicle
    })
})

exports.markSoldUnsold = catchAsyncErrors(async (req, res, next) => {
    let user = await userModel.findById(req.user.id)
    if (!user) {
        return next(new errorHandler("User does not exist", 400))
    }
    let vehicleID = req.body.vehicleID;

    if (!vehicleID || !mongoose.isValidObjectId(vehicleID)) {
        return next(new errorHandler("Please Provide Correct Vehicle Info", 404))
    }

    let myVehicle = await vehicleModel.findOne({ _id: vehicleID, owner: req.user.id });
    if (!myVehicle) {
        return res.status(400).json({
            success: false,
            message: "vehicle not found."
        })
    }
    myVehicle.status = !myVehicle.status;
    let message = myVehicle.status ? "Successfully marked as available" : "Successfully marked as Sold";
    await myVehicle.save();
    res.status(200).json({
        success: true,
        message: message,
    })
})


exports.showSellerDetails = catchAsyncErrors(async (req, res, next) => {
    let user = await userModel.findById(req.user.id)
    if (!user) {
        return next(new errorHandler("User does not exist", 400))
    }
    let vehicleID = req.query.vehicleID;

    if (!vehicleID || !mongoose.isValidObjectId(vehicleID)) {
        return next(new errorHandler("Please Provide Correct Vehicle Info", 404))
    }

    let vehicleInfo = await vehicleModel.findById(vehicleID)
        .populate({
            path: "owner"
        })
    if (!vehicleInfo) {
        return res.status(400).json({
            success: false,
            message: "vehicle not found."
        })
    }
    let sellerCallingCode = vehicleInfo?.owner?.phoneCountryCode;
    let sellerPhoneNumber = vehicleInfo?.owner?.phoneNumber;
    if (!sellerCallingCode || !sellerPhoneNumber) {
        return res.status(400).json({
            success: false,
            message: "seller details not found."
        })
    }
    let sellerDetails = sellerCallingCode + sellerPhoneNumber;
    res.status(200).json({
        success: true,
        message: "successfully fetched seller details",
        data: sellerDetails
    })
})

