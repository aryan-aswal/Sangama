import React from 'react'
import StatMetrics from '../../utils/StatMetrics.json'
const Stats = () => {
  return (
    <div className='flex mt-10 gap-20'>
      {
        StatMetrics.map((stat, index) => (
          <div key={index} className='flex justify-center items-center gap-10'>
            <div className='flex flex-col items-center'>
              <h1 className='text-5xl font-semibold'>{stat.number}</h1>
              <p className='text-gray-500'>{stat.description}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Stats