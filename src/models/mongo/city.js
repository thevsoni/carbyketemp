const mongoose = require("mongoose")

const citySchema = new mongoose.Schema({
    city: {
        type: String,
        required: [true, "Please Enter Name"]
    },
    state: {
        type: String,
        required: [true, "Please Enter State Name"]
    },
    country: {
        type: String,
        required: [true, "Please Enter Country Name"]
    },
},
    {
        timestamps: true
    }
)


module.exports = mongoose.model("City", citySchema)