/* eslint-disable react/prop-types */

const LocationSearchPanel = ({ 
  suggestions, 
  setVehiclePanel, 
  setPanelOpen, 
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
    // setVehiclePanel(true);
    // setPanelOpen(false);
  };

  return (
    <div>
      {safeSuggestions.map((suggestion, index) => (
        <div
          key={index} // React requires a unique key for each child
          onClick={() => handleSuggestionClick(suggestion)}
          className="flex gap-4 p-3 border-2 rounded-xl active:border-black border-gray-50 items-center my-2 justify-start"
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
