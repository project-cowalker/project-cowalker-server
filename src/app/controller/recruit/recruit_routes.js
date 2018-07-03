const express = require('express');
const router = express.Router();

//create.js
const create = require('./create');
router.use('/create', create);

module.exports = router;
