const express = require('express');
const router = express.Router();

//signup
const message = require('./message');
router.use('/message', message);

module.exports = router;
