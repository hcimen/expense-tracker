const adminCtrl = require('../controllers/admin-controller')
const express = require('express');
const router = express.Router();

router.route('/')
    .get(adminCtrl.admin)

module.exports = router; 