import React, { useState } from 'react';
import Wrapper from '../common/Wrapper';
import featuresImage from '../../assets/Features.png';

const Features = () => {
    const features = ["Virtual Meetings", "Live Chat", "AI Companion", "Screen Sharing", "Recording"];
    const [isActive, setIsActive] = useState("AI Companion");

    return (
        <Wrapper>
            <div className='w-1/2'>
                <h1 className='text-5xl font-semibold mb-10'>Flexible solutions for all your needs</h1>
                <div className='flex relative'>
                    <div className='absolute top-0 bottom-0 w-[5px] bg-gray-200 rounded-full'></div>

                    <div className='flex flex-col gap-5 relative'>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-3 pl-2 relative cursor-pointer transition-all duration-500 ease-in-out ${isActive === feature ? 'z-10' : ''}`}
                                onClick={() => setIsActive(feature)}
                            >
                                {isActive === feature && (
                                    <div className='absolute left-0 h-full w-[5px] bg-[#1657FF] rounded-full transition-all duration-300 ease-in-out'></div>
                                )}
                                <p
                                    className={`text-2xl ml-5 transition-colors duration-300 ease-in-out ${isActive === feature ? 'text-black font-semibold' : 'text-gray-500'}`}
                                >
                                    {feature}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='w-1/2'>
                <img src={featuresImage} alt="Features" />
            </div>
        </Wrapper>
    );
};

export default Features;
