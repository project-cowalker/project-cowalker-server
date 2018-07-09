const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const upload = require('../../../config/multer');

var multiUpload = upload.fields([{
    name: 'profile_img'
}, {
    name: 'background_img'
}]);

router.put('/photo', multiUpload, async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);

    let updateProfile = 'update USER set ? where user_idx = ?';
    const QUERY = 'SELECT * FROM USER WHERE user_idx = ?';

    let data = {
        profile_url: "",
        background_url: ""
    };

    let user = await db.execute2(QUERY, ID);

    data.profile_url = (req.files.profile_img != undefined) ? req.files.profile_img[0].location : user[0].profile_url;
    data.background_url = (req.files.background_img != undefined) ? req.files.background_img[0].location : user[0].background_url;

    if (ID != -1) {
        
        let result = await db.execute3(updateProfile, data, ID);
        if (result) {
            res.status(200).send({
                message: 'update success'
            });
        } else {
            res.status(405).send({
                message: 'fail'
            });
        }
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }

});

module.exports = router;