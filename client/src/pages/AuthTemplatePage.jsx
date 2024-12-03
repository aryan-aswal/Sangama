import React, { useState } from 'react'
import image_1 from '../assets/auth_page_image_1.jpg';
import image_2 from '../assets/auth_page_image_2.jpg';
import image_3 from '../assets/auth_page_image_3.jpg';
import image_4 from '../assets/auth_page_image_4.png';
import LoginForm from '../components/AuthTemplatePage/LoginForm';
import SignupForm from '../components/AuthTemplatePage/SignupForm';

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const AuthTemplatePage = () => {
    const [pageState, setPageState] = useState('login');
    return (
        <div className="flex overflow-hidden" style={{ height: 'calc(100vh - 4.1rem)' }}>
            {/* Left Section */}
            <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8">
                <div className="max-w-sm w-full space-y-6">
                    <div className="flex items-center justify-center mb-6">
                        <h1 className="text-2xl font-bold text-[#1F2937]"> {pageState == 'login' ? 'Log in to your Account' : 'Create an Account'}</h1>
                    </div>
                    <p className="text-center text-[#6B7280]"> {pageState == 'login' ? "Welcome back!" : "Join us today!"}</p>

                    {/* Email and Password Form */}
                    {
                        pageState == 'login' ? <LoginForm setPageState={setPageState}></LoginForm> : <SignupForm setPageState={setPageState}></SignupForm>
                    }
                </div>
            </div>

            {/* Right Section */}
            <div className="relative flex justify-center items-center w-full md:w-1/2 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] p-8" style={{ height: 'calc(100vh - 4.1rem)' }}>
                {/* Decorative Floating Circles */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-20 rounded-full animate-float"></div>
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-white opacity-10 rounded-full animate-float"></div>

                {/* Heading or Tagline */}
                <div className='mt-24'>
                    <h2 className="absolute top-10 text-4xl font-semibold text-white opacity-90 mt-16">
                        Explore Our Community
                    </h2>

                    {/* Card Container for Swiper */}
                    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-2xl p-6 max-w-md w-full">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                        >
                            <SwiperSlide>
                                <div className="flex items-center justify-center aspect-square">
                                    <img src={image_1} className="w-full h-full object-cover rounded-lg shadow-lg" />
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="flex items-center justify-center aspect-square">
                                    <img src={image_2} className="w-full h-full object-cover rounded-lg shadow-lg" />
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="flex items-center justify-center aspect-square">
                                    <img src={image_3} className="w-full h-full object-cover rounded-lg shadow-lg" />
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="flex items-center justify-center aspect-square">
                                    <img src={image_4} className="w-full h-full object-cover rounded-lg shadow-lg" />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthTemplatePage
