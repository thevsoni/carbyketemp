const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"]
    },
    phoneCountryCode: {
        type: String,
        default: "+91",
    },
    phoneNumber: {
        type: String,
        required: [true, "Please Enter Your Phone Number"],
        unique: true,
        validate: {
            validator: function (value) {
                return /^\d{10}$/.test(value);
            },
            message: "Please Enter a valid 10-digit Phone Number",
        },
    },
    favouriteVehicle: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Vehicle",
        }
    ],
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    postalCode: {
        type: String,
    },
},
    {
        timestamps: true
    }
)

//jwt token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

module.exports = mongoose.model("User", userSchema)