import { useState, useRef, useContext, useEffect } from "react";
import {useGSAP} from "@gsap/react";
import axios from "axios";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from "../components/LocationSearchPannel";
import VehiclePannel from "../components/vehiclePannel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import LiveTracking from "../components/Livetracking";



const Home = () => {

  const navigate = useNavigate();

  // State Variables (Grouped)
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pannelOpen, setPannelOpen] = useState(false);
  const [vehiclePannel, setVehiclePannel] = useState(false);
  const [confirmedRidePannelOpen, setConfirmedRidePannelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  // Refs (Grouped)
  const vehiclePannelref = useRef(null);
  const confirmedRidePannelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const panelRef = useRef(null);

  // Context (Before useEffect)
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  // useEffect for socket connections
  useEffect(() => {
    if (user._id) {
      socket.emit("join", { userID: user._id, userType: "user" });
    }
  }, [user, socket]);

  // Socket Event Listeners
  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } });
  });

  socket.on("ride-ended", () => {
    navigate("/home");
  });

  // Event Handlers
  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPickupSuggestions(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  async function findTrip() {
    setPannelOpen(false);
    if (pickup === destination) {
      alert("Pickup and Destination cannot be the same");
      return;
    }
    setVehiclePannel(true);
    setVehicleFound(false);
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setFare(res.data);
  }

  async function createRide() {
    if (pickup === destination) {
      return;
    }
    setVehicleFound(true);
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      { pickup, destination, vehicleType },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  }

  // GSAP Animations (Grouped)
  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: pannelOpen ? "100%" : "0%",
      padding: pannelOpen ? 20 : 0,
    });
  }, [pannelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePannelref.current, {
      transform: vehiclePannel ? "translateY(0)" : "translateY(100%)",
    });
  }, [vehiclePannel]);

  useGSAP(() => {
    gsap.to(confirmedRidePannelRef.current, {
      transform: confirmedRidePannelOpen ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmedRidePannelOpen]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? "translateY(0)" : "translateY(100%)",
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? "translateY(0)" : "translateY(100%)",
    });
  }, [waitingForDriver]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img className='h-8 absolute left-5 top-5' src={`/images/logon.png`} alt="Cab" />

      <div className="h-screen w-screen">
        <LiveTracking/>
        {/* Image for temporary use */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>

      <div className="flex flex-col justify-end absolute h-screen top-0 w-full">
        <div className="h-[30%] bg-white relative py-6 px-5">
        <Link
            to="/user/logout"
            className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
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
              setVehicleFound(false)
              setActiveField("pickup");
            }}
            value={pickup}
            onChange={handlePickupChange}
            className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
            type="text"
            placeholder="Add a pick up location"
            />
            
            <input
            onClick={()=>{
              setPannelOpen(true);
              setVehicleFound(false)
              setActiveField("destination");
            }}
            value={destination}
            onChange={handleDestinationChange}
            className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
            type="text"
            placeholder="Enter your destination"
            />
          </form>

          <button onClick={findTrip} className="bg-black text-white px-4 py-2 rounded-lg mt-7 w-full">
            Find Trip
          </button>

        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPannel
            setPannelOpen={setPannelOpen}
            setVehiclePannel={setVehiclePannel}
            suggestions = {activeField === "pickup" ? pickupSuggestions : destinationSuggestions}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      <div ref={vehiclePannelref} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white">
        <VehiclePannel 
          setVehiclePannel={setVehiclePannel}
          setVehicleFound={setVehicleFound}
          setConfirmedRidePannelOpen={setConfirmedRidePannelOpen}
          fare={fare}
          setVehicleType={setVehicleType}
        />
      </div>

      <div ref={confirmedRidePannelRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white">
        <ConfirmedRide 
          setVehicleFound={setVehicleFound}
          setConfirmedRidePannelOpen={setConfirmedRidePannelOpen}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>

      {/* <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white">
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div> */}

      <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white">
        <WaitingForDriver ride = {ride} setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  )
}

export default Home
