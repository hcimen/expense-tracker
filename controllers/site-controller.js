const { response } = require('express');
const { User, Transaction } = require('../models/user-model');
const passport = require('passport');
const express = require('express');

module.exports = {
    index: (req, res) => {
              res.render('pages/index')
    },

    
}
