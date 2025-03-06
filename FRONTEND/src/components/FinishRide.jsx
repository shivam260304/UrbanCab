/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

const FinishRide = (props) => {
  const navigate = useNavigate();
  const { ride, setFinishRidePannel } = props;
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const { socket } = useContext(SocketContext);

  socket.on(`payment-update-${ride._id}`, ({ paymentCompleted }) => {
    setPaymentCompleted(paymentCompleted);
    console.log("Payment marked as completed by user.");
  });

  async function endRide() {
    if (!paymentCompleted) {
      alert("Please complete the payment before finishing the ride.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        { rideId: ride._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Error ending ride:", error);
      alert("Failed to end ride.");
    }
  }

  return (
    <div className="h-screen p-4 bg-gray-100 rounded-lg shadow-lg">
      <h5
        onClick={() => setFinishRidePannel(false)}
        className="p-1 text-center w-[93%] absolute top-0 cursor-pointer"
      >
        <i className="text-3xl ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5 text-center">
        Finish this ride
      </h3>

      {/* User Details */}
      <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-lg shadow-md">
        <img
          className="h-14 w-14 rounded-full border-2 border-gray-300"
          src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
          alt="User"
        />
        <div className="text-right">
          <h2 className="text-lg font-semibold capitalize text-gray-800">{`${ride?.user.fullname.firstname} ${ride?.user.fullname.lastname}`}</h2>
          <p className="text-sm text-gray-500">
            ⭐ {ride?.user.rating || "4.7"} (200+ rides)
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-between items-center">
        <button
          onClick={() => setPaymentCompleted(true)}
          className="w-full flex justify-center bg-blue-200 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-md hover:shadow-lg active:shadow-sm"
        >
          Cash Payment received
        </button>

        <button
          onClick={endRide}
          className="w-full flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg hover:bg-green-700 transition"
        >
          Finish Ride
        </button>
      </div>
    </div>
  );
};

export default FinishRide;
