/* eslint-disable react/prop-types */

const RidePopUp = (props) => {

  const {ride,setRidePopUpPannel, setConfirmRidePopUpPannel} = props;

  return (
    <div>
      <h5
        onClick={() => {
            setRidePopUpPannel(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="text-3xl ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">New Ride available</h3>

      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
            <img className="h-12 rounded-full object-cover w-12" src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww" alt="" />
            <h2 className="text-lg font-medium">{`${ride?.user.fullname.firstname} ${ride?.user.fullname.lastname}`}</h2>
        </div>
        <h2 className="text-lg font-semibold"></h2>
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
                    <h3 className="text-lg font-medium">Rs-{ride?.fare}</h3>
                </div>
            </div>
        </div>
        <button onClick={()=>{
          props.confirmRide()
        }} className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">Accept</button>

        <button onClick={()=>{
          setRidePopUpPannel(false);
        }} className="w-full mt-1 bg-gray-300 text-gray-700 font-semibold p-2 rounded-lg">Ignore</button>
      </div>
    </div>
  )
}

export default RidePopUp
