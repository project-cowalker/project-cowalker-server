const express = require('express');
const router = express.Router();

// putShare
const postShare=require('./postShare');
router.use('/share', postShare);

module.exports = router;
