const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const upload = require('../../../config/multer');
const apply = require('../../model/schema/apply');

router.post('/', upload.array('portfolio'), async (req, res) => {
    const ID = jwt.verify(req.headers.authorization);
    
    if(ID != -1){
        apply.create({
            introduce : req.body.introduce,
            portfolio_url : req.body.files,
            recruit_idx : req.body.recruit_idx,
            applicant_idx : req.body.applicant_idx,
            join : req.body.join
        },
        function(err, docs){
            if(err) return res.status(405).send("실패");
            res.status(200).send(docs);
        })

        return;
    }
    res.status(401).send({
        message: "access denied"
    });
});

router.get('/', async(req, res) => {
    apply.find(function(err, applies){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(applies);
    })
});

module.exports = router;
