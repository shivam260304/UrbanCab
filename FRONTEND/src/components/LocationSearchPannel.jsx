/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const LocationSearchPanel = ({ 
  suggestions,
  setPickup, 
  setDestination, 
  activeField 
}) => {
  // Ensure suggestions is always an array
  const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion.description);
    } else if (activeField === 'destination') {
      setDestination(suggestion.description);
    }
  };

  return (
    <div>
      {/* <Link
            to="/user/logout"
            className='fixed left-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link> */}
      {safeSuggestions.map((suggestion, index) => (
        <div
          key={index} // React requires a unique key for each child
          onClick={() => handleSuggestionClick(suggestion)} //clicking on the provided suggestion.
          className="flex mt-3 gap-4 p-3 border-2 rounded-xl active:border-black border-gray-50 items-center my-2 justify-start"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{suggestion.description}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
