/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const UserProtectWrapper = ({ children }) => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const {user,setUser} = useContext(UserDataContext)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    if (!token) {
    navigate("/user-login");
  }

  axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then((response)=>{
    if(response.status === 200){
      setUser(response.data.user);
      setIsLoading(false);
    }
  }).catch((err)=>{
    console.log(err);
    localStorage.removeItem('token');
    navigate("/user-login");
  })
  },[token])

  return (
    <>
      {children}
    </>);
};

export default UserProtectWrapper;
