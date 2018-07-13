const recruit = require('../model/schema/recruit');

module.exports = {

	dday : async(...args) => {
        const end_date = args[0];

		let now = new Date();

	  	let gap = end_date.getTime()-now.getTime();
      	let calculateDday = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;

     	// 양수면 앞에 +를 붙여야해 
      	if(calculateDday>0){
        	calculateDday='+'+calculateDday;
      	}else if(calculateDday==0){
          calculateDday='-'+calculateDday;
        }

      	return calculateDday;
	},

	dtime : async(...args) => {
		const end_date = args[0];
		let now = new Date();
		let gap = end_date.getTime() - now.getTime();
		now.get
	}

};