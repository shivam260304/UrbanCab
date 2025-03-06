import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import { CaptainDataContext } from "../context/CaptainContext";
import axios from 'axios';

const CaptainSignup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const navigate = useNavigate();

    const { captain, setCaptain } = useContext(CaptainDataContext);

    const submithandler = async(e) => {
        e.preventDefault();
        const newCaptain = {
            fullname: {
                firstname,
                lastname
            },
            email,
            password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);
        
        if (response.status === 201) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-login');
        }

        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
    }

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="h-8 mb-10" src={`/images/logon.png`} alt="Cab" />
                <form onSubmit={submithandler}>

                    <h3 className="text-base font-medium mb-2">Enter your name?</h3>
                    <div className="flex gap-4">
                        <input
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            className="bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border text-lg placeholder:text-base"
                            required
                            type="text"
                            placeholder="First name"
                        />
                        <input
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className="bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border text-lg placeholder:text-base"
                            required
                            type="text"
                            placeholder="Last name"
                        />
                    </div>

                    <h3 className="text-base font-medium mb-2">Enter your email?</h3>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        required
                        type="email"
                        placeholder="email@example.com"
                    />

                    <h3 className="text-base font-medium mb-2">Enter Password</h3>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        required
                        type="password"
                        placeholder="password"
                    />

                    <h3 className="text-base font-medium mb-2">Enter Vehicle Details</h3>
                    <div className="flex gap-4 flex-col">
                    <input
                        value={vehicleColor}
                        onChange={(e) => setVehicleColor(e.target.value)}
                        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        required
                        type="text"
                        placeholder="Vehicle RC"
                    />
                    <input
                        value={vehiclePlate}
                        onChange={(e) => setVehiclePlate(e.target.value)}
                        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        required
                        type="text"
                        placeholder="Vehicle Plate"
                    />
                    <input
                        value={vehicleCapacity}
                        onChange={(e) => setVehicleCapacity(e.target.value)}
                        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        required
                        type="number"
                        placeholder="Driving Licence"
                    />
                    <input
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        required
                        type="text"
                        placeholder="Vehicle Type"
                    />
                    
                    </div>

                    <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
                        Create Account
                    </button>

                </form>
                <p className="text-center text-base">Already have an account?<Link to='/captain-login' className="text-blue-600 "> Login here</Link></p>
            </div>
            <div>
                <Link
                    to='/user-signup'
                    className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
                    Sign up as User
                </Link>
            </div>
        </div>
    );
};

export default CaptainSignup;
