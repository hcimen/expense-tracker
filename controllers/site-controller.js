const { response } = require('express');
const { User, Transaction, Contact } = require('../models/user-model');
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

    aboutme: (req, res) => {
        const pdfFilePath = '/images/resume.pdf';
        res.render('pages/aboutme', { 
            isAuthenticated: req.isAuthenticated(),
            pdfFilePath: pdfFilePath
        });
    },

    contact: (req, res) => {
        res.render('pages/contact', { 
            isAuthenticated: req.isAuthenticated(),
        });
    },

    contactMessage:(req, res) => {
    const { name, email, username, message } = req.body;
    const newContact = new Contact({
        name, 
        email, 
        username, 
        message
    });
    newContact.save((err) => {
        if (err) {
          console.log(err);
          return res.redirect('/contact');
        }
        console.log('New message added:', newContact);
      return res.redirect('/');
    });    
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
