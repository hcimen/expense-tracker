const { User, Transaction } = require('../models/user-model');
const { ObjectId } = require('mongoose').Types;
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  admin: (req, res) => {
    res.render('pages/admin') 
  },

  overall: (req, res) => {
    res.render('pages/overall') 
  },

  addTransaction : (req, res) => {
    res.render('pages/addTransaction')
  },

  create: (req, res) => {
    if (req.isAuthenticated()) {
      const { date, description, amount, transaction_type, category, account_name, labels, notes } = req.body;
      console.log("User ID is " + req.user.id);
      const newTransaction = new Transaction({
        date,
        description,
        amount,
        transaction_type,
        category,
        account_name,
        labels,
        notes,
        user_id:req.user.id
      });
  
      newTransaction.save((err) => {
        if (err) {
          console.log(err);
          return res.redirect('/user/addTransaction');
        }
        console.log('New transaction added:', newTransaction);
      return res.redirect('/user/transactions');
    });
  } else {
    res.redirect('/user/register');
  }
  },
    
  transactions: (req, res) => {
    if (req.isAuthenticated()) {
    const userId = req.user.id;
    console.log(userId);  
    Transaction.find({ user_id: ObjectId(userId)}, (error, userTransactions) => {
      if (error) {
        return error;
      } else {
        res.render('pages/transactions', {
          allTransactions: userTransactions
        });
      }
    });
  } else {
    res.redirect('/user/register');
  }
  },

  authorization: (req, res) => {
    res.render('pages/register')
  },

  login:(req, res) => {
    const {username, password} = req.body;
    const user = new User({
        username: username, 
        password: password,
    });
    req.login(user, (error) => {
        console.log(res);
        if(error) {
            res.redirect('/user/register')
        } else {
            passport.authenticate('local')(req, res, () => {
                console.log("logged in user:" + user);
                res.redirect('/user/overall');
            });
        }
        })
  },
  
  register: (req, res) => { 
    const {username, password} = req.body;
    console.log(req.body);
    User.register(
        {username: username},
        password, 
        (error, user) => {
        if(error) {
          console.log(error);
          res.redirect('/user/register');
        } else {
            passport.authenticate('local')(req, res, () => {
                console.log("registered user:" + user);
                res.redirect('/user/overall');
                console.log(req);
            })
        }
        })
  },

  logout: (req, res) => {
    req.logout(function(error) {
      if(error) {
        console.log(error);
      }
    });
    res.redirect('/user/register')
},
 
}
