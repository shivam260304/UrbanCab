/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const CaptainProtectWrapper = ({ children }) => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const{captain, setCaptain} = useContext(CaptainDataContext)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
        navigate('/captain-login')
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        if (response.status === 200) {
            setCaptain(response.data.captain)
            setIsLoading(false)
        }
    })
        .catch(err => {

            localStorage.removeItem('token')
            navigate('/captain-login')
        })
}, [ token ])

  if(isLoading) {
    return (<div>Loading...</div>)
  }

  return (
    <>
      {children}
    </>);
};

export default CaptainProtectWrapper;
