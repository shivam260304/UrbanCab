import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import LiveTracking from '../components/Livetracking';
import axios from 'axios';

const Riding = () => {
    const location = useLocation();
    const ride = location.state?.ride;
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();

    async function generateOrder() {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/pay/create-order`,
                { amount: ride?.fare }
            );

            const { id, amount, currency } = response.data;

            if (!window.Razorpay) {
                alert("Razorpay SDK failed to load. Please try again.");
                return;
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount,
                currency,
                order_id: id,
                name: "UrbanCab Test Payment",
                description: "Ride Fare Payment (Test Mode)",
                handler: async function (response) {
                    try {
                        const verifyResponse = await axios.post(
                            `${import.meta.env.VITE_BASE_URL}/pay/verify-payment`,
                            {
                                order_id: id,
                                payment_id: response.razorpay_payment_id,
                                signature: response.razorpay_signature,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                },
                            }
                        );

                        if (verifyResponse.data.success) {
                            socket.emit("payment-success", { rideId: ride._id });
                        } else {
                            alert("Payment verification failed!");
                        }
                    } catch (error) {
                        console.error("Payment Verification Error:", error);
                        alert("Error verifying payment.");
                    }
                },
                prefill: {
                    name: "Test User",
                    email: "test@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#4CAF50", // Changed to green
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Order Creation Error:", error);
            alert("Failed to create payment order.");
        }
    }

    socket.on("ride-ended", () => {
        navigate('/home');
    });

    return (
        <div className='h-screen bg-gray-100'>
            <Link
                to="/home"
                className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-lg'>
                <i className='text-lg font-medium ri-home-5-line'></i>
            </Link>

            {/* First Half of the screen */}
            <div className='h-1/2'>
                <LiveTracking />
            </div>

            {/* Second half of the screen */}
            <div className='h-1/2 p-6 bg-white rounded-t-3xl shadow-lg'>
                <div className='flex items-center justify-between mb-4'>
                    <img className="h-14 rounded-full border-2 border-gray-300" src={`/images/car.png`} alt="Vehicle"/>
                    <div className='text-right'>
                        <h2 className='text-lg font-semibold capitalize text-gray-800'>{`${ride?.captain.fullname.firstname} ${ride?.captain.fullname.lastname}`}</h2>
                        <img className="h-12 rounded-full object-cover w-12" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35af6a41332353.57a1ce913e889.jpg" alt="" />
                        <p className='text-sm text-gray-500'>⭐ {ride?.captain.rating || '4.5'} (500+ rides)</p>
                    </div>
                </div>
                
                <div className="flex flex-col gap-3">
                    <button onClick={generateOrder} className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg shadow-md">
                        <i className="ri-wallet-line"></i> Pay Now
                    </button>
                </div>

                <h4 className="w-full mt-5 bg-gradient-to-r text-black font-bold text-center py-2">
                    Enjoy your ride!
                </h4>
            </div>
        </div>
    );
}

export default Riding;
