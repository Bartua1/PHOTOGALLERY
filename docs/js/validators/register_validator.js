"use strict"

import { userValidator } from "/js/validators/user_validator.js";
import { messageRenderer } from "/js/renderers/messages.js";

function main(){
	let registerForm = document.getElementById("register-form");
	registerForm.onsubmit = handleSubmitRegister;
}

function handleSubmitRegister(event) {
	event.preventDefault();

	let form = event.target;
	let formData = new FormData(form);

	let errors = userValidator.validateRegister(formData);
	if(errors.length>0){
		let errorsDiv = document.getElementById("errors");
		errorsDiv.innerHMTL = "";
		for (let error of errors){
			messageRenderer.showErrorMessage(error);
		}
	} else
		window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", main);