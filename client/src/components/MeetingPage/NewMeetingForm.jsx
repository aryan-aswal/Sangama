import React from 'react'

const NewMeetingForm = ({setUserName, setRoomName}) => {
  return (
    <div>
        <form>
            <div className='flex flex-col gap-2'>
                <input 
                    type="text" 
                    id='userName' 
                    placeholder='Enter your name'
                    className='border border-gray-300 p-2 rounded-md w-full'
                    name='userName'
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input 
                    type="text" 
                    id='roomName' 
                    placeholder='Enter Room Name'
                    className='border border-gray-300 p-2 rounded-md w-full'
                    name='roomName'
                    onChange={(e) => setRoomName(e.target.value)}
                />
            </div>
        </form>
    </div>
  )
}

export default NewMeetingForm