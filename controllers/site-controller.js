const { response } = require('express');
const passport = require('passport');
const express = require('express');


module.exports = {
    index: (req, res) => {
          res.render('pages/index')},

    addTransaction : (req, res) => {
        res.render('pages/addTransaction')}

}
