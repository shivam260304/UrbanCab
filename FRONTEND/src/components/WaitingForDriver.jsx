/* eslint-disable react/prop-types */
import React from 'react'

const WaitingForDriver = (props) => {
    const {setWaitingForDriver} = props;
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
            <h2 className='text-lg font-medium'>Shivam</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>GJ-01 AB 1234</h4>
            <p className='text-sm text-gray-600'>Tata Nano</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-between items-center">
        
        <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
                <i className="ri-map-pin-user-fill"></i>
                <div>
                    <h3 className="text-lg font-medium">562/11-A</h3>
                    <p className="text-sm -mt-1 text-gray-600">Kanakriya Lake Ahmedabad</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b-2">
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className="text-lg font-medium">562/11-A</h3>
                    <p className="text-sm -mt-1 text-gray-600">Kanakriya Lake Ahmedabad</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-3">
                <i className="text-lg ri-currency-line"></i>
                <div>
                    <h3 className="text-lg font-medium">Rs 193</h3>
                    <p className="text-sm -mt-1 text-gray-600">cash Cash</p>
                </div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default WaitingForDriver
