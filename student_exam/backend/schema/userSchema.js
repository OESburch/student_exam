var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userType: {type: String},
    userName: {type: String},
    userPassword: {type: String},

    userDone:{ type: Boolean, default:false}
});



const User = module.exports = mongoose.model('User', UserSchema);