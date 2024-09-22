const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Price"]
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Please Enter Owner"]
    },
    ownerType: {
        type: String,
        enum: ["Dealer", "Owner"],
        required: [true, "Please Enter Owner Type"]
    },
    city: {
        type: String,
        required: [true, "Please Enter City Name"]
    },
    state: {
        type: String,
        required: [true, "Please Enter State Name"]
    },
    country: {
        type: String,
        required: [true, "Please Enter Country Name"]
    },
    brandName: {
        type: String,
        enum: ["Tata", "Maruti Suzuki", "Toyota", "Hyundai", "Mahindra"],
        required: [true, "Please Enter Brand Name"]
    },
    color: {
        type: String,
        enum: ["Red", "Black", "White", "Grey"],
        required: [true, "Please Enter Color Name"]
    },
    fuelType: {
        type: String,
        enum: ["Petrol", "Diesel", "CNG", "Electric"],
        required: [true, "Please Enter Fuel Type"]
    },
    bodyType: {
        type: String,
        enum: ["Hatchback", "Sedan", "SUV", "MUV", "Coupe", "Convertible"],
        required: [true, "Please Enter Body Type"]
    },
    status: {
        type: Boolean,
        enum: [1, 0],
        default: 1
    },
    sunRoof: {
        type: Boolean,
        enum: [1, 0],
        default: 0
    },
    video: {
        type: String,
    },
    image: {
        type: String,
    }
},
    {
        timestamps: true
    }
)


module.exports = mongoose.model("Vehicle", vehicleSchema)