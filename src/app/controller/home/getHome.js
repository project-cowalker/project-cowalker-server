const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
let recruit = require('../../model/schema/recruit');
let project = require('../../model/schema/project');

router.get('/', async function (req, res) {
    const ID = jwt.verify(req.headers.authorization);
    var data = new Array();

    if (ID != -1) {				// case1 : 토큰값이 있는 경우 -> 로그인한 경우 

        // 목적, 분야, 지역가지고 오기 user테이블에서 
        let QUERY = 'select aim, department, area from USER where user_idx=?';
        let queryResult = await db.execute2(QUERY, ID);

        let query = {
            $or: []
        };

        let aim = queryResult[0].aim;
        let deparment = queryResult[0].department;
        let area = queryResult[0].area;

        
        // case 1-1: 모두 null값인 경우
        if((aim==undefined||aim=='')&&(deparment==undefined||deparment=='')&&(area==undefined||area=='')){
            project.find({}, async function (err, result) {
                if (err) {
                    return res.status(405).send({
                    message: "database failure"
                    });
                }

                res.status(201).send({
                message: "success",
                result: result
            });
            return;

           }).sort({ create_at: -1 }).limit(20);
        
        }else{                                          // case 1-2: 모두 null값이 아닌경우
     

          if (aim != undefined && aim != '') {					// 1. aim이 있을 경우, 

            query.$or.push({ aim: aim });
          }
         if (deparment != undefined&&deparment!='') {			// 2. department가있을 경우 
            query.$or.push({ deparment: deparment });
          }
         if (area != undefined && area!='') {					// 3. area가 있을 경우 
            query.$or.push({ area: area });
          }

    
        //1. project find
        project.find(query, async function (err, result) {
            if (err) {
                return res.status(405).send({
                    message: "database failure"
                });
            }
            res.status(201).send({
                message: "success",
                result: result
            });
            return;
        }).sort({ create_at: -1 }).limit(20);

        }

    } else {						// 토큰값이 없는 경우 -> 로그인하지 않는 경우 

        project.find({}, async function (err, result) {
            if (err) {
                return res.status(405).send({
                    message: "database failure"
                });
            }
            res.status(201).send({
                message: "success",
                result: result
            });
            return;
        }).sort({ create_at: -1 }).limit(20);

    }


});


module.exports = router;