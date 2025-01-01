const express = require('express');
const router = express.Router();
const {body} = require('express-validator')

router.get('/create',
    body("userId").isString().isLength({min:24, max:24}).withMessage("Invalid user ID"),
    body("pickup").isString().isLength({min:3}).withMessage("Invalid pickup address"),
    body("destination").isString().isLength({min:3}).withMessage("Invalid destination address"),
    // controller need to be created tomorrow
)

module.exports = router;