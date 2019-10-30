$(document).ready(function() {
	setTimeout(function() {
		showBasket();

	}, 100);
	
})

function showBasket() {
	const Http = new XMLHttpRequest();
	const url = 'http://localhost:8080/showBasket';
	Http.open("GET", url);
	var a=1;
	Http.onreadystatechange = function(e) {
		if (Http.readyState == 4) {	
			data = JSON.parse(Http.responseText);
			data.forEach(function(item) {
				
				var rows = document.createElement("tr");
				rows.id = "rows"+a;
				document.getElementById("basketList").appendChild(rows);
				
				var name = document.createElement("td");
				name.id = "name";
				var description = document.createElement("td");
				description.id = "description";
				var price = document.createElement("td");
				price.id = "price";
				var quantity = document.createElement("td");
				quantity.id = "quantity";
				var remove = document.createElement("a");
				remove.id="remove";
				remove.href="#"
				remove.className="button";
				remove.innerHTML="x";
				remove.onclick = function() {
					deleteProduct(bId);
				}
				
				name.innerHTML = item.name;
				description.innerHTML = item.description;
				price.innerHTML = item.price;
				quantity.innerHTML = item.quantity;
				
				document.getElementById("rows"+a).appendChild(name);
				document.getElementById("rows"+a).appendChild(description);
				document.getElementById("rows"+a).appendChild(price);
				document.getElementById("rows"+a).appendChild(quantity);

				
				a=a+1;
			});
		}

	}
	Http.send();
}


function deleteProduct(bId) {
	const Http = new XMLHttpRequest();
	const url = 'http://localhost:8080/deleteFromBasket/bId';
	Http.open("DELETE", url);
	
}