/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinishRide = (props) => {
    const navigate = useNavigate();
    const { ride, setFinishRidePannel } = props;
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    async function generateOrder() {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/pay/create-order`,
                { amount: ride?.fare} // Razorpay expects amount in paisa
            );

            const { id, amount, currency } = response.data;

            if (!window.Razorpay) {
                alert("Razorpay SDK failed to load. Please try again.");
                return;
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY, // Use your test key
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
                            }
                        );

                        if (verifyResponse.data.success) {
                            setPaymentCompleted(true);
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
                    color: "#3399cc",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Order Creation Error:", error);
            alert("Failed to create payment order.");
        }
    }

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
        <div className="h-screen">
            <h5
                onClick={() => {
                    setFinishRidePannel(false);
                }}
                className="p-1 text-center w-[93%] absolute top-0"
            >
                <i className="text-3xl ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl font-semibold mb-5">Finish this ride</h3>

            <div className="flex flex-col gap-2 justify-between items-center">
                <button
                    onClick={generateOrder}
                    className="w-full flex justify-center mt-5 bg-blue-600 text-white font-semibold p-2 rounded-lg"
                >
                    Generate Payment (Test Mode)
                </button>

                <div className="mt-6 w-full">
                    <button
                        onClick={endRide}
                        className="w-full flex justify-center mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
                    >
                        Finish Ride
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FinishRide;
