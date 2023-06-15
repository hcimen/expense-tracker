const { User, Transaction } = require('../models/user-model');
const { ObjectId } = require('mongoose').Types;
const passport = require('passport');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  /* admin: (req, res) => {
    res.render('pages/admin', { isAuthenticated: req.isAuthenticated() }) 
  }, */

  overall: (req, res) => {
    res.render('pages/overall') 
  },

  addTransaction : (req, res) => {
   
    res.render('pages/addTransaction');
   
  },

  create: (req, res) => {
      const { date, description, amount, transaction_type, category, account_name, labels, notes } = req.body;
      console.log("User ID is " + req.user.id);
      const formattedDate = moment(date, 'YYYY-MM-DD').format('MM-DD-YYYY');
      console.log(formattedDate);
      const newTransaction = new Transaction({
        date:formattedDate,
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
  },
    
  transactions: (req, res) => {
      
    Transaction.find({}, (error, userTransactions) => {
        if (error) {
          console.log(error);
        } else {
          res.render('pages/transactions', {
            allTransactions: userTransactions,
          });
        }
      });
  },

  editTransaction: (req, res) => {
    const { _id } = req.params;
    Transaction.findById(_id)
      .then(foundTransaction => {
        console.log(foundTransaction);
        const dateFromMongoDB = moment(foundTransaction.date);
        const formattedDate = dateFromMongoDB.format('YYYY-MM-DD');
        console.log(formattedDate);
        res.render('pages/editTransactions', {
          transaction: foundTransaction,
          formattedDate: formattedDate,
          });
        })
        .catch(error => {
          console.log(error);
        });
  },

  update: (req, res) => {
    const { _id } = req.params;
    const { id, date, description, amount, transaction_type, category, account_name, notes } = req.body;
    Transaction.findByIdAndUpdate(_id, { 
      id:id, 
      date:date,
      description:description, 
      amount:amount, 
      transaction_type:transaction_type, 
      category:category, 
      account_name:account_name, 
      notes:notes })
      .then(foundTransaction => {
        console.log(foundTransaction);
        const dateFromMongoDB = moment(foundTransaction.date);
        const formattedDate = dateFromMongoDB.format('YYYY-MM-DD');
        console.log(formattedDate);
        res.redirect('/user/transactions');
        })
        .catch(error => {
          console.log(error);
        });
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
