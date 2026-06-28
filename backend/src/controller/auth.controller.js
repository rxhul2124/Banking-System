const userModel = require("../models/user.model")
const accountModel = require("../models/account.model")
const blacklistModel = require("../models/blacklist.model")
const jwt = require("jsonwebtoken")

/**
 * @name registerUserController
 * @description register user, expects email, name, password
 * @access public
 */

async function registerUserController(req, res) {
    const { email, name, password } = req.body;

    const isUserExists = await userModel.findOne({
        email: email
    })

    if (isUserExists) {
        return res.status(422).json({
            message: "User already exists with this email address",
            status: "failed"
        })
    }

    const user = await userModel.create({
        email, password, name
    })
    await accountModel.create({ user: user._id })

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            systemUser: user.systemUser
        },
        token
    })

}


/**
 * @name loginUserController
 * @description login user, expects email and password
 * @access public
 */

async function loginUserController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password").select("+systemUser")

    if (!user) {
        res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "User Logged in successfully",
        user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            systemUser: user.systemUser
        },
        token
    })

}

async function logoutUserController(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(200).json({
            message: "User is already logged out"
        })
    }

    res.clearCookie("token")

    await blacklistModel.create({
        token: token
    })

    res.status(200).json({
        message: "User logged out successfully"
    })

}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController
}