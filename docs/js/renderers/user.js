"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";

const userRenderer = {
	asUser: function( user ){
		let html = `<div class="row">
				<div class="col-md">
					<img id="profile" style="background-color:#181818; float:right;" src="${user.avatarUrl}">
				</div>
				<div class="col-md" id="usertext">
					<h2 style="color:#9a4aae;">${user.username}</h2>
					<h3 style="color:#47525e;"> ${user.firstName} ${user.lastName} </h3>
					<h6 style="color:#47525e;"> ${user.email} </h6>
					<a href="following-followers.html?userId=${user.userId}">
						<h7 style="color:#47525e;"> following-followers </h7>
					</a>
					<hr>
				</div>
			</div>`;
		let card = parseHTML(html);
		return card;
	},

	asCard: function ( user ) {
		let html = `<div class="col-md-4">
			<div class="card">
				<a href="user_profile.html?userId=${user.userId}">			
					<img src="${ user.avatarUrl }" class="card-img-top">
				</a>
				<div class="card-body" style="background-color:#242424">
					<h5 class="card-title text-center" style="color:white">${user.username}</h5>
				</div>
			</div>
		</div>`;
		let card = parseHTML(html);
		return card;
	},

	asUserGallery: function (users){
		let galleryContainer = parseHTML ('<div class="container"> </div>');
		let row = parseHTML ('<div class="row"> </div>');
		galleryContainer.appendChild(row);
		let counter=0;
		for (let user of users){
			if(counter<6){
				let card = userRenderer.asCard(user);
				row.appendChild(card);
				counter+=1;
				if (counter%3===0){
					row = parseHTML('<div class="row"> </div>');
					galleryContainer.appendChild(row);
				}
			}
		}
		return galleryContainer;
	},

	asArtist: function (artist) {
		let html = `<div class="container">
				<div class="col-md">
					<img id="profile" style="background-color:#181818; float:right;" src="${artist.photoURL}">
				</div>
				<div class="col-md" id="usertext">
					<h2 style="color:#9a4aae;"> ${artist.name}</h2>
					<h4 style="color:#47525e;"> ${artist.debutDate}</h4>
					<h6 style="color:#47525e;"> ${artist.genre} </h6>
					<h7 style="color:#47525e;"> ${artist.shortBio} </h7>
				</div>
			</div>`;
		let card = parseHTML(html);
		return card;
	},

	asArtistGallery: function (artists) {
		let galleryContainer = parseHTML ('<div class="container"> </div>');
		let row = parseHTML ('<div class="row"> </div>');
		galleryContainer.appendChild(row);
		let counter=0;
		for (let artist of artists){
			if(counter<6){
				let card = userRenderer.asArtist(artist);
				row.appendChild(card);
				counter+=1;
				if (counter%2===0){
					row = parseHTML('<div class="row"> </div>');
					galleryContainer.appendChild(row);
				}
			}
		}
		return galleryContainer;
	}
}

export { userRenderer };