const userModel = require("../models/mongo/user")
const vehicleModel = require("../models/mongo/vehicle")
const cityModel = require("../models/mongo/city")
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const mongoose = require("mongoose")



exports.createVehicle = catchAsyncErrors(async (req, res, next) => {

    const { city, state, country } = req.body;
    if (!city || !state || !country) {
        return next(new errorHandler("Please Enter All Details", 400))
    }
    let location = await cityModel.findOne({ city, state, country });
    if (!location) {
        return next(new errorHandler("Location does not exists", 400))
    }

    let ownerId = req.body?.owner;
    if (!mongoose.isValidObjectId(ownerId)) {
        return next(new errorHandler("Please Enter Correct User", 400))
    }
    let user = await userModel.findOne({ _id: ownerId });
    if (!user) {
        return next(new errorHandler("User Not Found", 400))
    }

    vehicle = await vehicleModel.create(req.body)

    res.status(201).json({
        success: true,
        message: "Vehicle Created Successfully"
    })
})

exports.getAllVehicle = catchAsyncErrors(async (req, res, next) => {

    let obj = { status: 1 }
    let allVehicle = await vehicleModel.find(obj);

    if (allVehicle.length == 0) {
        return res.status(200).json({
            success: false,
            message: "no vehicle found",
        })
    }

    res.status(200).json({
        success: true,
        message: "all vehicle fetched successfully",
        data: allVehicle
    })
})

exports.getTopThreeVehicle = catchAsyncErrors(async (req, res, next) => {

    let obj = { status: 1 }
    let allVehicle = await vehicleModel.find(obj).sort({ price: 1 }).limit(3);;

    if (allVehicle.length == 0) {
        return res.status(200).json({
            success: false,
            message: "no vehicle found",
        })
    }

    res.status(200).json({
        success: true,
        message: "top 3 vehicle fetched successfully",
        data: allVehicle
    })
})



exports.getAllColor = catchAsyncErrors(async (req, res, next) => {
    let allColors = ["Red", "Black", "White", "Grey"]
    res.status(200).json({
        success: true,
        message: "all colors fetched Successfully",
        data: allColors
    })
})

exports.getAllBrandName = catchAsyncErrors(async (req, res, next) => {
    let allColors = ["Tata", "Maruti Suzuki", "Toyota", "Hyundai", "Mahindra"];
    res.status(200).json({
        success: true,
        message: "all Brand name fetched Successfully",
        data: allColors
    })
})

exports.getAllFuelType = catchAsyncErrors(async (req, res, next) => {
    let allColors = ["Petrol", "Diesel", "CNG", "Electric"];
    res.status(200).json({
        success: true,
        message: "all Fuel Type fetched Successfully",
        data: allColors
    })
})

exports.getAllBodyType = catchAsyncErrors(async (req, res, next) => {
    let allColors = ["Hatchback", "Sedan", "SUV", "MUV", "Coupe", "Convertible"];
    res.status(200).json({
        success: true,
        message: "all Body Type fetched Successfully",
        data: allColors
    })
})