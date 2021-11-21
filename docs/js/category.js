"use strict";

import { sessionManager } from "/js/utils/session.js";
import { parseHTML } from "/js/utils/parseHTML.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let category = urlParams.get("category");

function main(){
	let title = document.querySelector("#title2");
	title.innerHTML = "Category: "+category;
	loadPhotos();
}

function loadPhotos(){
	photosAPI.getAll()
		.then(photos=>{
			let photoContainer = document.querySelector("div.container");
			let gallery = galleryRenderer.asCardGalleryfromCategory(photos,category);
			photoContainer.appendChild(gallery);
		})
		.catch(error=>messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);