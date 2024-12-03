import React, { useState } from 'react';
import Wrapper from '../components/common/Wrapper';
import illustrationImage from '../assets/illustration_1.jpg';
import NewMeetingForm from '../components/MeetingPage/NewMeetingForm';
import JoinMeetingForm from '../components/MeetingPage/JoinMeetingForm';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createMeeting, joinMeeting } from '../services/operations/MEETING_API';

const MettingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [meetingLink, setMeetingLink] = useState('');
    const [userName, setUserName] = useState('');
    const [roomName, setRoomName] = useState('');

    const createNewMeeting = () => {
        if (!token) return toast.error('Please login to create a new meeting');
        if (!userName || !roomName) return toast.error('Please fill all the fields');
        dispatch(createMeeting({ channel: roomName }, token, navigate));
    }
    const handleJoinMeeting = async() => {
        if (!token) return toast.error('Please login to join a meeting');
        if (!meetingLink) return toast.error('Please enter a meeting link');
        const response = await joinMeeting({ meetingLink }, token);
        if(!response) return toast.error('Meeting not found')
        const channel = meetingLink.split("/").at(-2);
        const uid = meetingLink.split("/").at(-1);
        navigate(`/meeting/${channel}/${uid}`);
    }
    return (
        <div className='flex justify-center items-center h-[calc(100vh-5rem)]'>
            <Wrapper>
                <div className='w-5/12 flex flex-col gap-5'>
                    <h1 className='text-4xl font-semibold'>Video calls and meeting for everyone</h1>
                    <p className='text-gray-500 font-medium'>Connect, collaborate and celetebrate from anywhere with Roomify</p>
                    <div className='flex gap-5 flex-col'>
                        <NewMeetingForm setRoomName={setRoomName} setUserName={setUserName} />
                        <button
                            className='bg-[#1657FF] text-white p-2 rounded-md hover:bg-blue-500 hover:scale-95 transform transition duration-300 font-semibold tracking-wider'
                            onClick={createNewMeeting}
                        >
                            New Meeting
                        </button>
                    </div>
                    <hr className='my-2' />
                    <div className='flex gap-5 flex-col'>
                        <JoinMeetingForm setMeetingLink={setMeetingLink} />
                        <button
                            className='bg-white text-gray-500 p-2 rounded-md border-gray-200 border-2 w-full hover:scale-95 transform transition duration-300 font-semibold tracking-wider'
                            onClick={handleJoinMeeting}
                        >
                            Join Meeting
                        </button>
                    </div>
                </div>
                <div className='w-7/12'>
                    <img
                        src={illustrationImage}
                        alt="Illustration"
                        className='w-full h-full object-cover rounded-md'
                    />
                </div>
            </Wrapper>
        </div>
    )
}

export default MettingPage