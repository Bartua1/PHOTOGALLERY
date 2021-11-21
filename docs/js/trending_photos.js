"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { followsAPI } from "/js/api/follows.js";
import { userRenderer } from "/js/renderers/user.js";
import { photosAPI } from "/js/api/photos.js";
import { commentAPI } from "/js/api/comments.js";
import { dates } from "/js/utils/datecomparator.js";
import { galleryRenderer } from "/js/renderers/gallery.js";


let urlParams = new URLSearchParams(window.location.search);
let election = urlParams.get("id");

function main(){
	if(election==1 || election==null){
		loadByPhotoScore();
	}
	else{
		loadByComments();
	}
}

function loadByPhotoScore(){
	let title = document.getElementById("title2");
	title.innerHTML = "Trending photos by: Photo Score";
	photosAPI.getAll()
		.then(photos=>{
			photosAPI.getAllRates()
				.then(rates=>{
					let map = new Map();					
					for(let photo of photos){
						let count = 0;
						let average = 0;
						for (let rate of rates){
							if(rate.photoId==photo.photoId){
								average+=rate.rate;
								count+=1;
							}
						}
						if(count!==0){
							average=average/count;
						}
						map.set(photo,average);
					}
					let sortedmap= new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
					let photos2 = [];
					let j=0;
					let ourDate = new Date();
					let aWeekAgo = new Date();
					for (let [key,value] of sortedmap.entries()){
						if(j<5 && Date.parse(key.date)>=Date.parse(aWeekAgo)){
							photos2.push(key);
							j++;
						}
					}
					let galleryContainer = document.querySelector("div.container2");
					let gallery = galleryRenderer.asCardGallery(photos2);
					galleryContainer.appendChild(gallery);
				})
				.catch(error => messageRenderer.showErrorMessage(error));
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}

function loadByComments(){
	let title = document.getElementById("title2");
	title.innerHTML = "Trending photos by: Nº of Comments";
	commentAPI.getAll()
		.then(comments=>{
			photosAPI.getAll()
				.then(photos=>{
					let galleryContainer=document.querySelector("div.container2");
					let map = new Map();
					for (let j = 0; j < photos.length; j++){
						let i = 0;
						for (let comment of comments){
							if(comment.photoId==photos[j].photoId){
								i++;
							}
						}
						var photo = photos[j];
						map.set(photo,i);
					}
					let sortedmap= new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
					let photos2 = [];
					let j=0;
					let ourDate = new Date();
					let aWeekAgo = new Date();
					aWeekAgo.setDate(aWeekAgo.getDate()-7);
					for (let [key,value] of sortedmap.entries()){
						if(j<5 && Date.parse(key.date)>=Date.parse(aWeekAgo)){
							photos2.push(key);
							j++;
						}
					}
					let gallery = galleryRenderer.asCardGallery(photos2);
					galleryContainer.appendChild(gallery);
				})
				.catch(error => messageRenderer.showErrorMessage(error));
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);