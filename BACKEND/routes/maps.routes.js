const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../Controllers/map.controller')
const {query} = require('express-validator')

router.use(authMiddleware.authUser);

router.get('/get-coordinates',
    query("address").isString(),
    authMiddleware.authUser,
    mapController.getCoordinates
);

router.get('/get-distance-time',
    query("origin").isString(),
    query("destination").isString(),
    authMiddleware.authUser,
    mapController.getDistanceAndTime
)

router.get('/get-suggestions',
    query("input").isString(),
    authMiddleware.authUser,
    mapController.getSuggestions
)


module.exports = router;