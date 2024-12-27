/* eslint-disable react/prop-types */
const ConfirmedRide = (props) => {
    const {setConfirmedRidePannelOpen} = props;
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
        <img className="h-20" src={`/images/car.png`} alt=""/>
        <div className="w-full ">
            <div className="flex items-center gap-5">
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className="text-lg font-medium">562/11-A</h3>
                    <p className="text-sm -mt-1 text-gray-600">Kanakriya Lake Ahmedabad</p>
                </div>
            </div>
            <div></div>
            <div></div>
        </div>
        <button className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg">Confirm</button>
      </div>

    </div>
  )
}

export default ConfirmedRide
