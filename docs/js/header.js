"use strict";

import { sessionManager } from "/js/utils/session.js";
import { parseHTML } from "/js/utils/parseHTML.js";

function main () {
	if(sessionManager.isLogged()){
		showUser();
	}
	else {
		showGuest();
	}
	addLogoutHandler();
	hideHeaderOptions();
	let categoryform = document.querySelector("#category-search-btn");
	categoryform.onsubmit = handlecategory;
	document.querySelector("#navbar-feed").href="feed.html?userId="+sessionManager.getLoggedId();
}

function handlecategory(event){
	event.preventDefault();
	let form = event.target;
	let formData = new FormData(form);
	window.location.href='categories.html?category='+formData.get("category");
}

function showUser () {
	let titleContent = document.getElementById("show-user");
	let username = sessionManager.getLoggedUser().username;
	let text = `<b><a class="nav-link" style="color:#9a4aae;" id="navbar-title" href="user_profile.html?userId=${sessionManager.getLoggedId()}"><img src="${sessionManager.getLoggedUser().avatarUrl}" style="border-radius: 50%;" height="30px"></img> @${username}</a></b>`;
	let usertitle=parseHTML(text);
	titleContent.appendChild(usertitle);
}

function showGuest() {
	let titleContent = document.getElementById("show-user");
	let text = `<a class="nav-link" id="navbar-title" href=""><img src="images/default_profile.png" style="border-radius: 50%;" height="30px"></img>Guest</a>`;
	let usertitle=parseHTML(text);
	titleContent.appendChild(usertitle);
}


function addLogoutHandler () {
	let logoutButton = document.getElementById("navbar-logout");
	logoutButton.addEventListener("click", function() {
		sessionManager.logout() ;
		window.location.href = "index.html";
	}) ;
}


function hideHeaderOptions() {
	let headerRegister = document.getElementById("navbar-register");
	let headerLogin = document.getElementById("navbar-login") ;
	let headerLogout = document.getElementById("navbar-logout");
	let headerRecent = document.getElementById("navbar-recent");
	let headerCreate = document.getElementById("navbar-create");
	let headerFeed = document.getElementById("navbar-feed");
	let headerTrending = document.getElementById("navbar-trending");
	let headerTag = document.getElementById("navbar-tags");
	if(sessionManager.isLogged()) {
		headerRegister.style.display="none";
		headerLogin.style.display="none";
	} else {
		headerRecent.style.display="none";
		headerCreate.style.display="none";
		headerLogout.style.display="none";
		headerFeed.style.display="none";
		headerTrending.style.display="none";
		headerTag.style.display="none";
	}
}


document.addEventListener("DOMContentLoaded", main);