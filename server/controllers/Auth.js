const OTP = require('../models/OTP');
const User = require('../models/User');
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const sendotp = async(req, res ) => {
    try {
        // fetch email from request
        const { email } = req.body;

        // validation --> check whether user is registered or not
        const isUserPresent = await User.findOne({email: email});
        
        if(isUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered"
            })
        }

        // how to generate otp //
        
        do {
            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })

            var result = await OTP.findOne({otp: otp});
            
        } while (result);


        // creating entry of otp in database
        const otpPayload = {email, otp};
        const otpBody = await OTP.create(otpPayload);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp: otp,
        })
        
    } catch (error) {
        console.log("Error while sending OTP", error.message);
        res.status(501).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const signup = async(req, res) => {
    try {

        const { firstName, lastName, email, password, confirmPassword, otp } = req.body;
        const username = email.split("@")[0];

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(400).json({
                success: false,
                message: "Please Fill All The Details"
            })
        }

        if(password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password are different",
            })
        }

        const existingUser = await User.findOne({email: email});

        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            })
        }
       
        const recentOtp = await OTP.find({email: email}).sort({createdAt: -1}).limit(1); // HOW 
    
        if(recentOtp.length == 0) {
            return res.status(404).json({
                success: false,
                message: "OTP Not Found"
            })
        }
        
        if(otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

      
        const hashedPassword = await bcrypt.hash(password, 10);
      
        const user = await User.create({
            firstname: firstName, 
            lastname: lastName, 
            email, 
            password: hashedPassword, 
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}_${lastName}`,
            username
        })

        res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user: user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "User cannot be registered, Please try again later!"
        })
    }
    
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required, please try again",
            })
        }

        const user = await User.findOne({email: email});

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please sign up first",
            })
        }

        // create jwt token

        if(await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                id: user._id,
                username: user.username,
            }
            
            const JWT_SECRET = process.env.JWT_SECRET;
            
            const token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: "2h",
            })

            user.token = token;
            user.password = undefined;

            const options  = {
                expire: Date.now() + 3 * 24 * 60 * 60 * 1000,
            }
            
            res.cookie("token", token, options).status(200).json({
                success: true,
                token: token, 
                user: user,
                message: "Logged in successfully",
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Password is incorrect",
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Login failure, please try again",
        })
    }
}

module.exports = { sendotp, signup, login };