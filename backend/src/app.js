const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true
}))


//require all the routes here
const authRouter = require("./routes/auth.routes")
const accountRouter = require("./routes/account.routes");
const transactionRouter = require("./routes/transaction.routes");


//using all the routes here
app.get("/", (req, res) => {
    res.json({ message: "SkyBank API is running successfully!" })
})
app.use("/api/auth", authRouter)
app.use("/api/accounts", accountRouter)
app.use("/api/transactions", transactionRouter)




module.exports = app