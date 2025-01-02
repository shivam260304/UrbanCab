const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname : {
            type : String,
            required : true,
            minlength :[3, 'First name must me atleast three characters']
        },
        lastname : {
            type : String,
            minlength :[3, 'Last name must me atleast three characters']
        }
    },
    email:{
        type : String,
        required : true,
        unique : true,
        lowecase: true,
        minlength :[5,'Email must be atleast 5 characters'],
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password:{
        type : String,
        required : true,
        select :false
    },
    socketId:{
        type : String,
    },

    status:{
        type : String,
        enum : ['active', 'inactive'],
        default : 'inactive',
    },
    vehicle:{
        color:{
            type : String,
            required : true,
        },
        plate:{
            type : String,
            required : true,
        },
        capacity:{
            type : Number,
            required : true,
            min:[1,'Capacity must be atleast 1'],
        },
        vehicleType:{
            type : String,
            required : true,
            enum : ['car', 'motorcycle', 'auto'],
        },
        location:{
            lat:{
                type : Number,
            },
            lng:{
                type : Number,
            }
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn : '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('captain',captainSchema);

module.exports = captainModel;