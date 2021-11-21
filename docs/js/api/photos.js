"use strict";

import { BASE_URL, requestOptions } from './common.js';

const photosAPI = {
	getAll: function() {
		return new Promise(function (resolve, reject) {
			axios
				.get(`${BASE_URL}/photos`,requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	getById: function(photoId) {
		return new Promise(function (resolve, reject) {
			axios
				.get(`${BASE_URL}/photos/${photoId}`,requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	create: function (formData)  {
		return new Promise(function (resolve, reject) {
			axios
				.post(`${BASE_URL}/photos`, formData, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	update: function (photoId, formData)  {
		return new Promise(function (resolve, reject) {
			axios
				.put(`${BASE_URL}/photos/${photoId}`, formData, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	delete: function (photoId)  {
		return new Promise(function (resolve, reject) {
			axios
				.delete(`${BASE_URL}/photos/${photoId}`, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	getRateById: function(photoId) {
		return new Promise(function(resolve,reject) {
			axios
				.get(`${BASE_URL}/photos/${photoId}/rates`, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	getAllRates: function() {
		return new Promise(function(resolve,reject) {
			axios
				.get(`${BASE_URL}/rates`, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},
	
	createRate: function(formData) {
		return new Promise(function(resolve,reject) {
			axios
				.post(`${BASE_URL}/rates`, formData, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},

	deleteRate: function(photoId) {
		return new Promise(function(resolve,reject) {
			axios
				.delete(`${BASE_URL}/photos/${photoId}/rates`, requestOptions)
				.then(response => resolve(response.data))
				.catch(error => reject(error.response.data.message));
		});
	},
};

export { photosAPI };