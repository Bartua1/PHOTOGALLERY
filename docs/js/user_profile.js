"use strict";

import { userRenderer } from "/js/renderers/user.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { photosAPI } from "/js/api/photos.js";
import { followsAPI } from "/js/api/follows.js";
import { usersAPI } from "/js/api/users.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { sessionManager } from "/js/utils/session.js";
import { parseHTML } from "/js/utils/parseHTML.js";
import { CantorUtility } from "/js/utils/cantor.js";


let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");

function main () {
	let profileContainer = document.querySelector("div.container");
	usersAPI.getById(userId)
		.then(users => {
			let currentuser = users[0];
			let user = userRenderer.asUser(currentuser);
			profileContainer.appendChild(user);
		})
		.catch(error=>messageRenderer.showErrorMessage(error));
	let galleryContainer = document.querySelector("div.container2");
	usersAPI.getByUserId(userId)
		.then(photos =>{
			let gallery = galleryRenderer.asCardGallery(photos);
			galleryContainer.appendChild(gallery);
		})
		.catch(error=>messageRenderer.showErrorMessage(error));
	hideEdit();
	let avatarUp = document.querySelector("#button-update");
	avatarUp.onclick = handleUpdate;
	loadFollowBtn();
	let followBtn = document.querySelector("#follow-btn");
	followBtn.onclick = handlefollow;
}

function handlefollow(event){
	followsAPI.getById(userId)
		.then(follows => {
			let bool = 0;
			for(let follow of follows){
				if(sessionManager.getLoggedId()==follow.Siguiendo){
					bool++;
				}
			}
			let followBtn = document.querySelector("#follow-btn");
			if(bool===0){
				follow(userId);
			}
			else{
				unfollow(userId);
			}
		})
		.catch(error=>messageRenderer.showErrorMessage(error));

}

function follow(){
	event.preventDefault();
	let map = new FormData();
	let ffId = CantorUtility.SzudzikFunction(sessionManager.getLoggedId(), userId);
	map.append("ffId", ffId);
	map.append("Siguiendo", sessionManager.getLoggedId());
	map.append("Seguido", userId);
	followsAPI.create(map)
		.then(data=>location.reload())
		.catch(error=>messageRenderer.showErrorMessage(error));
}

function unfollow(){
	event.preventDefault();
	let ffId = CantorUtility.SzudzikFunction(sessionManager.getLoggedId(), userId);
	followsAPI.delete(ffId)
		.then(data=>location.reload())
		.catch(error=>messageRenderer.showErrorMessage(error));
}

function loadFollowBtn(){
	let btnContainer = document.getElementById("textcontainer");
	followsAPI.getById(userId)
		.then(follows => {
			let bool = 0;
			for(let follow of follows){
				if(sessionManager.getLoggedId()==follow.Siguiendo){
					bool++;
				}
			}
			let followBtn = document.querySelector("#follow-btn");
			if(bool===0){
				followBtn.innerHTML ="Follow";
			}
			else{
				followBtn.innerHTML="Unfollow";
			}
		})
		.catch(error=>messageRenderer.showErrorMessage(error));
}

function handleUpdate(event) {
	window.location.href="change_avatar.html?userId="+userId;
}

function hideEdit() {
	let avatarUp = document.querySelector("#button-update");
	let followbttn= document.querySelector("#follow-btn");
	if (sessionManager.getLoggedId()!=userId) {
		avatarUp.style.display="none";
	}
	else {
		followbttn.style.display="none";
	}
}

document.addEventListener("DOMContentLoaded", main);