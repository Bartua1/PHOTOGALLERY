"use strict";

import { userValidator } from "/js/validators/user_validator.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { authAPI } from "/js/api/auth.js";
import { sessionManager } from "/js/utils/session.js";

function main() {
	addLoginSubmitHandler();
}

function addLoginSubmitHandler() {
	let form = document.getElementById("login-form");
	form.onsubmit = loginSubmit;
}


function loginSubmit(event) {
	event.preventDefault();
	let errorsDiv = document.getElementById("errors");
	errorsDiv.innerHTML = "";

	let form = event.target;
	let formData = new FormData(form);
	sendLogin(formData);
}

function sendLogin(formData) {
	authAPI.login(formData)
		.then(loginData => {
			let sessionToken = loginData.sessionToken;
			let loggedUser = loginData.user;
			sessionManager.login(sessionToken, loggedUser);
			window.location.href = "index.html";
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}



document.addEventListener("DOMContentLoaded", main);