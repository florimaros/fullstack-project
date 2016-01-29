'use strict';

var meal = document.querySelector("#meal");
var calories = document.querySelector("#calories");
var date = document.querySelector("#date");
var button = document.querySelector("#post_item");
var button2 = document.querySelector("#filter_meals");
var container = document.querySelector("#calorie_numbers");
var container2 = document.querySelector("#sum_calories")

//var url = 'http://localhost:3000/todos';
var postButton = document.querySelector('#post-item');
var filterInput = document.querySelector("#filter");
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
	var sum = 0;
	var items = JSON.parse(response);
	items.forEach(function(item) {
		sum += item.calorie;
		createDomItem(item);
	});
	container2.innerText = sum;
}

function createDomItem(item) {
	var newItem = document.createElement('p');
	newItem.setAttribute('id', item["id"])
	newItem.addEventListener("click", function ()	{
		var request = new XMLHttpRequest();
		request.open("delete", 'http://localhost:3000/meals/'+ item["id"]);
		request.send();
		request.onreadystatechange = function()	{
			if (request.readyState === 4)	{
				console.log(request.response);
			}
		}
	})

//	var removeSpan = createRemoveSpan(item["id"]);
	var textSpan = document.createElement("span")
	textSpan.innerText = item.name + " " + item.calorie + " " + item.date

//	newItem.appendChild(removeSpan);
	newItem.appendChild(textSpan);
	container.appendChild(newItem);
}

button2.addEventListener("click", function()	{
	var request = new XMLHttpRequest();
	request.open("get", 'http://localhost:3000/meals/');
	request.send();
	request.onreadystatechange = function()	{
		if(request.readyState === 4) {
			container.innerText = ""
			var json = JSON.parse(request.response);
			for (var i = 0; i<json.length; i++ )	{
				if (json[i].date === filterInput.value)	{
					createDomItem(json[i]);
				}
			}
		}
	}
})


getAllItems()
