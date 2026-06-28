const userModel = require("../models/user.model")
const blacklistModel = require("../models/blacklist.model")
const jwt = require("jsonwebtoken")


/**
 * @name authMiddleware
 * @description middleware to check if the user is authenticated or not
 * @access private
 */

async function authMiddleware(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]


    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        })
    }

    const isBlacklisted = await blacklistModel.findOne({ token })

    if (isBlacklisted) {
        return res.status(400).json({
            message: "Invalid token"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.userId)

        req.user = user
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        })
    }

    next()
}

/**
 * @name authSystemUserMiddleware
 * @description middleware to check if the system user is authenticated or not
 * @access private
 */

async function authSystemUserMiddleware(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        })
    }

    const isBlacklisted = await blacklistModel.findOne({ token })

    if (isBlacklisted) {
        return res.status(400).json({
            message: "Invalid token"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.userId).select("+systemUser")

        if (!user.systemUser) {
            return res.status(403).json({
                message: "Forbidden access, not a system user"
            })
        }

        req.user = user
        return next()

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }
}

module.exports = {
    authMiddleware,
    authSystemUserMiddleware
}