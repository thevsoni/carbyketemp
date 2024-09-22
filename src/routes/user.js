const express = require("express");
const { signUpUser, addOrRemoveAsFavourite, myFavouriteVehicle, myVehicle, markSoldUnsold, showSellerDetails } = require("../controllers/user");
const { isAuthenticatedAdmin, isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/signUpUser").post(signUpUser);
router.route("/addOrRemoveAsFavourite").put(isAuthenticatedUser, addOrRemoveAsFavourite);
router.route("/myFavouriteVehicle").get(isAuthenticatedUser, myFavouriteVehicle);
router.route("/myVehicle").get(isAuthenticatedUser, myVehicle);
router.route("/markSoldUnsold").put(isAuthenticatedUser, markSoldUnsold);
router.route("/showSellerDetails").get(isAuthenticatedUser, showSellerDetails);

module.exports = router;
