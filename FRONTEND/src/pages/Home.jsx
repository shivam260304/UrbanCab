import { useState, useRef } from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from "../components/LocationSearchPannel";
import VehiclePannel from "../components/vehiclePannel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";


const Home = () => {

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [pannelOpen, setPannelOpen] = useState(false);
  const [vehiclePannel, setVehiclePannel] = useState(false);
  const [confirmedRidePannelOpen, setConfirmedRidePannelOpen] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const panelRef = useRef(null);
  const vehiclePannelref = useRef(null);
  const confirmedRidePannelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);


  const submitHandler = (e) =>{
    e.preventDefault();
  }

  useGSAP(function(){  
    if(pannelOpen){
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 20
      })
    }
    else{
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0
      })
    }
  },[pannelOpen])

  useGSAP(function(){
    if(vehiclePannel){
      gsap.to(vehiclePannelref.current,{
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(vehiclePannelref.current,{
        transform: 'translateY(100%)'
      })
    }
  },[vehiclePannel])

  useGSAP(function(){
    if(confirmedRidePannelOpen){
      gsap.to(confirmedRidePannelRef.current,{
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(confirmedRidePannelRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[confirmedRidePannelOpen])

  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(vehicleFoundRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[vehicleFound])

  useGSAP(function(){
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[waitingForDriver])

  return (
    <div className="h-screen relative overflow-hidden">
      <img className='h-8 absolute left-5 top-5' src={`/images/logon.png`} alt="Cab" />

      <div className="h-screen w-screen">
        {/* Image for temporary use */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>

      <div className="flex flex-col justify-end absolute h-screen top-0 w-full">
        <div className="h-[30%] bg-white relative py-6 px-5">
          <h5
          onClick={()=>{
            setPannelOpen(false);
          }}
          className="absolute top-6 right-6 text-2xl">
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>

          <form onSubmit={(e)=>{
            submitHandler(e);
          }}>
            <div className="line absolute h-16 w-1 top-[45%] bg-gray-900 left-10 rounded-full "></div>
            <input
            onClick={()=>{
              setPannelOpen(true);
            }}
            value={pickup}
            onChange={(e)=>{
              setPickup(e.target.value);
            }}
            className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
            type="text"
            placeholder="Add a pick up location"
            />
            
            <input
            onClick={()=>{
              setPannelOpen(true);
            }}
            value={destination}
            onChange={(e)=>{
              setDestination(e.target.value);
            }}
            className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
            type="text"
            placeholder="Enter your destination"
            />
          </form>

        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPannel setPannelOpen={setPannelOpen} setVehiclePannel={setVehiclePannel}/>
        </div>
      </div>

      <div ref={vehiclePannelref} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white">
        <VehiclePannel setVehiclePannel={setVehiclePannel} setConfirmedRidePannelOpen={setConfirmedRidePannelOpen}/>
      </div>

      <div ref={confirmedRidePannelRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white">
        <ConfirmedRide setVehicleFound={setVehicleFound} setConfirmedRidePannelOpen={setConfirmedRidePannelOpen}/>
      </div>

      <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white">
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white">
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  )
}

export default Home

