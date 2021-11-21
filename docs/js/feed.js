"use strict";

import { photosAPI } from "/js/api/photos.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");

function main(){
	if(userId==sessionManager.getLoggedId()){
		let galleryContainer = document.querySelector("div.container");
		photosAPI.getAll()
			.then(photos=>{
				let gallery = galleryRenderer.asCardGallerybyUserId(photos, userId);
				galleryContainer.appendChild(gallery);
			})
			.catch(error=>messageRenderer.showErrorMessage(error));
	}
}

document.addEventListener("DOMContentLoaded", main);