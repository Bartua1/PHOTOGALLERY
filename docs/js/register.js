"use strict";

import { userValidator } from "/js/validators/user_validator.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { authAPI } from "/js/api/auth.js";
import { sessionManager } from "/js/utils/session.js";

function main() {
	addRegisterSubmitHandler();
}

function addRegisterSubmitHandler() {
	let form = document.getElementById("register-form");
	form.onsubmit = registerSubmit;
}

function registerSubmit(event) {
	event.preventDefault();
	let errorsDiv = document.getElementById("errors");
	errorsDiv.innerHTML = "";

	let form = event.target;
	let formData = new FormData(form);
	if (formData.get('avatarUrl')==''){
		formData.set('avatarUrl', '/images/default_profile.png');
	}
	let errors = userValidator.validateRegister(formData);

	if (errors.length>0){
		for (let error of errors){
			messageRenderer.showErrorMessage(error);
		}
	} else {
		sendRegister(formData);
	}
}

function sendRegister(formData) {
	authAPI.register(formData)
		.then(loginData => {
			let sessionToken = loginData.sessionToken;
			let loggedUser = loginData.user;
			sessionManager.login(sessionToken, loggedUser);
			window.location.href = "index.html";
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}



document.addEventListener("DOMContentLoaded", main);