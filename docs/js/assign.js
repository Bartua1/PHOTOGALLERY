"use strict";

import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { parseHTML } from "/js/utils/parseHTML.js";
import { inappropiateAPI } from "/js/api/inappropiate.js";
import { categoriesAPI } from "/js/api/categories.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let isNew = urlParams.get("new");
let currentPhoto = null;

function main() {
	loadCategories();
	loadPhoto();
	let formSubmit = document.getElementById('form-assign-tags');
	formSubmit.onsubmit = handleTagSubmit;
}

function handleTagSubmit(event){
	event.preventDefault();
	$.each($("input[name='category']:checked"), function(){
		let formData = new FormData();
		formData.append('category',$(this).val());
		formData.append('photoId',photoId);
		categoriesAPI.createpc(formData);
	});
	window.location.href="photo_detail.html?photoId="+photoId;
}

function loadCategories(){
	let CatC = document.getElementById('form-assign-tags');
	categoriesAPI.getAll()
		.then(categories=>{
			if (isNew==1){
				renderAll(categories);
			}
			else {
				categoriesAPI.getPCById(photoId)
					.then(photocategories=>{
						renderAllChecked(categories,photocategories);
					})
					.catch(error => messageRenderer.showErrorMessage(error));
			}
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}

function renderAll(categories){
	let html = document.getElementById('form-assign-tags');
	for (let category of categories){
		let c = renderTag(category);
		html.appendChild(c);
	}
	html.appendChild(parseHTML(`
                        <div class="row">
                            <div class="col-md text-center">
                                <button type="submit" class="btn btn-primary">Send</button>
                            </div>
                        </div>`));
}

function renderAllChecked(categories, c2){
	let html = document.getElementById('form-assign-tags');
	for (let category of categories){
		let i = 0;
		for (let pc of c2){
			if (pc.category===category.category){
				i++;
			}
		}
		if (i==0){
			// no esta marcada
			let c = renderTag(category);
			html.appendChild(c);
		}
		else{
			// si que lo esta
			let c = renderCheckedTag(category);
			html.appendChild(c);
		}
	}
	html.appendChild(parseHTML(`
                        <div class="row">
                            <div class="col-md text-center">
                                <button type="submit" class="btn btn-primary">Send</button>
                            </div>
                        </div>`));
}

function renderTag(category){
	let text = `<div class="form-check form-check-inline" id="${category.category}" style="border-radius: 35px; background-color: #8c8c8c;">		
      <input class="form-check-input" type="checkbox" style="display:none;" id="id_${category.category}" value="${category.category}" name="category">
      <label class="form-check-label" for="id_${category.category}"><b>${category.category}</b></label>
    </div>`;
    let html = parseHTML(text);
    return html;
}

function renderCheckedTag(category){
	let text = `<div class="form-check form-check-inline" id="${category.category}" style="border-radius: 35px; background-color: #8c8c8c;">		
      <input class="form-check-input" type="checkbox" style="display:none;" id="id_${category.category}" value="${category.category}" name="category" checked>
      <label class="form-check-label" for="id_${category.category}"><b>${category.category}</b></label>
    </div>`;
    let html = parseHTML(text);
    return html;
}

function loadPhoto(){
	photosAPI.getById(photoId)
		.then(photos=>{
			let p = photos[0];
			let photoContainer = document.querySelector("#photo-container");
			photoContainer.innerHTML="";
			let html = `<img src="`+p.url+`" height="400"></img>`;
			let text=parseHTML(html);
			photoContainer.appendChild(text);
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);