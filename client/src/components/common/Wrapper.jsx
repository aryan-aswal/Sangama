import React from 'react'

const Wrapper = ({children, flexDirection='flex-row'}) => {
  return (
    <div className={`lg:w-[950px] mx-auto py-20 flex justify-center items-center ${flexDirection}`}>
        {children}
    </div>
  )
}

export default Wrapper