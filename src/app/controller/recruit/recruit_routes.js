const express = require('express');
const router = express.Router();


// postRecruit 
const postRecruit = require('./postRecruit');
router.use('/project/recruit', postRecruit);

// getRecruit
const getRecruit=require('./getRecruit');
router.use('/project',getRecruit);


// putRecruit
const putRecruit=require('./putRecruit');
router.use('/project',putRecruit);

// deleteRecruit
const deleteRecruit=require('./deleteRecruit');
router.use('/project',deleteRecruit);


module.exports = router;
