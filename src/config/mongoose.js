const mongoose = require("mongoose")
mongoose.connect(process.env.DEV_DB_URI).then((data) => {
    console.log(`monodb connected with server ${data.connection.host}`)
}).catch((error) => {
    console.log("connection failed with mongodb", error)
})

module.exports = mongoose.connection;