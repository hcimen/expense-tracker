require('dotenv').config();
const mongoose = require('mongoose');
const {Schema} = mongoose;

const transactionSchema = new Schema({
    _id: {
        type: String,
    },

    date: {
        type: Date,
    },

    description: {
        type: String,
    },

    transaction_type: {
        type: String,
        enum: ['debit', 'credit'],
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

    tags: {
        type: String,
    },

}, { collection: 'transactions' });

const Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

module.exports = Transaction;

/* userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate); */



/* passport.use(User.createStrategy());

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
}); */

