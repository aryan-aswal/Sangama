import React from 'react'
import Wrapper from '../common/Wrapper'
import HeroBannerImage from '../../assets/HeroBanner.png'
import { Link } from 'react-router-dom'

const HeroBanner = () => {
    return (
        <Wrapper>
            {/* HeroBanner Section */}
            <div className='flex justify-between mb-10'>
                <div className='w-3/6'>
                    <h1 className='text-5xl font-semibold mb-5 leading-[1.3]'>Supercharge your <span className='text-[#1657FF]'>meetings</span> and make it effective</h1>
                    <p className='text-sm text-gray-500 mb-5'>Experience the future of virtual communication today. <br /> Say Hello to a whole new way of connecting!</p>
                    <Link 
                        to={'/meeting'}
                    >
                        <button className='bg-[#1657FF] rounded-full py-3 px-6 text-white hover:bg-blue-500 hover:scale-95 transform transition duration-300 font-semibold tracking-wider'>
                            Start meeting now
                        </button>
                    </Link>
                </div>
                <div className='w-3/6'>
                    <img src={HeroBannerImage} className='h-full w-full aspect-video' />
                </div>
            </div>
        </Wrapper>
    )
}

export default HeroBanner