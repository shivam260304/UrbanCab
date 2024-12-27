const vehiclePannel = (props) => {
  const { setVehiclePannel, setConfirmedRidePannelOpen } = props;
  return (
    <div>
      <h5
        onClick={() => {
          setVehiclePannel(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="text-3xl ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Choose a vehicle</h3>

      <div
        onClick={() => {
          setConfirmedRidePannelOpen(true);
          setVehiclePannel(false);
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-12"
          src={`/images/car.png`}
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            CabGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">Rs 193</h2>
      </div>

      <div
        onClick={() => {
          setConfirmedRidePannelOpen(true);
          setVehiclePannel(false);
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-12"
          src={`/images/bike.png`}
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Moto
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, Motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">Rs 95</h2>
      </div>

      <div
        onClick={() => {
          setConfirmedRidePannelOpen(true);
          setVehiclePannel(false);
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-12"
          src={`/images/auto.png`}
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Auto
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">1 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, Auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">Rs 130</h2>
      </div>

    </div>
  );
};

export default vehiclePannel;
