import React from 'react'
import Wrapper from '../common/Wrapper'
import { logos } from '../../utils/CompanyLogo'
import Stats from './Stats'
const TrustedPartners = () => {
    return (
        <div className='flex justify-center bg-gray-50' >
            <Wrapper flexDirection={'flex-col'}>
                <h1 className='text-5xl font-semibold mb-10'>Used by professionals in</h1>
                <div className='flex gap-10 mb-10'>
                    {
                        logos.map((logo, index) => (
                            <img src={logo.logo} alt={logo.name} key={index} className='h-10 w-28'/>
                        ))
                    }
                </div>

                <Stats></Stats>
            </Wrapper>
        </div >
    )
}

export default TrustedPartners