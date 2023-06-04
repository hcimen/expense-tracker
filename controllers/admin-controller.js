const User = require('../models/user-model');
const {v4: uuid} = require('uuid');

module.exports = {
  admin: (req, res) => {
          res.render('pages/admin') 
}
}
