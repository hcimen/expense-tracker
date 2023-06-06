const { response } = require('express');
const Transaction = require('../models/transaction-model');
const passport = require('passport');
const express = require('express');

module.exports = {
    index: (req, res) => {
              res.render('pages/index')
    },

    
}
