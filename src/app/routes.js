// 각종 라우팅을 연결하는 코드
const express = require('express');
const router = express.Router();

const user = require('./controller/user/user_routes');
router.use('/', user);

const recruit = require('./controller/recruit/recruit_routes.js');
router.use('/recruit', recruit);


module.exports = router;
