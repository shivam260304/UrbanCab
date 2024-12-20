const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname :{
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
    email : {
        type :String,
        required : true,
        unique : true,
        minlength :[5,'Email must be atleast 5 characters']
    },
    password :{
        type : String,
        required : true,
        select: false
    },
    socketId :{
        type : String
    }
})

// The function below is not involved in any asynchronous operations like I/O, database queries, or network requests.
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn : '24h'});
    return token;
}

// The function below is involved in some kind of 
// asynchronous operations like I/O, database queries, or network requests.
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

// The function below is involved in some kind of 
// asynchronous operations like I/O, database queries, or network requests.
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;