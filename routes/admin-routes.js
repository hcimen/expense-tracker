const adminCtrl = require('../controllers/admin-controller')
const express = require('express');
const router = express.Router();

router.route('/')
    .get(adminCtrl.admin)

router.route('/overall')
    .get(adminCtrl.overall)

router.route('/addTransaction')
    .get(adminCtrl.addTransaction)
    .post(adminCtrl.create)

router.route('/transactions')
    .get(adminCtrl.transactions)

router.route('/register')
    .get(adminCtrl.authorization)
    .post(adminCtrl.register)

router.route('/login')
    .post(adminCtrl.login)

router.route('/logout')
    .get(adminCtrl.logout)

module.exports = router; 