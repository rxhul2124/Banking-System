require("dotenv").config()
const app = require("./src/app")
const connectToDb = require("./src/config/database")


app.listen(4000, () => {
    console.log("Server is connected")
})


connectToDb()
