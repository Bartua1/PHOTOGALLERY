"use strict";

import { sessionManager } from "/js/utils/session.js";
import { parseHTML } from "/js/utils/parseHTML.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { categoriesAPI } from "/js/api/categories.js";

function main(){
	categoriesAPI.getAll()
		.then(categories=>{
			categoriesAPI.getAllpc()
				.then(photocategories=>{
					let map = new Map();
					for (let category of categories){
						let pnumber = 0;
						for(let pc of photocategories){
							if(pc.category==category.category){
								pnumber++;
							}
						}
						map.set(category,pnumber);
					}
					let gallery = loadCategory(categories,map);
					let galleryContainer = document.querySelector("div.container");
					galleryContainer.appendChild(gallery);
				})
				.catch(error => messageRenderer.showErrorMessage(error));
		})
		.catch(error => messageRenderer.showErrorMessage(error));
}

function loadCategory(categories, map){
	let galleryContainer = parseHTML ('<div class="container"> </div>');
	let row = parseHTML ('<div class="row"> </div>');
	galleryContainer.appendChild(row);
	let counter=0;
	for (let category of categories){
		let card = asCategory(category,map.get(category));
		row.appendChild(card);
		counter+=1;
		if (counter%3===0){
			row = parseHTML('<div class="row"> </div>');
			galleryContainer.appendChild(row);
		}
	}
	return galleryContainer;
}

function asCategory(category, total){
	let html = `<div class="col-md-4">
		<h5 style="text-align:center;"><a href="categories.html?category=${category.category}" style="color:#9a4aae;">${category.category}</a></h5>
		<p style="text-align:center; color:#8c8c8c;">Nº of photos ${total}</p>
	</div>`;
	let card = parseHTML(html);
	return card;
}

document.addEventListener("DOMContentLoaded", main);