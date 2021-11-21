"use strict";

const CantorUtility = {
	SzudzikFunction: function(x,y){
		let res = (x >= y ? (x * x) + x + y : (y * y) + x);
		return res;
	}
}

export { CantorUtility };