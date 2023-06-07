require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const { ObjectId } = mongoose.Types;

const userSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  googleId:{
    type:String,
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
    },
  ],
}, { collection: 'users' });

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const transactionSchema = new Schema({
  date: {
    type: Date,
  },
  description: {
    type: String,
  },
  transaction_type: {
    type: String,
  },
  amount: {
    type: String,
  },
  category: {
    type: String,
  },
  notes: {
    type: String,
  },
  account_name:{
    type: String,
  },
  labels: {
    type: String,
  },
  user_id: {
    type:ObjectId,
    ref: 'User'
  }
}, { collection: 'transactions' });

const User = mongoose.model('User', userSchema, 'users');

const Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

passport.use(User.createStrategy());

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://long-erin-slug-tie.cyclic.app/auth/google/overall",
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

module.exports = {
  User,
  Transaction,
};