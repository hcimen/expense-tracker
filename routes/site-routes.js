const siteCtrl = require('../controllers/site-controller')
const express = require('express');
const router = express.Router();

router.route('/')
    .get(siteCtrl.index)



    module.exports = router;