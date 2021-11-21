"use strict";

import { BASE_URL, requestOptions } from './common.js';

const categoriesAPI = {
	create: function(category){
		return new Promise(function (resolve, reject) {
			axios
				.post(`${BASE_URL}/categories`, category, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	getById: function(category) {
		return new Promise(function (resolve, reject) {
			axios
				.get(`${BASE_URL}/categories/${category}`,requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	getAll: function() {
		return new Promise(function (resolve, reject) {
			axios
				.get(`${BASE_URL}/categories`,requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	createpc: function(formData){
		return new Promise(function (resolve, reject) {
			axios
				.post(`${BASE_URL}/photocategories`, formData, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	getAllpc: function() {
		return new Promise(function (resolve, reject) {
			axios
				.get(`${BASE_URL}/photocategories`,requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	deletepc: function(pcId) {
		return new Promise(function (resolve, reject) {
			axios
				.delete(`${BASE_URL}/photocategories/${pcId}`,requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	deletepccc: function(photoId) {
		return new Promise(function (resolve, reject) {
			axios
				.delete(`${BASE_URL}/photos/${photoId}/photocategories`, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},


	deletepcc: function(photoId, category) {
		return new Promise(function (resolve, reject) {
			axios
				.delete(`${BASE_URL}/photos/${photoId}/photocategories/${category}`, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	getPCById: function(photoId){
		return new Promise(function (resolve, reject) {
			axios
				.get(`${BASE_URL}/photos/${photoId}/photocategories`,requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	}
}

export { categoriesAPI };