"use strict";

import { photosAPI } from "/js/api/photos.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";

function main(){
	let galleryContainer = document.querySelector("div.container");
	photosAPI.getAll()
		.then(photos=>{
			let gallery = galleryRenderer.asRecentCardGallery(photos);
			galleryContainer.appendChild(gallery);
		})
		.catch(error=>messageRenderer.showErrorMessage(error));
}

function clickHandler(event){
	let target = event.target;
	let text = target.textContent;
	alert(text);
}

function handleMouseEnter(event) {
	let card = event.target;
	card.style.backgroundColor = "#88c478";
	card.style.color = "white";
}

function handleMouseLeave(event) {
	let card = event.target;
	card.style.backgroundColor = "white";
	card.style.color = "black";
}

function selectorAvanzado(){
	let container=document.querySelector("div.container");

	let cards = container.querySelectorAll("div.card");
	let texts = container.querySelectorAll("p.card-text");
	for(let card of cards) {
		card.style.backgroundColor = "#BBBBBB";
	}
	for(let text of texts){
		text.style.fontWeight = "bold";
		text.style.color = "black";
	}

}

document.addEventListener("DOMContentLoaded", main);