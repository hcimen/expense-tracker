require('dotenv').config();
const mongoose = require('mongoose');
const {Schema} = mongoose;
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const transactionSchema = new Schema({
    _id: {
        type: String,
        required: false
    },

    date: {
        type: Date,
        default: Date.now,
    },

    description: {
        type: String,
    },

    amount: {
        type: Number,
    },

    type: {
        type: String,
        enum: ['expense', 'income'],
    },  

    notes: {
        type: String,
    },

    tags: {
        type: String,
    },

});

const userSchema = new mongoose.Schema({
    username: {
    type: String,
    },

    email: {
    type: String,
    },

    password: {
    type: String,
    },

    createdAt: {
    type: Date,
    default: Date.now
    },
  
    transactions: [transactionSchema]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/transactions",
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser(function(user, cb){
    process.nextTick(function(){
        cb(null, {id:user.id, username:user.username, name: user.displayName});
    });
});

passport.deserializeUser(function(user, cb){
    process.nextTick(function(){
        return cb (null, user);
    });
});

module.exports = User;