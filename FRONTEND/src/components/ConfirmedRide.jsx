/* eslint-disable react/prop-types */
const ConfirmedRide = (props) => {
    const {setConfirmedRidePannelOpen, setVehicleFound, createRide, pickup, destination, fare, vehicleType} = props;
  return (
    <div>
      <h5
        onClick={() => {
            setConfirmedRidePannelOpen(false);
  
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="text-3xl ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Confirm your ride</h3>

      <div className="flex flex-col gap-2 justify-between items-center">
        <img className="h-20" src={`/images/${vehicleType}.png`} alt=""/>
        <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
                <i className="ri-map-pin-user-fill"></i>
                <div>
                    <h3 className="text-lg font-medium">Pickup Location</h3>
                    <p className="text-sm -mt-1 text-gray-600">{pickup}</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b-2">
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className="text-lg font-medium">Destination Location</h3>
                    <p className="text-sm -mt-1 text-gray-600">{destination}</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-3">
                <i className="text-lg ri-currency-line"></i>
                <div>
                    <h3 className="text-lg font-medium">Rs-{fare[vehicleType]}</h3>
                </div>
            </div>
        </div>
        <button onClick={()=>{
          setVehicleFound(true);
          setConfirmedRidePannelOpen(false);
          createRide();
        }} className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">Confirm</button>
      </div>

    </div>
  )
}

export default ConfirmedRide
