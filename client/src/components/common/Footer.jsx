import React from 'react'
import Logo from '../../assets/logo.png'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
    const footerLinks = ['Home', 'Features', 'Downloads', 'Plans & Pricing', 'Contact Us']
    const socialLinks = [
        {
            icon: <FaInstagram />,
            link: 'https://www.instagram.com/_aryan_aswal_45/'
        },
        {
            icon: <FaFacebook />,
            link: 'https://www.facebook.com/profile.php?id=100088831088706&ref=xav_ig_profile_web'
        },
        {
            icon: <FaXTwitter />,
            link: 'https://www.twitter.com'
        },
        {
            icon: <FaGithub />,
            link: 'https://www.github.com'
        }
    ]
    return (
        <div className='my-20'>
            <div className='w-[90%] mx-auto flex justify-between'>
                <div>
                    <img src={Logo} alt='logo' className='h-10 w-30' />
                    <p className='text-gray-500 font-medium text-sm ml-2 mt-2'>Experience efficient collaboration</p>
                    <p className='text-gray-500 font-medium text-sm ml-2'>Enjoy ultimate video calling app</p>
                </div>
                <div>
                    <div className='flex gap-5'>
                        {
                            footerLinks.map((link, index) => (
                                <p key={index} className='text-black font-medium cursor-pointer'>{link}</p>
                            ))
                        }
                    </div>
                    <div className='flex gap-5 float-end items-center'>
                        <h1 className='mt-4 font-semibold text-gray-500'>Follow us</h1>
                        {
                            socialLinks.map((social, index) => (
                                <a href={social.link} key={index} className='text-gray-500 font-medium cursor-pointer hover:text-black text-xl mt-4'>{social.icon}</a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer