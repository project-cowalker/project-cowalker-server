const express = require('express');
const router = express.Router();

//signup
const apply = require('./apply');
router.use('/apply', apply);

module.exports = router;
