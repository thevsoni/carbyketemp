const express = require("express");
const { createVehicle, getAllVehicle, getAllColor, getAllBrandName, getAllFuelType, getAllBodyType, getTopThreeVehicle } = require("../controllers/vehicle");
const { isAuthenticatedAdmin, isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/createVehicle").post(isAuthenticatedAdmin, createVehicle);
router.route("/getAllVehicle").get(getAllVehicle);
router.route("/getTopThreeVehicle").get(getTopThreeVehicle);
router.route("/getAllVehicle").get(getAllVehicle);
router.route("/getAllColor").get(getAllColor);
router.route("/getAllBrandName").get(getAllBrandName);
router.route("/getAllFuelType").get(getAllFuelType);
router.route("/getAllBodyType").get(getAllBodyType);

module.exports = router;
