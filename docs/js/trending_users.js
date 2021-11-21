"use strict";

import { sessionManager } from "/js/utils/session.js";
import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { followsAPI } from "/js/api/follows.js";
import { userRenderer } from "/js/renderers/user.js";
import { photosAPI } from "/js/api/photos.js";


let urlParams = new URLSearchParams(window.location.search);
let election = urlParams.get("id");

function main(){
	if(election==1 || election==null){
		loadByFollowers();
	}
	else{
		loadByPhotoScore();
	}
}

function loadByPhotoScore(){
	let title = document.getElementById("title2");
	title.innerHTML = "Trending users by: Photo Score";
	usersAPI.getAll()
		.then(users=>{
			photosAPI.getAll()
				.then(photos=>{
					photosAPI.getAllRates()
						.then(rates=>{
							let galleryContainer=document.querySelector("div.container2");
							let map = new Map();
							for (let user of users){
								let p = 0;
								let sum_a = 0;
								for (let photo of photos){
									if (photo.userId==user.userId){
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
										p++;
										sum_a+=average;
									}
								}
								if (p!==0){
									map.set(user,sum_a);
								}
								else {
									map.set(user, 0);
								}
							}
							let sortedmap= new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
							let users2 = [];
							let j=0;
							for (let [key,value] of sortedmap.entries()){
								if(j<5){
									users2.push(key);
								}
								j++;
							}
							let gallery = userRenderer.asUserGallery(users2);
							galleryContainer.appendChild(gallery);
						})
						.catch(error => messageRenderer.showErrorMessage(error));
				})
				.catch(error => messageRenderer.showErrorMessage(error));
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}

function loadByFollowers(){
	let title = document.getElementById("title2");
	title.innerHTML = "Trending users by: Followers";
	usersAPI.getAll()
		.then(users=>{
			followsAPI.getAll()
				.then(follows=>{
					let galleryContainer=document.querySelector("div.container2");
					let map = new Map();
					let i = 0;
					for (let user of users){
						i=0;
						for (let follow of follows){
							if(follow.Seguido==user.userId){
								i++;
							}
						}
						map.set(user, i);
					}
					let sortedmap= new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
					let users2 = [];
					let j=0;
					for (let [key,value] of sortedmap.entries()){
						if(j<5){
							users2.push(key);
						}
						j++;
					}
					let gallery = userRenderer.asUserGallery(users2);
					galleryContainer.appendChild(gallery);
				})
				.catch(error => messageRenderer.showErrorMessage(error));
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);