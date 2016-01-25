'use strict';

var meal = document.querySelector("#meal")
var calories = document.querySelector("#calories");
var date = document.querySelector("#date");
var button = document.querySelector("#post_item");
var container = document.querySelector("#calorie_numbers")

//var url = 'http://localhost:3000/todos';
var postButton = document.querySelector('#post-item');

button.addEventListener('click', function() {
	if(meal.value !== '') {
		var request = new XMLHttpRequest();
		request.open('POST', 'http://localhost:3000/meals');
		request.setRequestHeader('Content-Type', 'application/json');
		request.send(JSON.stringify({"name": meal.value,"calorie": calories.value, "date": date.value}));
		request.onreadystatechange = function() {
			if(request.readyState === 4) {
				addItemsToDom('[{"name": meal.value,"calorie": calories.value, "date": date.value}]')
				meal.value = '';
			}
		}
	}
});

function getAllItems() {
	var request = new XMLHttpRequest();
	request.open('GET', 'http://localhost:3000/meals');
	request.send();
	request.onreadystatechange = function() {
	    if (request.readyState === 4) {
	      return addItemsToDom(request.response)
	    }
	}
}

function addItemsToDom(response) {
	var items = JSON.parse(response);
	items.forEach(function(item) {
		createDomItem(item);
	});
}

function createDomItem(item) {
	var newItem = document.createElement('p');
	newItem.setAttribute('id', item["id"])

//	var removeSpan = createRemoveSpan(item["id"]);
	var textSpan = document.createElement("span")
	textSpan.innerText = item.name + " " + item.calorie + " " + item.date

//	newItem.appendChild(removeSpan);
	newItem.appendChild(textSpan);
	container.appendChild(newItem);
}

getAllItems()
/*function createRemoveSpan(id) {
	var removeSpan = document.createElement('span');
	removeSpan.innerText = '[x] ';
	removeSpan.addEventListener('click', function() {
		var request = new XMLHttpRequest();
		request.open('DELETE', 'http://localhost:3000/todos/' + id);
		request.send();
		request.onreadystatechange = function() {
			if (request.readyState === 4) {
				removeItemFromDomById(id);
			}
		}
	});
	return removeSpan;
}

function createTextSpan(id, text) {
	var textSpan = document.createElement('span');
	textSpan.classList.add('text')
	textSpan.innerText = text;
	textSpan.addEventListener('click', function() {
		var request = new XMLHttpRequest();
		request.open('PUT', 'http://localhost:3000/todos/' + id);
		request.send();
		request.onreadystatechange = function() {
			if (request.readyState === 4) {
				document.getElementById(id).classList.remove('new');
				document.getElementById(id).classList.add('completed');
			}
		}
	});
	return textSpan;
}

function removeItemFromDomById(id) {
	document.getElementById(id).remove();
}

getAllItems();
*/
