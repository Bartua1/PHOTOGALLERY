"use strict";

import { artistsAPI } from "/js/api/artists.js";
import { userRenderer } from "/js/renderers/user.js";
import { messageRenderer } from "/js/renderers/messages.js";

function main(){
	let galleryContainer = document.querySelector("div.container");
	artistsAPI.getAll()
		.then(artists=>{
			let gallery = userRenderer.asArtistGallery(artists);
			galleryContainer.appendChild(gallery);
		})
		.catch(error=>messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);