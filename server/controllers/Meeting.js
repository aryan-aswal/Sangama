require('dotenv').config();
const Agora = require('agora-access-token');
const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;
const User = require('../models/User');
const Meeting = require('../models/Meeting');
const { v4: uuidv4 } = require('uuid');

const createToken = async (req, res) => {
    try {
        const { channel } = req.body;
        const userId = req.user.id;

        if (!channel) {
            return res.status(400).json({
                success: false,
                message: 'Channel is required'
            });
        }

        const isChannelExist = await Meeting.findOne({ room_name: channel });
        if (isChannelExist) {
            return res.status(400).json({
                success: false,
                message: 'Channel already exist'
            });
        }

        const uid = 0;
        const role = Agora.RtcRole.PUBLISHER;
        const expireTime = 3600;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpireTimestamp = currentTimestamp + expireTime;

        const token = Agora.RtcTokenBuilder.buildTokenWithUid(
            APP_ID,
            APP_CERTIFICATE,
            channel,
            uid,
            role,
            privilegeExpireTimestamp
        );

        const meetingLink = `https://sangama-navy.vercel.app/meeting/${channel}/${uuidv4()}`;

        const meetingDetails = await Meeting.create({ room_name: channel, room_token: token, meeting_link: meetingLink, admin: userId, participants: [userId] });
        await User.findByIdAndUpdate(userId, { meeting: meetingDetails._id });

        res.status(200).json({
            success: true,
            message: 'Token created',
            data: meetingDetails
        });
    } catch (error) {
        console.log("Error occurred at createToken controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const fetchMeetingDetails = async (req, res) => {
    try {
        const { channel, uid } = req.query;
        if (!channel || !uid) {
            return res.status(400).json({
                success: false,
                message: "Please provide required details"
            })
        }
        const meetingLink = `https://sangama-navy.vercel.app/meeting/${channel}/${uid}`;
        const meetingDetails = await Meeting.findOne({ meeting_link: meetingLink })
            .populate('admin')
            .populate('participants');

        if (!meetingDetails) {
            return res.status(404).json({
                success: true,
                message: "No meeting found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Meeting found",
            data: meetingDetails
        })
    } catch (error) {
        console.log("Error occurred at fetchToken controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const joinMeeting = async (req, res) => {
    try {
        const { meetingLink } = req.body;
        
        if (!meetingLink) {
            return res.status(400).json({
                success: false,
                message: "Meeting link is required",
            });
        }

        const meetingDetails = await Meeting.findOne({ meeting_link: meetingLink });
        if (!meetingDetails) {
            return res.status(404).json({
                success: false,
                message: "Meeting not found",
            });
        }

        // Check if user is already in participants
        const isUserInMeeting = meetingDetails.participants.includes(req.user.id);
        if (!isUserInMeeting) {
            await Meeting.findByIdAndUpdate(meetingDetails._id, {
                $push: { participants: req.user.id },
            });
        }

        res.status(200).json({
            success: true,
            message: isUserInMeeting 
                ? "User already in the meeting" 
                : "User successfully added to the meeting",
        });
    } catch (error) {
        console.log("Error occurred at joinMeeting controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const fetchMessages = async(req, res) => {
    try {
        const { meetingLink } = req.query;
        if (!meetingLink) {
            return res.status(400).json({
                success: false,
                message: "Meeting link is required",
            });
        }
        const messages = await Meeting.find({ meeting_link: meetingLink })
            .select('messages')
            .populate({
                path: 'messages',
                populate: {
                    path: 'user',
                }
            });

        const responseObject = messages.map((obj) => {return obj.messages} );
        res.status(200).json({
            success: true,
            message: "Messages found",
            data: responseObject.flat()
        });
    } catch (error) {
        
    }
}

module.exports = { createToken, fetchMeetingDetails, joinMeeting, fetchMessages };