const countryModel = require("../models/mongo/country")
const stateModel = require("../models/mongo/state")
const cityModel = require("../models/mongo/city")
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const mongoose = require("mongoose")


exports.createCountry = catchAsyncErrors(async (req, res, next) => {
    const { country, callingCode, countryCode } = req.body;
    if (!country || !callingCode || !countryCode) {
        return next(new errorHandler("Please Enter All Details", 400))
    }
    let isCountry = await countryModel.findOne({ country });
    if (isCountry) {
        return next(new errorHandler("Country Already Exists", 409))
    }
    await countryModel.create({
        country,
        callingCode,
        countryCode
    })
    res.status(201).json({
        success: true,
        message: "Country Created Successfully"
    })
})

exports.createState = catchAsyncErrors(async (req, res, next) => {
    const { state, country } = req.body;
    if (!state || !country) {
        return next(new errorHandler("Please Enter All Details", 400))
    }
    let isState = await stateModel.findOne({ state, country });
    if (isState) {
        return next(new errorHandler("State Already Exists", 409))
    }
    let isCountryPresent = await countryModel.findOne({ country });
    if (!isCountryPresent) {
        return next(new errorHandler("Country does not Exist", 400))
    }
    await stateModel.create({
        state,
        country
    })
    res.status(201).json({
        success: true,
        message: "State Created Successfully"
    })
})

exports.createCity = catchAsyncErrors(async (req, res, next) => {
    const { city, state, country } = req.body;
    if (!city || !country || !state) {
        return next(new errorHandler("Please Enter All Details", 400))
    }
    let isCity = await cityModel.findOne({ city, state, country });
    if (isCity) {
        return next(new errorHandler("City Already Exists", 409))
    }
    let isSTatePresent = await stateModel.findOne({ state, country });
    if (!isSTatePresent) {
        return next(new errorHandler("state does not Exist", 400))
    }
    await cityModel.create({
        city,
        state,
        country
    })
    res.status(201).json({
        success: true,
        message: "City Created Successfully"
    })
})

exports.getAllCity = catchAsyncErrors(async (req, res, next) => {
    let allCity = await cityModel.find();
    if (allCity.length == 0) {
        return res.status(200).json({
            success: false,
            message: "City not found"
        })
    }
    let cityState = [];
    allCity.forEach((elem) => {
        cityState.push(elem.city + ", " + elem.state)
    })
    res.status(201).json({
        success: true,
        message: "City fetched Successfully",
        data: cityState
    })
})

exports.getAllCity = catchAsyncErrors(async (req, res, next) => {
    let allCity = await cityModel.find();
    if (allCity.length == 0) {
        return res.status(200).json({
            success: false,
            message: "City not found"
        })
    }
    let cityState = [];
    allCity.forEach((elem) => {
        cityState.push(elem.city + ", " + elem.state)
    })
    res.status(200).json({
        success: true,
        message: "City fetched Successfully",
        data: cityState
    })
})