const mongoose = require("mongoose")

const connectToDb = () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("Database connection establised")
    } catch (error) {
        console.log("Database connection failed !!")
        process.exit(1)
    }
}

module.exports = connectToDb
