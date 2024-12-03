const router = require('express').Router();
const {
    login,
    signup,
    sendotp,
} = require("../controllers/Auth")

router.post("/sign-in", login)
router.post("/sign-up", signup)
router.post("/send-otp", sendotp)

module.exports = router;