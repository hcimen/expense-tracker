const { response } = require('express');
const { User, Transaction } = require('../models/user-model');
const passport = require('passport');
const express = require('express');

module.exports = {
    index: (req, res) => {
        const data = require('../dummyTransactions.json')
        if (req.isAuthenticated()) {
            res.redirect('/user/overall')
        }else{
            res.render('pages/index', { 
                isAuthenticated: req.isAuthenticated(),
                data:data })
        }
    },

    google_get: passport.authenticate('google', {scope: ['openid', 'profile', 'email']}
    ),

    google_redirect_get: [
        passport.authenticate('google', {failureRedirect: '/index'}),
        function(req, res) {
            if(req.user){
            res.redirect('/user/overall')
            } else {
            res.redirect('/index');    
            }            
        },
    ],
}
