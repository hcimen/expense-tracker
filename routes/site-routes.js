const siteCtrl = require('../controllers/site-controller')
const express = require('express');
const router = express.Router();

router.route('/')
    .get(siteCtrl.index)

router.route('/addTransaction')
    .get(siteCtrl.addTransaction)



    module.exports = router;