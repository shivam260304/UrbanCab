
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import CaptainDetails from "../components/CaptainDetails"
import RidePopUp from "../components/RidePopUp"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";


const CaptainHome = () => {

  const [ridePopUpPannel, setRidePopUpPannel] = useState(false);
  const [confirmRidePopUpPannel, setConfirmRidePopUpPannel] = useState(false);

  const ridePopUpref = useRef(null);
  const confrimRidePopUpref = useRef(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext)
  const {captain} = useContext(CaptainDataContext)
  
    useEffect(() => {
      if (captain._id) {
        socket.emit("join", {
          userID: captain._id,
          userType: "captain",
        });
      }

      const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

                socket.emit('update-location-captain', {
                    captainId: captain._id,
                    location: {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            })
        }
    }

    updateLocation();
    // const locationInterval = setInterval(updateLocation,1000);

    // return () => clearInterval(locationInterval);

    }, []);

    socket.on('new-ride', (data) => {
      setRide(data);
      setRidePopUpPannel(true);
    });

    // The function below is passed to RideSetup Pannel
    async function confirmRide(){
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
        rideId : ride._id,
        captainId : captain._id,},
      {
        headers :{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      // console.log(response.data);
      setRidePopUpPannel(false);
      setConfirmRidePopUpPannel(true);
    }

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
        <RidePopUp
          ride = {ride}
          setRidePopUpPannel={setRidePopUpPannel}
          setConfirmRidePopUpPannel={setConfirmRidePopUpPannel}
          confirmRide={confirmRide}
        />
      </div>

      <div ref={confrimRidePopUpref} className="fixed w-full h-screen z-10 bottom-0 translate-y-0 px-3 py-6 pt-12 bg-white">
        <ConfirmRidePopUp ride = {ride} confirmRide ={confirmRide} setConfirmRidePopUpPannel={setConfirmRidePopUpPannel} setRidePopUpPannel={setRidePopUpPannel}/>
      </div>
      
    </div>
  )
}

export default CaptainHome
