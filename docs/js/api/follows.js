"use strict";

import { BASE_URL, requestOptions } from './common.js';

const followsAPI = {
	getById: function(userId) {
		return new Promise(function (resolve, reject) {
			axios
				.get(`${BASE_URL}/users/${userId}/followingfollowers`, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	getAll: function(){
		return new Promise(function (resolve, reject) {
			axios
				.get(`${BASE_URL}/followingfollowers`, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	create: function(lista) {
		return new Promise(function (resolve, reject) {
			axios
				.post(`${BASE_URL}/followingfollowers`, lista, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	delete: function(ffId) {
		return new Promise(function (resolve, reject) {
			axios
				.delete(`${BASE_URL}/followingfollowers/${ffId}`, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	}
};

export { followsAPI };