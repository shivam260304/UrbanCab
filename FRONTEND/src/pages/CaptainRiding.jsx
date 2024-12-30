import React from 'react'
import { Link } from 'react-router-dom'

const CaptainRiding = () => {
  return (
    <div className='h-screen'>
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img className="h-8" src={`/images/logon.png`} alt="" />
        <Link
            to="/captain-login"
            className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>

    {/* First Half of the screen */}
      <div className='h-3/5'>
            <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>

    {/* Second half of the screen */}
      
    </div>
  )
}

export default CaptainRiding