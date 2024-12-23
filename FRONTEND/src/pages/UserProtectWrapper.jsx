/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

// eslint-disable-next-line react/prop-types
const UserProtectWrapper = ({ children }) => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // console.log(token);

  useEffect(()=>{
    if (!token) {
    navigate("/user-login");
  }
  },[token])

  return (
    <>
      {children}
    </>);
};

export default UserProtectWrapper;
