const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListModel = require('../models/blacklist.token');

module.exports.authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({error: 'Unauthorized1'});
    }                            

    // For LogOut puposes --> 
    const isBlacklisted = await blackListModel.findOne({token: token});
    if(isBlacklisted){
        return res.status(401).json({error: 'Unauthorized2'});
    }

    // For accessing user related routes
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    } catch(err){
        return res.status(401).json({error: 'Unauthorized3'});
    }
}

module.exports.authCaptain = async (req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({error: 'Unauthorized'});
    }

    const isBlacklisted = await blackListModel.findOne({token:token});
    if(isBlacklisted){
        return res.status(401).json({error: 'Unauthorized'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        return next();
    }catch(err){
        return res.status(400).json({error: 'Unauthorized'});
    }
}