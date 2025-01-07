const rideService = require('../services/ride.service')
const mapsService = require('../services/maps.service');
const rideModel = require('../models/ride.model');
const {validationResult} = require('express-validator');
const {sendMessageToSocketId} = require('../socket');

module.exports.createRide = async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {pickup, destination, vehicleType} = req.body;

    try{
        const ride = await rideService.createRide({user: req.user._id, pickup,destination,vehicleType})
        res.status(200).json({ride});

        const pickupCoordinates = await mapsService.getAddressCoordinate(pickup);

        const captainInRadius = await mapsService.getcaptainsInRadius(pickupCoordinates.ltd,pickupCoordinates.lng,100);

        ride.otp =""

        const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user');
        
        captainInRadius.map(captain=>{
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data : rideWithUser
            })
        })
    } catch(err){
        console.log(err);
    }


}

module.exports.getFare = async(req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {pickup, destination} = req.query;

    try{
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch(err){
        console.log(err);
    }
}

module.exports.confirmRide = async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {rideId} = req.body;

    try{
        const ride = await rideService.confirmRide({rideId, captain: req.captain});
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });
        res.status(200).json(ride); 
    } catch (err){
        return res.status(500).json({message: err.message});
    }
}

module.exports.startRide = async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {rideId, otp} = req.query;

    try{
        const ride = await rideService.startRide({rideId, otp, captain: req.captain});

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })
        res.status(200).json(ride);
    } catch (err){
        return res.status(500).json({message: err.message});
    }
}

module.exports.endRide = async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const {rideId} = req.body;

    try{
        const ride = await rideService.endRide({rideId, captain: req.captain});
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })
        res.status(200).json(ride);
    } catch(err){
        return res.status(500).json({message: err.message});
    }
}