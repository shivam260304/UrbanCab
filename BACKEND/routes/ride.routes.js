const express = require('express');
const router = express.Router();
const {body, query} = require('express-validator')
const rideController = require ('../Controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
    body("pickup").isString().isLength({min:3}).withMessage("Invalid pickup address"),
    body("destination").isString().isLength({min:3}).withMessage("Invalid destination address"),
    body("vehicleType").isString().isIn(['auto', 'car', 'motorcycle']).withMessage("Invalid vehicle type"),
    authMiddleware.authUser,
    rideController.createRide
    // controller need to be created tomorrow
)

router.get('/get-fare',
    query("pickup").isString().withMessage("Invalid Pickup address"),
    query("destination").isString().withMessage("Invalid Destination address"),
    authMiddleware.authUser,
    rideController.getFare
)

router.post('/confirm',
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    authMiddleware.authCaptain,
    rideController.confirmRide
)

router.get('/start-ride',
    authMiddleware.authCaptain,
    query("rideId").isMongoId().withMessage('Invalid ride id'),
    query('otp').isLength({min:4, max:6}).withMessage('Invalid OTP'),
    rideController.startRide
);

router.post('/end-ride',
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    authMiddleware.authCaptain,
    rideController.endRide
);

module.exports = router;