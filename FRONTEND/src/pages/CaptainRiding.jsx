import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from "../components/FinishRide"
import LiveTracking from '../components/Livetracking'

const CaptainRiding = () => {

  const [finishRidePannel, setFinishRidePannel] = useState(false)
  const finishRidePannelref = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(function () {
    if(finishRidePannel){
      gsap.to(finishRidePannelref.current, {
        transform: 'translateY(0)',
      })
    }
    else{
      gsap.to(finishRidePannelref.current, {
        transform: 'translateY(100%)',
      })
    }
  },[finishRidePannel])

  return (
    <div className='h-screen'>
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img className="h-8" src={`/images/logon.png`} alt="" />
        {/* <Link
            to="/captain-login"
            className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link> */}
      </div>

    {/* First Half of the screen */}
      <div className='h-4/5'>
          {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
          <LiveTracking />
      </div>

    {/* Second half of the screen */}
      <div onClick={()=>{
        setFinishRidePannel(true); //when clicking on complete ride button
      }} className='h-1/5 p-6 flex relative items-center justify-between bg-yellow-400'>
      <h5
        onClick={() => {
          setFinishRidePannel(true);
        }}
        className="p-1 text-center w-[95%] absolute top-0"
      >
        <i className="text-3xl ri-arrow-up-wide-line"></i>
      </h5>
        <h4 className='text-xl font-semibold'>Drive Safely</h4>
        <button className="w-1/2 mt-1 bg-green-600 text-white font-semibold p-2 rounded-lg">Complete Ride</button>
      </div>

      <div ref={finishRidePannelref} className="fixed w-full h-screen z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white">
        <FinishRide ride={rideData} setFinishRidePannel={setFinishRidePannel}/>
      </div>
    </div>
  )
}

export default CaptainRiding