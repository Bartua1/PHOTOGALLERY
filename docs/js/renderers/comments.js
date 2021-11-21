"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";

const commentRenderer={
	asComment: function(comment) {
		let html = `<p  style="background-color: #202020; border-radius: 35px; color: #737373;"><a href="user_profile.html?userId=${comment.userId}" class="user-link user-name">${comment.userId} </a> ${comment.comment}</p>`;
		let com = parseHTML(html);
		loadUsername(com, comment.userId);
		return com;
	},

	asComments: function(comments){
		let commentContainer = parseHTML ('<div class="container"> </div>');
		for (let comment of comments) {
			let com = commentRenderer.asComment(comment);
			commentContainer.appendChild(com);
		}
		return commentContainer;
	}
}

function loadUsername(html, userId){
	usersAPI.getById(userId)
		.then(users=>{
			let username = users[0].username;
			let p = html.querySelector(".user-name");
			p.textContent = "@" + username;
		});
}

export { commentRenderer };