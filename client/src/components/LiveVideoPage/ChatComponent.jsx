import React, { useEffect, useRef, useState } from 'react';
import { LuSendHorizonal } from "react-icons/lu";
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MessageComponent from './MessageComponent';
const SOCKET_IO_URL = import.meta.env.VITE_APP_SOCKET_IO_URL;
const ChatComponent = ({ messages, setMessages }) => {
    const { token } = useSelector((state) => state.auth);
    const { channel, uid } = useParams();
    const socketRef = useRef(null); // Persistent socket reference
    const [message, setMessage] = useState('');
    console.log(SOCKET_IO_URL);
    useEffect(() => {
        // Initialize socket only if it doesn't already exist
        if (!socketRef.current) {
            socketRef.current = io(SOCKET_IO_URL, {
                auth: { token },
            });

            socketRef.current.on('connect', () => {
                console.log('Connected to the server:', socketRef.current.id);
            });

            socketRef.current.on('message', (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });

            socketRef.current.on('connect_error', (error) => {
                console.error('Connection error:', error);
            });

            socketRef.current.on('error', (error) => {
                console.error('Socket error:', error);
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null; // Clean up on unmount
            }
        };
    }, [token, setMessages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            message,
            meetingLink: `http://localhost:5173/meeting/${channel}/${uid}`,
        };
        if (socketRef.current) {
            socketRef.current.emit('message', data);
        }
        setMessage('');
    };

    return (
        <div className='flex flex-col justify-between h-full p-5'>
            <div className='chat-container h-full'>
                {messages.map((chat, index) => (
                    <MessageComponent chat={chat} key={index} />
                ))}
            </div>
            <div className='text-white flex justify-between relative items-center'>
                <input
                    type="text"
                    placeholder='Write a message...'
                    className='bg-[#1B1A1D] w-full h-12 p-4 rounded-full text'
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <button className='absolute right-4' onClick={handleSubmit}>
                    <LuSendHorizonal className='text-2xl' />
                </button>
            </div>
        </div>
    );
};

export default ChatComponent;
