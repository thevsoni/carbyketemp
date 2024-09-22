const express = require("express");
const { signUpAdmin } = require("../controllers/admin");
const { isAuthenticatedAdmin } = require("../middleware/auth");

const router = express.Router();

router.route("/signUpAdmin").post(isAuthenticatedAdmin, signUpAdmin);

module.exports = router;
