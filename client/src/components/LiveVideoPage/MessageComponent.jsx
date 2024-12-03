import React from 'react'
import { useSelector } from 'react-redux'
import { fetchTime } from '../../utils/DateAndTime';

const MessageComponent = ({ chat }) => {
    const { user } = useSelector((state) => state.auth);
    return (
        <div className={`gap-2 rounded-md p-2 ${user.email === chat.user.email ? "bg-[#3F8DFD] self-end text-white" : "text-white bg-[#1B1A1D] "} flex flex-col`}>
            <p className='flex justify-between gap-2 items-center'>
                <span className='text-xs'>{chat.user.username}</span>
                <span className= {`text-xs ${user.email === chat.user.email ? "text-white" : "text-[#474a4c]"}`}>{fetchTime(chat.createdAt)}</span>
            </p>
            <p className='text-normal'>{chat.message}</p>
        </div>
    )
}

export default MessageComponent
