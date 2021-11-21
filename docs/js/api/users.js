"use strict";

import { BASE_URL, requestOptions } from './common.js';

const usersAPI = {
	getById: function(userId) {
		return new Promise(function (resolve, reject) {
			axios
				.get(`${BASE_URL}/users/${userId}`, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	getByUserId: function(userId){
		return new Promise(function (resolve, reject) {
			axios
				.get(`${BASE_URL}/users/${userId}/photos`, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	updateAvatar: function(userId, formData){
		return new Promise(function (resolve, reject) {
			axios
				.put(`${BASE_URL}/users/${userId}`, formData, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	getAll: function(){
		return new Promise(function (resolve, reject) {
			axios
				.get(`${BASE_URL}/users`, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	}
};

export { usersAPI };