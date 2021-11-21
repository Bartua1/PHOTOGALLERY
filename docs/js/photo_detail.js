"use strict";

import { photoRenderer } from "/js/renderers/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { photosAPI } from "/js/api/photos.js";
import { sessionManager } from "/js/utils/session.js";
import { parseHTML } from "/js/utils/parseHTML.js";
import { commentAPI } from "/js/api/comments.js";
import { commentRenderer } from "/js/renderers/comments.js";
import { categoriesAPI } from "/js/api/categories.js";
import { inappropiateAPI } from "/js/api/inappropiate.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;

function main () {
	let photoContainer  = document.querySelector("#photo-details-column");
	photosAPI.getById(photoId)
		.then(photos => {
			let photoDetails = photoRenderer.asDetails(photos[0]);
			photoContainer.appendChild(photoDetails);
		})
		.catch(error => messageRenderer.showErrorMessage(error));
	let editBtn = document.querySelector("#button-edit");
	editBtn.onclick = handleEdit;
	let deleteBtn = document.querySelector("#button-delete");
	deleteBtn.onclick = handleDelete;
	hideActionsColumn();
	hideEditDelete();
	let formRate = document.getElementById("form-rate");
	let commentForm = document.getElementById("form-comment");
	if (!sessionManager.isLogged()){
		formRate.style.display='none';
		commentForm.style.display='none';
		let c = document.getElementById('title4 com');
		c.innerHTML="</br>Log in to comment";
	}
	formRate.onsubmit = handleRate;
	addAverageRate();

	commentForm.onsubmit = handleComment;
	loadComments();
	let CategoryForm = document.getElementById("form-category");
	CategoryForm.onsubmit = handleCategory;
	loadCategories();
}

function loadCategories(){
	let categoryContainer = document.getElementById("loadCateg");
	categoriesAPI.getAllpc()
		.then(categories=>{
			for (let category of categories){
				if(category.photoId==photoId){
					let text = `<p style="background-color: #202020; border-radius: 35px; text-align:center;color:white;">`+category.category+`<p>`;
					let html = parseHTML(text);
					categoryContainer.appendChild(html);
				}
			}
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}

function loadComments(){
	let commentContainer = document.getElementById("comments-text");
	commentAPI.getByPhotoId(photoId)
		.then(comments => {
			let coms = commentRenderer.asComments(comments);
			commentContainer.appendChild(coms);
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}

function handleComment(event){
	event.preventDefault();
	let errorsDiv = document.getElementById("errors");
	let form = event.target;
	let formData = new FormData(form);
	formData.append("userId", sessionManager.getLoggedId());
	formData.append("photoId", photoId);
	sendComment(formData);
}

function handleCategory(event){
	event.preventDefault();
	let errorsDiv = document.getElementById("errors");
	let form = event.target;
	let formData = new FormData(form);
	categoriesAPI.deletepcc(photoId, formData.get('category'))
		.then(window.location.reload())
	categoriesAPI.getAll()
		.then(categories => {
			// Existe la categoria?
			let existe = 0;
			for (let category of categories){
				if (category.category===formData.get('category')){
					existe++;
				}
			}
			if (existe===0){
				// no existe, la creo
				categoriesAPI.create(formData)
					.then()
					.catch(error => messageRenderer.showErrorMessage(error));
			}
			// ahora que ya existe 100%
			formData.append("photoId", photoId);
			
			categoriesAPI.getPCById(photoId)
				.then( photocategories => {
					let j = 0;
					// ya estaba asociada a esta foto?
					let z = 0;
					// z representa el indice de la pc en la que coinciden
					for (let pc of photocategories){
						if(pc.category==formData.get("category") && pc.photoId==photoId){
							j++;
							z = pc.photocategoryId;
						}
					}
					if(j===0){
						// no estaba asociada, la asocio;
						categoriesAPI.createpc(formData)
							.then(data => location.reload())
							.catch(error => messageRenderer.showErrorMessage(error));
					}
					else {
						//si que estaba asociada, la borro;
						categoriesAPI.deletepc(z)
							.then(data => location.reload())
							.catch(error => messageRenderer.showErrorMessage(error));
					}
				})
				.catch(error => messageRenderer.showErrorMessage(error));
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}

function sendComment(formData){
	let inapp = [];
	// para comprobar las palabras inadecuadas
	let words = formData.get('comment').split(" ");
	if (formData.get("comment")!=null){
		inappropiateAPI.getAll()
			.then(iwords=>{
				for (let word of iwords){
					if(words.includes(word.inappropiateword)){
						inapp.push(word.inappropiateword);
					}
				}
				if(inapp.length!==0){
					messageRenderer.showErrorMessage("The following object/s "+inapp.join()+" is/are inappropiate word/s, please delete them to continue");
				}
				else{
					commentAPI.create(formData)
						.then( data => {
							let Btn = document.getElementById("Comment-input");
							Btn.value = "";
							window.location.href="photo_detail.html?photoId="+photoId;
						})
						.catch(error => messageRenderer.showErrorMessage(error));
				}
			})
			.catch(error => messageRenderer.showErrorMessage(error));
	}
}

function addAverageRate(){
	let rateContainer = document.querySelector("#photo-details-column");
	photosAPI.getRateById(photoId)
		.then(rates => {
			let count = 0;
			let average = 0;
			for (let rate of rates){
				average+=rate.rate;
				count+=1;
			}
			if(count!==0){
				average=average/count;
			}
			let media = document.createElement('h4');
			media.innerHTML = average+" out of 5";
			media.style.cssText = "color:#9a4aae;";
			rateContainer.appendChild(media);
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}

function handleRate(event){
	event.preventDefault();
	let errorsDiv = document.getElementById("errors");
	let form = event.target;
	let formData = new FormData(form);
	formData.append("userId", sessionManager.getLoggedId());
	formData.append("photoId", photoId);
	sendRate(formData);
}

function sendRate(formData){
	photosAPI.createRate(formData)
		.then( data => {
			window.location.href="photo_detail.html?photoId="+photoId;
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}

function handleDelete(event) {

	commentAPI.getByPhotoId(photoId)
		.then(comments=>{
			if (comments.length===0){
				deletephoto();
			}
			else{
				messageRenderer.showErrorMessage("You cannot delete a photo with comments on it");
			}
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}

function deletephoto(){
	let answer = confirm("Do you really want to delete this photo?");
	if (answer) {
		categoriesAPI.getPCById(photoId)
			.then(photocategories=>{
				if(photocategories.length!==0){
					categoriesAPI.deletepccc(photoId)
						.then()
						.catch(error => messageRenderer.showErrorMessage(error));
				}
				photosAPI.getRateById(photoId)
					.then(rates=>{
						if(rates.length!==0){
							photosAPI.deleteRate(photoId)
								.then()
								.catch(error => messageRenderer.showErrorMessage(error));
						}
						photosAPI.delete(photoId)
							.then(event=>{
								window.location.href='index.html';
							})
							.catch(error => messageRenderer.showErrorMessage(error));
						
					})
					.catch(error => messageRenderer.showErrorMessage(error));

			})
			.catch(error => messageRenderer.showErrorMessage(error));
	}
}

function handleEdit(event) {
	window.location.href = "edit.html?photoId="+photoId;
};

function hideActionsColumn () {
	let actions_col = document.getElementById("actions-col");
	if (!sessionManager.isLogged()) {
		actions_col.style.display="none";
	}
}

function hideEditDelete(){
	photosAPI.getById(photoId)
		.then(photos => {
			let photoUserId = photoRenderer.asUserId(photos[0]);
			let editBtnn = document.querySelector("#button-edit");
			let deleteBtnn = document.querySelector("#button-delete");
			let categoryform = document.querySelector("#form-category");
			if(photoUserId!==sessionManager.getLoggedId()){
				editBtnn.style.display="none";
				deleteBtnn.style.display="none";
				categoryform.style.display="none";
			}
			else{
				let categor = document.getElementById('title4');
				categor.innerHTML = `<a href="assign_tags.html?new=0&photoId=`+photoId+`" style="color:#9a4aae">Categories</a>`;
			}
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}


document.addEventListener("DOMContentLoaded", main);