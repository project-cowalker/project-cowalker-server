const recruit = require('../../model/schema/recruit');

var now = new Date();

module.exports = {

	dday : async(...args) => {
        const end_date = args[0];

	  	var gap = end_date.getTime()-now.getTime();
      	var calculateDday = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;

     	// 양수면 앞에 +를 붙여야해 
      	if(calculateDday>0){
        	calculateDday='+'+calculateDday;
      	}

      	return calculateDay;
	}

};