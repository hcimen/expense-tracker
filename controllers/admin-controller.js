const User = require('../models/user-model');
const Transaction = require('../models/transaction-model');
const passport = require('passport');
const {v4: uuid} = require('uuid');

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
      const { date, description, amount, transaction_type, category, account_name, labels, notes} = req.body;
      const newTransaction = new Transaction ({
        _id: uuid(),
        date:date,
        description:description,
        amount:amount,
        transaction_type : transaction_type,
        category : category,
        account_name : account_name,
        labels:labels,
        notes:notes,        
      });
      newTransaction.save();
      console.log(Transaction);
      res.redirect('/');
    } else {
      console.log(req.body);
      res.redirect('/user/register');
    }
  },

  transactions: (req, res) => {
  Transaction.find({}, (error, allTransactions) => {
      if(error){
        return error;
      } else {
      console.log(allTransactions);
      console.log(Transaction);
      res.render('pages/transactions', { 
          allTransactions : allTransactions});
      }
    }
    )
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
