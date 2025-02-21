/* eslint-disable react/prop-types */
import React from 'react'

const WaitingForDriver = (props) => {
    const {setWaitingForDriver, ride} = props;
  return (
    <div>

      <h5
        onClick={() => {
            setWaitingForDriver(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="text-3xl ri-arrow-down-wide-line"></i>
      </h5>

      <div className='flex items-center justify-between'>
        <img className="h-12" src={`/images/car.png`} alt=""/>
        <div className='text-right'>
            <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
            <h2 className='text-lg font-semibold'>{ride?.otp}</h2>
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-between items-center">
        
        <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
                <i className="ri-map-pin-user-fill"></i>
                <div>
                    <h3 className="text-lg font-medium">Pickup Location</h3>
                    <p className="text-sm -mt-1 text-gray-600">{ride?.pickup}</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b-2">
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className="text-lg font-medium">Destination Location</h3>
                    <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-3">
                <i className="text-lg ri-currency-line"></i>
                <div>
                    <h3 className="text-lg font-medium">{ride?.fare}</h3>
                </div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default WaitingForDriver
