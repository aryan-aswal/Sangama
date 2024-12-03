import React from 'react'

const JoinMeetingForm = ({setMeetingLink}) => {
    return (
        <div>
            <input
                type='text'
                placeholder='Enter meeting link'
                className='border border-gray-300 p-2 rounded-md w-full'
                name='meetingLink'
                onChange={(e) => setMeetingLink(e.target.value)}
            />
        </div>
    )
}

export default JoinMeetingForm