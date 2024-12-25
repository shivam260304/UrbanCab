import { useState, useRef } from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from "../components/LocationSearchPannel";


const Home = () => {

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pannelOpen, setPannelOpen] = useState(false);
  const panelRef = useRef(null);


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

  return (
    <div className="h-screen relative">
      <img className='h-8 absolute left-5 top-5' src={`${import.meta.env.VITE_IMAGE_PATH}`} alt="Cab" />
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
          <LocationSearchPannel/>
        </div>
      </div>
    </div>
  )
}

export default Home

