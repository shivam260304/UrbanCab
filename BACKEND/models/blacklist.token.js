const mongoose = require('mongoose');

const blackListSchema = new mongoose.Schema({
    token : {
        type : String,
        required : true,
        unique : true
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 86400 // 1 hour
    }
}) 

const blackListModel = mongoose.model('blackListToken',blackListSchema);

module.exports = blackListModel;