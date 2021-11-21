"use strict";

import { usersAPI } from "/js/api/users.js";

let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");


function main () {
	let ChangeForm = document.getElementById("form-avatar-update");
	ChangeForm.onsubmit = handleSubmitForm;
}

function handleSubmitForm(event){
	event.preventDefault ();
	let form = event.target;
	let formData = new FormData(form);
	usersAPI.updateAvatar(userId, formData)
		.then(response=>{
			window.location.href="user_profile.html?userId="+userId;
		})
		.catch(error => reject(error.response.data.message));
}

document.addEventListener("DOMContentLoaded", main);