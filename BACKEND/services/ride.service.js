const rideModel = require ('../models/ride.model')
const mapService = require ('./maps.service');
const crypto = require('crypto');


async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("Both pickup and destination are required");
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const distance = distanceTime.distance.value; // Distance in meters
    const duration = distanceTime.duration.value; // Duration in seconds

    // The above code will return data like for exmaple below -->
    // {
    //     distance: { text: '521 km', value: 521363 },
    //     duration: { text: '10 hours 39 mins', value: 38322 },
    //     status: 'OK'
    // }

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRte = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };

    const fare = {
        auto: Math.round(baseFare.auto + (distance / 1000 * perKmRte.auto) + (duration / 60 * perMinuteRate.auto)),
        car: Math.round(baseFare.car + (distance / 1000 * perKmRte.car) + (duration / 60 * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + (distance / 1000 * perKmRte.motorcycle) + (duration / 60 * perMinuteRate.motorcycle))
    };

    return fare;
}

module.exports.getFare = getFare; 

function getOTP(num){
    // crypto.randomINT(min,max) below -->10^5 to 10^6, which resulst in a random 6 digit number
    const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
    return otp;
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) =>{

    if(!user || !pickup || !destination || !vehicleType){
        throw new Error("All fields are required");
    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp : getOTP(6)
    });

    return ride;
}

module.exports.confirmRide = async({rideId, captain}) =>{
    if(!rideId){
        throw new Error("Ride id is required");
    }

    await rideModel.findOneAndUpdate({_id:rideId},{
        status: 'accepted',
        captain: captain._id
    });

    const ride = await rideModel.findOne({_id:rideId}).
    populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error("Ride not found");
    }
    return ride;

}

module.exports.startRide = async({rideId, otp, captain}) =>{
    if(!rideId ||!otp){
        throw new Error("Ride id and OTP are required");
    }

    const ride = await rideModel.findOne({_id:rideId, otp},{
        status: 'accepted',
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error("Ride not found");
    }

    if(ride.status !== 'accepted'){
        throw new Error("Ride not accepted");
    }

    if(ride.otp !== otp){
        throw new Error("Invalid OTP");
    }

    await rideModel.findOneAndUpdate({_id:rideId},{
        status: 'ongoing'
    });

    return ride;
}