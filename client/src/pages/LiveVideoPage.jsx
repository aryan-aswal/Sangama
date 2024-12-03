import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMeetingDetails, fetchMessages, joinMeeting } from '../services/operations/MEETING_API';
import logo from '../assets/black-logo-new.png';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaRegCopy, FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import {
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
} from 'agora-rtc-react';
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import toast from 'react-hot-toast';
import ChatComponent from '../components/LiveVideoPage/ChatComponent';

const LiveVideoPage = () => {
    const APP_ID = import.meta.env.VITE_APP_AGORA_APP_ID;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { uid, channel } = useParams();
    const { token } = useSelector((state) => state.auth);

    const [activeConnection, setActiveConnection] = useState(true);
    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(true);
    const [meetingDetails, setMeetingDetails] = useState(null);
    const [messages, setMessages] = useState([]);

    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack, error } = useLocalCameraTrack(cameraOn);
    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    audioTracks.forEach((tracks) => {
        tracks.play();
    })

    const handleLeaveMeeting = async () => {
        setActiveConnection(false);
        setMeetingDetails(null);
        localStorage.removeItem('meetingDetails');
        navigate('/');
    };

    const getMessages = async () => {
        const response = await fetchMessages({ meetingLink: `http://localhost:5173/meeting/${channel}/${uid}` }, token);
        if (!response) return toast.error("Error fetching messages");
        setMessages(response.data);
    };

    const joinUser = async () => {
        await joinMeeting({ meetingLink: `http://localhost:5173/meeting/${channel}/${uid}` }, token);
    };

    useJoin(
        {
            appid: APP_ID,
            channel: meetingDetails?.room_name,
            token: meetingDetails?.room_token,
        },
        activeConnection
    );
    usePublish([localMicrophoneTrack, localCameraTrack]);

    const getMeetingDetails = async () => {
        const data = await dispatch(fetchMeetingDetails({ channel, uid }, token));
        setMeetingDetails(data);
        setActiveConnection(true);
    };

    useEffect(() => {
        getMeetingDetails();
        joinUser();
        getMessages();

        return () => {
            setActiveConnection(false);
            setMeetingDetails(null);
            setMessages([]);
        };
    }, [channel, uid, token]);

    useEffect(() => {
        if (error && error.message.includes("NotReadableError")) {
            toast.error("Camera is already in use. Please close other applications using the camera.");
        } else if (error) {
            toast.error("Something went wrong while streaming video.");
        }
    }, [error]);

    return (
        <div className="bg-[#1B1A1D] h-screen">
            <div className="border-b-1 border-[#2F2F31] flex items-center h-[10%]">
                <img src={logo} alt="Logo" className="w-40 h-16 border-r-2 border-[#2F2F31]" />
                <h1 className="text-4xl text-white ml-4">{channel}</h1>
            </div>
            <div className="w-10/12 flex mx-auto h-[80%] gap-10">
                {/* Video Section */}
                <div className="h-full w-[60%] flex flex-col items-center">
                    {/* Remote Video Grid */}
                    <Swiper
                        modules={[Navigation, Scrollbar, A11y]}
                        spaceBetween={20}
                        slidesPerView={3}
                        navigation={{
                            nextEl: ".custom-next-btn",
                            prevEl: ".custom-prev-btn",
                        }}
                        className="w-full flex gap-10 mb-2"
                    >
                        {remoteUsers.map((user) => (
                            <SwiperSlide key={user.uid} className="flex items-center justify-center p-2">
                                <div className="w-full h-full max-w-[150px] min-w-[150px] aspect-video bg-black rounded-lg overflow-hidden">
                                    <RemoteUser user={user} />
                                </div>
                            </SwiperSlide>
                        ))}
                        <button className="custom-prev-btn cursor-pointer bg-[#2F2F31]">
                            <FaArrowLeft className="text-2xl text-white" />
                        </button>
                        <button className="custom-next-btn cursor-pointer bg-[#2F2F31]">
                            <FaArrowRight className="text-2xl text-white" />
                        </button>
                    </Swiper>

                    {/* Local Video */}
                    <div className="w-[50vw] aspect-video right-6 bottom-6 bg-black rounded-lg shadow-lg overflow-hidden">
                        <LocalUser
                            audioTrack={localMicrophoneTrack}
                            videoTrack={localCameraTrack}
                            cameraOn={cameraOn}
                            micOn={micOn}
                            playAudio={false}
                            playVideo={cameraOn}
                        />
                    </div>
                </div>
                {/* Chat Section */}
                <div className="w-[40%] bg-[#2B2D2E] m-2 rounded-lg">
                    <ChatComponent messages={messages} setMessages={setMessages} />
                </div>
            </div>

            {/* Controls Toolbar */}
            <div className="flex items-center justify-between w-10/12 mx-auto">
                <div className="flex items-center border-2 bg-[#2B2D2E] rounded-md border-gray-500">
                    <span className="text-2xl text-white p-4 tracking-wide border-r-2 border-gray-500">
                        {meetingDetails?.meeting_link?.split("/").at(-1).substring(0, 15)}...
                    </span>
                    <span
                        className="text-2xl text-white p-4 cursor-pointer"
                        onClick={() => {
                            navigator.clipboard.writeText(meetingDetails?.meeting_link);
                            toast.success("Link copied");
                        }}
                    >
                        <FaRegCopy />
                    </span>
                </div>
                <div className="flex gap-5">
                    <button
                        className={`p-4 ${
                            micOn ? "bg-[#2B2D2E] border-gray-500" : "bg-[#D95140] border-red-600"
                        } transition duration-300 text-white font-semibold rounded-md text-2xl border-2`}
                        onClick={() => setMic((prev) => !prev)}
                    >
                        {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
                    </button>
                    <button
                        className={`p-4 ${
                            cameraOn ? "bg-[#2B2D2E] border-gray-500" : "bg-[#D95140] border-red-600"
                        } transition duration-300 text-white font-semibold rounded-md text-2xl border-2`}
                        onClick={() => setCamera((prev) => !prev)}
                    >
                        {cameraOn ? <FaVideo /> : <FaVideoSlash />}
                    </button>
                </div>

                <div>
                    <button
                        className="p-4 bg-[#D95140] text-white rounded-lg hover:bg-red-700 transition duration-300 opacity-80 hover:opacity-100 text-2xl"
                        onClick={handleLeaveMeeting}
                    >
                        Leave Meeting
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LiveVideoPage;
