const express = require('express');
const router = express.Router();
const {body} = require ( 'express-validator');
const userController = require('../Controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware')

router.post('/register',
    [body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').isLength({min:3}).withMessage('Min 3 characters is required'),
        body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    ],
    userController.registerUser)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    ],
    userController.loginUser
)

router.get('/profile', userMiddleware.authUser, userController.getUserProfile);

router.get('/logout', userMiddleware.authUser, userController.userLogout);

module.exports =router;