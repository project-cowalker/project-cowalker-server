const express = require('express');
const router = express.Router();
const upload = require('../../../config/multer');
let myIntro = require('../../model/schema/myIntro');

var multiUpload = upload.fields([{ name: 'img' }]);

router.put('/:intro_id', multiUpload, async (req, res, next) => {

    let tempArray = [];
    if (req.files.img) {
        for (let i = 0; i < req.files.img.length; i++) {
            tempArray.push(req.files.img[i].location);
        }
    }

    myIntro.update(
        { _id: req.params.intro_id },
        {
            intro_contents: req.body.contents,
            intro_img_url: tempArray
        }, function (err, result) {
            if (err) {
                return res.status(405).send({
                    message: 'update myIntro fail'
                });
            } else {
                console.log(result);
                if (!result.n) return res.status(404).json({ error: 'intro not found' });
                return res.status(201).send({
                    message: 'update myIntro success'
                });
            }
        });

});

module.exports = router;