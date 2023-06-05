const { response } = require('express');
const Transaction = require('../models/transaction-model');
const passport = require('passport');
const express = require('express');

module.exports = {
    index: (req, res) => {
              res.render('pages/index')
    },

    addTransaction : (req, res) => {
        res.render('pages/addTransaction')
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
                
    }})},
       
}
