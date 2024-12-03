const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/userRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const authRoutes = require('./routes/authRoutes');
const { dbConnect } = require('./config/database');
const { socketAuth } = require('./middleware/auth');
const Meeting = require('./models/Meeting');
const { error } = require('console');
const User = require('./models/User');
const Message = require('./models/Message');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

io.use(socketAuth);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/meeting', meetingRoutes);

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('connect', () => {
        io.emit('connect', socket.id);
    })
    socket.on('message', async(data) => {
        try {
            const meetingDetails = await Meeting.findOne({meeting_link: data.meetingLink});
            const userDetails = await User.findOne({_id: socket.user.id});

            if(!meetingDetails || !userDetails) {
                return socket.emit('error', "Something went wrong...");
            }

            if(!meetingDetails.participants.includes(userDetails._id)) {
                return socket.emit('error', "User has not joined the meeting");
            }

            const messageDetails = await Message.create({message: data.message, user: socket.user.id});
            await Meeting.findByIdAndUpdate(meetingDetails._id, {$push: {messages: messageDetails._id}});
            
            const response = await Message.findOne({_id: messageDetails._id})
                .populate('user');
            io.emit('message', response);
        } catch (error) {
            io.emit('error', "Internal server error");
        }
    });
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
})

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    dbConnect();
})

