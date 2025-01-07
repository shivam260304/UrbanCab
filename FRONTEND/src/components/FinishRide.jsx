/* eslint-disable react/prop-types */
import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
  const navigate = useNavigate();

    const {ride, setFinishRidePannel} = props;

    async function endRide(){
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
        rideId : ride._id,
      },{
        headers :{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if(response.status === 200){
        navigate('/captain-home')
      }
    }

  return (
    <div className='h-screen'>
      <h5
        onClick={() => {
            setFinishRidePannel(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="text-3xl ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Finish this ride</h3>

      <div className="flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
            <img className="h-12 rounded-full object-cover w-12" src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww" alt="" />
            <h2 className="text-lg font-medium">{`${ride?.user.fullname.firstname} + ${ride?.user.fullname.lastname}`}</h2>
        </div>
        <h2 className="text-lg font-semibold">2.2 kms</h2>
      </div>

      <div className="flex flex-col gap-2 justify-between items-center">
        <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
                <i className="ri-map-pin-user-fill"></i>
                <div>
                    <h3 className="text-lg font-medium">562/11-A</h3>
                    <p className="text-sm -mt-1 text-gray-600">{ride?.pickup}</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b-2">
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className="text-lg font-medium">562/11-A</h3>
                    <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-3">
                <i className="text-lg ri-currency-line"></i>
                <div>
                    <h3 className="text-lg font-medium">{ride?.fare}</h3>
                    <p className="text-sm -mt-1 text-gray-600">cash Cash</p>
                </div>
            </div>
            <div className='ml-2'>
                <p className='text-sm'>Dear Captain, please drive safely, follow traffic rules, and ensure a courteous, comfortable journey for all.</p>
            </div>
        </div>

        <div className='mt-6 w-full'>
            <button onClick={endRide} className="w-full flex justify-center mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
                Finish Ride
             </button>
        </div>


      </div>
    </div>
  )
}

export default FinishRide
