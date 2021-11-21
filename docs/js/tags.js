"use strict";

import { photosAPI } from "/js/api/photos.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { categoriesAPI } from "/js/api/categories.js";
import { parseHTML } from "/js/utils/parseHTML.js";

function main(){
	let formTag = document.getElementById('tag-create');
	formTag.onsubmit=handleSubmit;
	loadTags();
}

function loadTags(){
	let mc = document.getElementById('tag-container');
	categoriesAPI.getAll()
	.then(categories=>{
		for (let category of categories){
			let text = `<p  style="background-color: #202020; border-radius: 35px; color: #737373;">`+category.category+`</p>`;
			let html = parseHTML(text);
			mc.appendChild(html);
		}
	})
	.catch(error=>messageRenderer.showErrorMessage(error));
}

function handleSubmit(event){
	event.preventDefault();
	let form = event.target;
	let formData = new FormData(form);
	categoriesAPI.create(formData)
		.then(data=>{
			window.location.href="http://localhost:8080/tags.html";
		})
		.catch(error=>messageRenderer.showErrorMessage('That tag already Exists'));
	window.locate.reload();
}

document.addEventListener("DOMContentLoaded", main);