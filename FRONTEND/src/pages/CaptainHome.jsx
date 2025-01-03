import { useRef, useState } from "react";
import { Link } from "react-router-dom"
import CaptainDetails from "../components/CaptainDetails"
import RidePopUp from "../components/RidePopUp"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";


const CaptainHome = () => {

  const [ridePopUpPannel, setRidePopUpPannel] = useState(true);
  const [confirmRidePopUpPannel, setConfirmRidePopUpPannel] = useState(false);

  const ridePopUpref = useRef(null);
  const confrimRidePopUpref = useRef(null);

  useGSAP(function () {
    if(ridePopUpPannel){
      gsap.to(ridePopUpref.current, {
        transform: 'translateY(0)',
      })
    }
    else{
      gsap.to(ridePopUpref.current, {
        transform: 'translateY(100%)',
      })
    }
  },[ridePopUpPannel])

  useGSAP(function () {
    if(confirmRidePopUpPannel){
      gsap.to(confrimRidePopUpref.current, {
        transform: 'translateY(0)',
      })
    }
    else{
      gsap.to(confrimRidePopUpref.current, {
        transform: 'translateY(100%)',
      })
    }
  },[confirmRidePopUpPannel])

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
      <div className='h-2/5 p-6'>
        <CaptainDetails/>
      </div>

      <div ref={ridePopUpref} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white">
        <RidePopUp setRidePopUpPannel={setRidePopUpPannel} setConfirmRidePopUpPannel={setConfirmRidePopUpPannel}/>
      </div>

      <div ref={confrimRidePopUpref} className="fixed w-full h-screen z-10 bottom-0 translate-y-0 px-3 py-6 pt-12 bg-white">
        <ConfirmRidePopUp setConfirmRidePopUpPannel={setConfirmRidePopUpPannel} setRidePopUpPannel={setRidePopUpPannel}/>
      </div>
      
    </div>
  )
}

export default CaptainHome
