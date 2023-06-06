const express = require('express');
const router = express.Router();

const siteRoutes = require('./site-routes');
const adminRoutes = require('./admin-routes');


router.use('/', siteRoutes);
router.use('/user', adminRoutes);

module.exports = router;