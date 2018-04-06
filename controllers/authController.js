//Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/userModel');
var Token = require('../models/tokenModel');

passport.use(new BasicStrategy(
    function(username, password, callback) {
        User.findOne({ username: username }, function (err, user) {
            //console.log("user");
            if (err) { return callback(err); }

            // No user found with that username
            if (!user) { return callback(null, false); }

            // Make sure the password is correct
            user.verifyPassword(password, function(err, isMatch) {
                //console.log("verify");
                if (err) { return callback(err);}

                // Password did not match
                if (!isMatch) { return callback(null, false);}

                // Success
                console.log("user: "+ username + ",authenticated");
                return callback(null, user);
            });
        });
    }
));

passport.use('client-basic', new BasicStrategy(
    function(username, password, callback) {
        Client.findOne({ id: username }, function (err, client) {
            if (err) { return callback(err); }

            // No client found with that id or bad password
            if (!client || client.secret !== password) { return callback(null, false); }

            // Success
            console.log("user: "+username+",authenticated.");
            return callback(null, client);
        });
    }
));

passport.use(new BearerStrategy(
    function(accessToken, callback) {
        Token.findOne({value: accessToken }, function (err, token) {
            if (err) { return callback(err); }

            // No token found
            if (!token) { return callback(null, false); }
            //Validacion de expiracion de token
            if((((new Date(Date.now())-token.createdAt)/1000)/60)>3000){return callback(null, false); }
            else{
                token.createdAt=new Date(Date.now());
                token.save(function (err) {
                    if (err) { return callback(err); }});
            }
            User.findOne({ _id: token.userId }, function (err, user) {
                if (err) { return callback(err); }
                // No user found
                if (!user) { return callback(null, false); }
                // Simple example with no scope
                callback(null, user, { scope: '*' });
            });
        });
    }
));


exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });


