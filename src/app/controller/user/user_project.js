const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const hash = require('../../module/hash.js');
let project = require('../../model/schema/project');
let userProjectRes = require('../../model/res/userProjectRes');

router.get('/', async function (req, res) {

    const ID = jwt.verify(req.headers.authorization);
    const QUERY = 'select * from USER where user_idx = ?';

    let result;

    if (ID != -1) {

        try {
            result = await project.find({ user_idx: ID });
        } catch (err) {
            return res.status(405).send({
                message: "get project fail"
            });
        }

        return res.status(201).send({
            message: "success",
            result: userProjectRes.res(result)
        });

    } else {
        return res.status(401).send({
            message: "access denied"
        });
    }

});

router.get('/:user_idx', async function (req, res) {

    const ID = jwt.verify(req.headers.authorization);
    const QUERY = 'select * from USER where user_idx = ?';

    let result;

    try {
        result = await project.find({ user_idx: req.params.user_idx });
    } catch (err) {
        return res.status(405).send({
            message: "get project fail"
        });
    }

    return res.status(201).send({
        message: "success",
        result: userProjectRes.res(result)
    });

});

module.exports = router;