const express = require('express');
const router = express.Router();

// putShare
const postShare=require('./postShare');
router.use('/share', postShare);

/*// deleteRecruit
const deleteRecruit=require('./deleteRecruit');
router.use('/project', putShare);*/


module.exports = router;
