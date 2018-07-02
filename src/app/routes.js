// 각종 라우팅을 연결하는 코드
const express = require('express');
const router = express.Router();

//user
const login = require('./controller/user');
router.use('/', login);





module.exports = router;
