"use strict";

import { BASE_URL, requestOptions } from './common.js';

const inappropiateAPI = {
	getAll: function(){
		return new Promise(function (resolve, reject) {
			axios
				.get(`${BASE_URL}/InappropriateWords`,requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	}
}

export { inappropiateAPI };