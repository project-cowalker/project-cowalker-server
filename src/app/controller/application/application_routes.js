const express = require('express');
const router = express.Router();

//signup
const application = require('./application');
router.use('/application', application);

module.exports = router;
