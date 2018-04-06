// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our Schema
var UserSchema = new mongoose.Schema({
    username:{ type: String, unique: true, required: true },
    password:{ type: String, required: true },
    status:{ type: Number},
    userType: {type: String, required: true },
    email: { type: String, required: true , lowercase: true, trim: true },
    isActive:{ type: Boolean, default: true },
    name:{ type: String, required: true, trim: true },
    lastName:{ type: String, required: true, trim: true},
    secondLastName: { type: String, required: true, trim: true},
    telephone: { type: String},
    birthDate: { type: Date, required: true},
    rfc: { type: String, required: true },
    pswState: { type: Number, default: false },
    gender: { type: String, required: true },
    //adding obliged schema
    adscription:[ {type: String, required: true } ],
    birthCountry: { type: String, required: true},
    birthState: { type: String, required: true},
    birthCity: { type: String, required: true },
    nacionality: { type: String, required: true },
    civilStatus: { type: String, required: true },
    address: { type: String, required: true },
    extNum: { type: String, required: true },
    intNum: { type: String, required: true },
    cp: { type: Number, required: true },
    suburb: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    //end of obliged schema
    createdAt: {type: Date, default: Date.now},
    modifiedAt: {type: Date, default: Date.now},
    creatorId: { type: String },
    modifierId:{ type: String }
});

UserSchema.pre('save', function (callback) {
    var user = this;

    //Break out if the password hasn't changed
    if(!user.isModified('password')) return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function (err, salt) {
        if(err) return callback(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if(err) return callback(err);
            user.password = hash;
            callback();
        });
    });
});


UserSchema.methods.verifyPassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};



// Export the mongoose model
module.exports = mongoose.model('User', UserSchema);