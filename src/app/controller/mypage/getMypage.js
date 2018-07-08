const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const apply = require('../../model/schema/apply');

// 나의 마이페이지 get
router.get('/', async(req, res) => {
    const ID = jwt.verify(req.headers.authorization);
    const profile = 'select * from USER where user_idx = ?';
    let data = new Array();
    
    if(ID != -1) {
        let result = await db.execute2(profile, ID);

        //console.log(result);
        
        var temp = {
          profile_url: "",//
          background_url: "",//
          name : "",//
          position: "",//
          introduce: "",//
          introduce_detail: "",
          portfolio_url: "",//
          aim : "",
          department : "",
          area  : ""
        }

        temp.profile_url = result[0].profile_url,
        temp.background_url = result[0].background_url,
        temp.name = result[0].name,
        temp.position = result[0].position,
        temp.introduce = result[0].introduce,
        temp.introduce_detail = result[0].introduce_detail,
        temp.portfolio_url = result[0].portfolio_url,
        temp.aim = result[0].aim,
        temp.department = result[0].department,
        temp.area = result[0].area
        data.push(temp);

        if(data){
          res.status(200).send({
            message : "success",
            data : data
        });

        }else{
          res.status(405).send({
            error : "Get data fail"
        });

        }


    }else {
        res.status(401).send({
            message : "access denied"
        });
    }
});



// 다른 사람 
router.get('/:user_idx', async(req, res) => {
	
	const ID = jwt.verify(req.headers.authorization);
	
	let user_idx=req.params.user_idx;
  let data = new Array();

  const profile = 'select * from USER where user_idx = ?';
  let user_status = "null";
   
    if(user_idx) {
      let result = await db.execute2(profile, user_idx);

      var temp = {
          profile_url: "",//
          background_url: "",//
          name : "",//
          position: "",//
          introduce: "",//
          introduce_detail: "",
          portfolio_url: "",//
          aim : "",
          department : "",
          area  : ""
        }

        temp.profile_url = result[0].profile_url,
        temp.background_url = result[0].background_url,
        temp.name = result[0].name,
        temp.position = result[0].position,
        temp.introduce = result[0].introduce,
        temp.introduce_detail = result[0].introduce_detail,
        temp.portfolio_url = result[0].portfolio_url,
        temp.aim = result[0].aim,
        temp.department = result[0].department,
        temp.area = result[0].area
        data.push(temp);

        if(data){
          //참여멤버에서 나의 페이지로 들어올 때 
          if(ID == user_idx){
            res.status(200).send({
              message : "success",
              data : data,
              user_status : "나의 페이지"
          });

          // 참여멤버에서 타인 페이지 들어갈 때 
          }else{
            res.status(200).send({
              message : "success",
              data : data,
              user_status : "타인의 페이지"
            });

          }

        }else {
          res.status(405).send({
            error : "Get data fail"
        });

        }

    	
    }else {
    	res.status(401).send({
            message: "access denied"
        });
    }
});


module.exports = router;