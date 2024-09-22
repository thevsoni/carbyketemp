const mongoose = require("mongoose")

const countrySchema = new mongoose.Schema({
    country: {
        type: String,
        required: [true, "Please Enter Name"]
    },
    countryCode: {
        type: String,
    },
    callingCode: {
        type: String,
    },

},
    {
        timestamps: true
    }
)


module.exports = mongoose.model("Country", countrySchema)