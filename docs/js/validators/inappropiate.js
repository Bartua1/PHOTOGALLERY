"use strict";

import { inappropiateAPI } from "../api/inappropiate.js";

const checkwords = {
	check: function(text){
		let inapp = [];
		const words = text.split(" ");
		let res = inappropiateAPI.getAll()
			.then(iwords=>{
				for (let word of iwords){
					if(words.includes(word.inappropiateword)){
						inapp.push(word.inappropiateword);
					}
				}
				if(inapp.length!==0){
					confirm("The following object/s "+inapp.join()+" is/are inappropiate word/s, please delete them to continue");
					return false;
				}
				else{
					return true;
				}
			})
			.catch(error => reject(error.response.data.message));
		return res;
	}
}

export { checkwords };