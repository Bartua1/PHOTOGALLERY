"use strict";
import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { parseHTML } from "/js/utils/parseHTML.js";
import { inappropiateAPI } from "/js/api/inappropiate.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;

function main () {
	if (photoId !== null) {
		loadCurrentPhoto();
	}
	let image = document.getElementById("input-url");
	image.oninput = loadPhoto;
	let registerForm = document.getElementById("form-photo-upload");
	registerForm.onsubmit = handleSubmitPhoto;
}

function loadPhoto(event){
	let photoURL = event.target.value;
	let photoContainer = document.querySelector("#photo-container");
	photoContainer.innerHTML="";
	let html = `<img src="`+photoURL+`" height="400"></img>`;
	let text=parseHTML(html);
	photoContainer.appendChild(text);
}

function loadCurrentPhoto() {
	let pageTitle = document.getElementById("page-title");
	let urlInput = document.getElementById("input-url");
	let titleInput = document.getElementById("input-title");
	let descriptionInput = document.getElementById("input-description");
	let visibilityInput = document.getElementById("input-visibility");
	pageTitle.textContent="Editing a photo";
	photosAPI.getById(photoId)
		.then(photos => {
			currentPhoto = photos[0];
			urlInput.value = currentPhoto.url;
			titleInput.value = currentPhoto.title;
			descriptionInput.value = currentPhoto.description;
			visibilityInput.value = currentPhoto.visibility;
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}

function handleSubmitPhoto(event) {
	event.preventDefault ();
	if (sessionManager.isLogged()){
		let form = event.target;
		let formData = new FormData(form);
		let inapp = [];
		let wordsftitle = formData.get('title').split(" ");
		let wordsfdesription = formData.get('description').split(" ");
		inappropiateAPI.getAll()
			.then(iwords=>{
				for (let word of iwords){
					if(wordsftitle.includes(word.inappropiateword)){
						inapp.push(word.inappropiateword);
					}
					if(wordsfdesription.includes(word.inappropiateword)){
						inapp.push(word.inappropiateword);
					}
				}
				if(inapp.length!==0){
					confirm("The following object/s "+inapp.join()+" is/are inappropiate word/s, please delete them to continue");
					location.reload();
				}
				else{
					if (currentPhoto === null) { // Creating a new photo
						// Add the current user 's ID
						formData.append ("userId",sessionManager.getLoggedId());
						photosAPI.create(formData)
							.then(photo =>{
								if (formData.get('visibility')=='Public'){
									window.location.href=`assign_tags.html?new=1&photoId=${photo.lastId}`;
								}
								else {
									window.location.href=`photo_detail.html?photoId=${photo.lastId}`;
								}
							})
							.catch(error => messageRenderer.showErrorMessage(error));
					} else { // Updating an existing photo
						formData.append("userId", currentPhoto.userId);
						formData.append("date", currentPhoto.date);
						photosAPI.update(photoId, formData)
							.then(data => window.location.href="index.html")
							.catch(error => messageRenderer.showErrorAsAlert(error));
					}
				}
			})
			.catch(error => messageRenderer.showErrorAsAlert(error));
	}
	else{
		messageRenderer.showErrorMessage(`You must log in to submit a photo`);
	}
}

document.addEventListener("DOMContentLoaded", main);