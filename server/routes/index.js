const express = require('express');
const router = express.Router();

router.use('/spotify', require('./spotify'));
router.use('/custom', require('./custom'));
router.use('/stripe', require('./stripe'));

module.exports = router;
