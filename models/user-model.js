require('dotenv').config();
const mongoose = require('mongoose');
const {Schema} = mongoose;
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new Schema({
    username: {
    type: String,
    },

    password: {
    type: String,
    },

    transactions: [{
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
    }],
  }, { collection: 'users' });

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema, 'users');

passport.use(User.createStrategy());

/* passport.use(new GoogleStrategy({
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
 */
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