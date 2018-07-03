// 각종 라우팅을 연결하는 코드
const express = require('express');
const router = express.Router();


const user = require('./controller/user/user_routes');
router.use('/', user);





module.exports = router;
