const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const myIntro = require('../../model/schema/myIntro');
const upload = require('../../../config/multer');

var multiUpload = upload.fields([{ name: 'img' }]);

router.post('/', multiUpload, async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);

    let tempArray = [];
    if (req.files.img) {
        for (let i = 0; i < req.files.img.length; i++) {
            tempArray.push(req.files.img[i].location);
        }
    }

    let result;

    if (ID != -1) {
        try {
            result = await myIntro.create({
                user_idx: ID,
                intro_contents: req.body.contents,
                intro_img_url: tempArray
            });
        } catch (err) {
            return res.status(405).send({
                message: 'save myIntro fail'
            });
        }

    } else {
        return res.status(401).send({
            message: "access denied"
        });
    }

});

module.exports = router;
