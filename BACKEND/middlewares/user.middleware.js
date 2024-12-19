const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blackListModel = require('../models/blacklist.token');

module.exports.authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({error: 'Unauthorized'});
    }

    // For LogOut puposes --> 
    const isBlacklisted = await blackListModel.findOne({token: token});
    if(isBlacklisted){
        return res.status(401).json({error: 'Token is blacklisted'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    } catch(err){
        return res.status(400).json({error: 'Token is invalid'});
    }
}