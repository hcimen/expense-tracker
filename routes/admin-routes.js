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

router.route('/editTransaction/:_id')
    .get(adminCtrl.editTransaction)

router.route('/update/:_id')
    .get(adminCtrl.update)
    .put(adminCtrl.update)

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