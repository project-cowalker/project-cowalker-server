const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const hash = require('../../module/hash.js');
let project = require('../../model/schema/project');
let apply = require('../../model/schema/apply');

//프로젝트 id값으로 검색하기
router.get('/:project_id', function(req, res){

	const ID = jwt.verify(req.headers.authorization);

	// 프로젝트 아이디와 유저 아이디 비교 => 같으면 개설자임을 보내주기
	// 다르면, 프로젝트 참여자와 지원자로 나뉜다.

	// 프로젝트 id로 team의 member_idx 확인(mysql) => select문
	// 유저 id가 member_idx로 존재하면 => 참여완료
	// 존재하지 않으면 => 참여대기

	// 로그인하지않은 상태 -> 참여대기로 보내주기

    const QUERY = 'select * from USER where user_idx = ?';
    var data = new Array();
    var user_status = "null";


	if(ID!=-1){
		project.find({
			_id : req.params.project_id
		}, async function(err, result){
			if(err){
				return res.status(500).send({
					message : "get project fail"
				});
			} else{
				//let project_user_id = result[0].user_idx;
				//console.log(result);
				for(let i=0;i<result.length;i++){
					let project_user_id = result[0].user_idx;
					let select_project = await db.execute2(QUERY, ID);

					var temp = {
				        title : "",
				        summary : "",
				        area : "",
				        department : "",
				        aim : "",
				        explain : "",
				        create_at : "",
				        img_url : []
				    }

					temp.title = result[i].title;
					temp.summary = result[i].summary;
					temp.area = result[i].area;
					temp.department = result[i].department;
					temp.aim = result[i].aim;
					temp.explain = result[i].explain;
					temp.create_at = result[i].create_at;
					temp.img_url = result[i].img_url;
					data.push(temp);

					// 개설자 
					if (ID == project_user_id){
						user_status = "개설자";
					}
					
					
				}

				
				
			}
			res.status(201).send({
				message : "success",
				result : data,
				user :user_status
			});
			return;

		});
	

	}else{
		res.status(401).send({
            message: "access denied"
        });
	}
});


module.exports = router;