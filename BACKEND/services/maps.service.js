const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate= async(address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const encodedAddress = encodeURIComponent(address);  // Encode address to handle special characters
    
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      
      if (response.data.status === 'OK') {
        const location = response.data.results[0].geometry.location;
        return { ltd: location.lat, lng: location.lng };
      } else {
        throw new Error('Unable to get coordinates for the given address.');
      }
    } catch (error) {
      console.log(error);
    }
}  

module.exports.getDistanceTime = async (origin,destination) =>{
    if(!origin || !destination){
        throw new Error("Both origin and destination are required")
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const encodedOrigin = encodeURIComponent(origin);
    const encodedDestination = encodeURIComponent(destination);

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigin}&destinations=${encodedDestination}&key=${apiKey}`;

    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
                throw new Error("No route found between the given origin and destination")
            }
            return response.data.rows[0].elements[0];
            // It will return a object in this form below -->
            // {
            //     distance: { text: '521 km', value: 521363 },
            //     duration: { text: '10 hours 39 mins', value: 38322 },
            //     status: 'OK'
            // }
        }
        else{
            throw new Error("Unable to get distance and time between the given origin and destination")
        }
    }
    catch (err){
        console.log(err);
    }
}

module.exports.suggestions = async (input) =>{
    if(!input){
        throw new Error("Address is required")
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const encodedInput = encodeURIComponent(input);

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedInput}&types=(cities)&language=en&key=${apiKey}`;

    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            return response.data.predictions;
        }
        else{
            throw new Error("Unable to get suggestions for the given address")
        }
    } catch(err){
        console.log(err);
    }

}

module.exports.getcaptainsInRadius = async (ltd,lng,radius) =>{
    // radius in km
    const captains = await captainModel.find({
        location: {
            $geoWithin:{
                $centerSphere: [
                    [ltd, lng],
                    radius / 6371
                ]
            }
        }
    })
    return captains;
}