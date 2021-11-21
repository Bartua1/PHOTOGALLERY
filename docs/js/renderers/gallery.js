"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { dates } from "/js/utils/datecomparator.js";
import { categoriesAPI } from "/js/api/categories.js";
import { followsAPI } from "/js/api/follows.js";
import { sessionManager } from "/js/utils/session.js";

const galleryRenderer = {
	asCardGallery: function (photos){
		let galleryContainer = parseHTML ('<div class="container"> </div>');
		let row = parseHTML ('<div class="row"> </div>');
		galleryContainer.appendChild(row);
		let counter=0;
		for (let photo of photos){
			if(photo.visibility==="Public" || photo.userId==sessionManager.getLoggedId()){
				let card = photoRenderer.asCard(photo);
				row.appendChild(card);
				counter+=1;
				if (counter%3===0){
					row = parseHTML('<div class="row"> </div>');
					galleryContainer.appendChild(row);
				}
			}
		}
		return galleryContainer;
	},

	asRecentCardGallery: function(photos){
		let galleryContainer = parseHTML ('<div class="container"> </div>');
		let row = parseHTML ('<div class="row"> </div>');
		galleryContainer.appendChild(row);
		let counter=0;
		photos.sort(function(a,b){return dates.compare(a.date,b.date)});
		for (let photo of photos){
			if(photo.visibility==="Public" || photo.userId==sessionManager.getLoggedId()){
				if(counter<6){
					let card = photoRenderer.asCard(photo);
					row.appendChild(card);
					counter+=1;
					if (counter%3===0){
						row = parseHTML('<div class="row"> </div>');
						galleryContainer.appendChild(row);
					}
				}
			}
		}
		return galleryContainer;
	},

	asCardGalleryfromCategory: function (photos,category){
		let galleryContainer = parseHTML ('<div class="container"> </div>');
		let row = parseHTML ('<div class="row"> </div>');
		galleryContainer.appendChild(row);
		let counter=0;
		for (let photo of photos){
			categoriesAPI.getAllpc()
				.then(photocategories => {
					for(let pc of photocategories){
						if (pc.category==category && pc.photoId==photo.photoId){
							let card = photoRenderer.asCard(photo);
							row.appendChild(card);
							counter+=1;
						}
					}
				})
				.catch(error => messageRenderer.showErrorMessage(error));
			if (counter%3===0){
				row = parseHTML('<div class="row"> </div>');
				galleryContainer.appendChild(row);
			}
		}
		return galleryContainer;
	},

	asCardGallerybyUserId: function (photos, userId){
		let galleryContainer = parseHTML ('<div class="container"> </div>');
		let row = parseHTML ('<div class="row"> </div>');
		galleryContainer.appendChild(row);
		let counter=0;
		photos.sort(function(a,b){return dates.compare(a.date,b.date)});
		for (let photo of photos){
			if(photo.visibility==="Public" || photo.userId==sessionManager.getLoggedId()){
				followsAPI.getAll()
					.then(follows=>{
						let i = 0;
						for (let follow of follows){
							if (follow.Seguido==photo.userId && follow.Siguiendo==userId) {
								let card = photoRenderer.asCard(photo);
								row.appendChild(card);
								counter+=1;
							}
						}
					})
					.catch(error => messageRenderer.showErrorMessage(error));
				if (counter%3===0){
					row = parseHTML('<div class="row"> </div>');
					galleryContainer.appendChild(row);
				}
			}
		}
		return galleryContainer;
	}
};

export { galleryRenderer };