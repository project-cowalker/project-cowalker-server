const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const apply = require('../../model/schema/apply');
const recruit = require('../../model/schema/recruit');
const pool = require('../../module/pool.js');

/**  주소 = ip:3000/api/apply/:apply_idx/:applicant_idx/join/:join
  *  기능 = 팀멤버 추가
  */
  
router.put('/:apply_idx/:applicant_idx/join/:join', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    var project_manage = false;
    
    if(ID != -1){
        apply.find({
            _id : req.params.apply_idx
        }, function(err, applies){
            recruit.find({
                _id : applies[0].recruit_idx
            }, function(err, recruits){
                if(ID == recruits[0].user_idx)
                    project_manage = true;

                if(!project_manage)
                    return res.status(400).send({
                        message: "fail (no rights)"
                    });

                apply.update({
                    _id : req.params.apply_idx,
                    applicant_idx : req.params.applicant_idx
                },{
                    join : req.params.join
                }, async function(err, applies){  
                    if(err){
                        return res.status(405).send({
                            message: "database failure"
                        });
                    }

                    await apply.find({
                        _id : req.params.apply_idx,
                        applicant_idx : req.params.applicant_idx
                    }, async function(err, appliesFind){  
                        if(err){
                            return res.status(405).send({
                                message: "database failure"
                            });
                        }
                        var project_idx = appliesFind[0].project_idx;
                        var position = appliesFind[0].position;
                        
                        const QUERY = 'INSERT INTO TEAM (project_idx, member_idx, position) VALUES (?, ?, ?)';
                        var data;

                        if(req.params.join === 1){
                            data = await pool.execute4(QUERY, project_idx, req.params.applicant_idx, position);
                        }
                        
                        if(!data && data != undefined){
                            res.status(405).send({
                                message: "database failure"
                            });
                            return;
                        }
                        res.status(201).send({
                            message: "success"
                        });
                    });
                });
            });
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});


module.exports = router;