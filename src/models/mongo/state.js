const mongoose = require("mongoose")

const stateSchema = new mongoose.Schema({
    state: {
        type: String,
        required: [true, "Please Enter Name"]
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


module.exports = mongoose.model("State", stateSchema)