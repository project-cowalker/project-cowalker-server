const express = require('express');
const router = express.Router();

// postRecruit 
const search = require('./search');
router.use('/search', search);

module.exports = router;
