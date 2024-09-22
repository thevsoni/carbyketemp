const express = require("express");
const { createCountry, createState, createCity, getAllCity } = require("../controllers/location");
const { isAuthenticatedAdmin, isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/createCountry").post(isAuthenticatedAdmin, createCountry);
router.route("/createState").post(isAuthenticatedAdmin, createState);
router.route("/createCity").post(isAuthenticatedAdmin, createCity);
router.route("/getAllCity").get(getAllCity);

module.exports = router;
