const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async(req, res, next) => {
    try {
        const token = req?.body?.token || req?.cookies?.token || req?.header("Authorization").split(" ")[1];

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            })
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;

        } catch (error) {
            console.log("yhn aara hai error");
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while validating the token",
        })
    }
}

const socketAuth = (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error("Authentication error: Token not provided"));
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = user;
        next();
    } catch (err) {
        console.log("ERROR OCCURRED AT SOCKET AUTH", err)
        return next(new Error("Authentication error: Invalid token"));
    }
};

module.exports = { auth, socketAuth };