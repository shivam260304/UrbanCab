import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const CaptainLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("captainToken"); // Retrieve the captain token

        axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('captainToken'); // Remove captain-specific token
                navigate('/captain-login'); // Redirect to captain login page
            }
        }).catch((error) => {
            console.error("Logout failed:", error);
        });
    }, [navigate]); // Only include navigate in the dependency array

    return (
        <div>Logging out...</div>
    );
};

export default CaptainLogout;
