const siteCtrl = require('../controllers/site-controller')
const express = require('express');
const router = express.Router();

router.route('/')
    .get(siteCtrl.index)

router.route('/auth/google')
    .get(siteCtrl.google_get)

router.route('/auth/google/overall')
    .get(siteCtrl.google_redirect_get)

router.route('/aboutme')
    .get(siteCtrl.aboutme)

router.route('/contact')
    .get(siteCtrl.contact)
    .post(siteCtrl.contactMessage)

    module.exports = router;