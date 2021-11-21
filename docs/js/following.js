"use strict";

import { sessionManager } from "/js/utils/session.js";
import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";
import { followsAPI } from "/js/api/follows.js";
import { messageRenderer } from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");

function main(){
	loadfollowers();
	loadfollowed();
}

function loadfollowers(){
	followsAPI.getById(userId)
		.then(follows => {
			for(let follow of follows){
				usersAPI.getById(follow.Siguiendo)
					.then(users => {
						loadUser(users[0]);
					})
					.catch(error=>messageRenderer.showErrorMessage(error));
			}
		})
		.catch(error=>messageRenderer.showErrorMessage(error));
}

function loadUser(user){
	let followersContainer=document.querySelector("#container-followers");
	let text = `<div class="row">
						<div class="col-sm">
							</br></br>
							<a href="user_profile.html?userId=${user.userId}" class="user-link"><h4 style="color:#47525e;" class="user-name">@${user.username}</h4></a>
        					<img src="${user.avatarUrl}" height=240>
        				</div>
        			</div>`;
    let html = parseHTML(text);
    followersContainer.appendChild(html);
}

function loadFollow(user){
	let followersContainer=document.querySelector("#container-followed");
	let text = `<div class="row">
						<div class="col-sm">
							</br></br>
							<a href="user_profile.html?userId=${user.userId}" class="user-link"><h4 style="color:#47525e;" class="user-name">@${user.username}</h4></a>
        					<img src="${user.avatarUrl}" height=240>
        				</div>
        			</div>`;
    let html = parseHTML(text);
    followersContainer.appendChild(html);
}

function loadfollowed(){
	followsAPI.getAll()
		.then(follows => {
			let followersContainer=document.querySelector("#container-followed");
			for(let follow of follows){
				if(follow.Siguiendo==sessionManager.getLoggedId()){
					usersAPI.getById(follow.Seguido)
						.then(follows2 => {
							loadFollow(follows2[0]);
						})
						.catch(error=>messageRenderer.showErrorMessage(error));
				}
			}
		})
		.catch(error=>messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);