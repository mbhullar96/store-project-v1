$(document).ready(function() {
	setTimeout(function() {
		getProducts();
		showBasket();

	}, 100);

})

// function basketCount() {
// var count =
// document.getElementById("basketTable").getElementsByTagName("tr").length;
// document.getElementById("count").innerHTML = count;
// }

function getProducts() {
	const Http = new XMLHttpRequest();
	const url = 'http://localhost:9001/showProducts';
	Http.open("GET", url);
	var a = 1;
	Http.onreadystatechange = function(e) {
		if (Http.readyState == 4) {
			data = JSON.parse(Http.responseText);
			data.forEach(function(item) {

				var table = document.createElement("tr");
				var name = document.createElement("td");
				var description = document.createElement("td");
				var price = document.createElement("td");
				var quantity = document.createElement("td");
				var num = document.createElement("input");
				var basket = document.createElement("a");
				var update = document.createElement("a");
				var p = document.createElement("input");
	
				table.id = "pTable" + a;
				name.id = "name";
				name.setAttribute("name", item.productid);
				description.id = "description";
				description.setAttribute("name", item.productid);
				price.id = "price";
				price.setAttribute("name", item.productid);
				quantity.id = "quantity";
				num.id = "num"
				num.type = "number";
				num.min = "1";
				num.max = "10";
				quantity.appendChild(num);

				price.onclick = function() {
					p.type = "text";
					p.value = price.innerHTML;
					price.parentNode.replaceChild(p, price);
				}
				
				update.id = "update";
				update.href = "#";
				update.innerHTML = "Update";
				update.onclick = function () {
					var priceId = price.getAttribute("name")
					var newPrice = p.value;
					updatePrice(priceId, newPrice);
				}

				basket.id = "basket";
				basket.href = "#";
				basket.innerHTML = "Add to basket";
				basket.onclick = function(e) {
					addToBasket(e);
				}

				name.innerHTML = item.name;
				description.innerHTML = item.description;
				price.innerHTML = item.price;

				document.getElementById("pList").appendChild(table);
				document.getElementById("pTable" + a).appendChild(name);
				document.getElementById("pTable" + a).appendChild(description);
				document.getElementById("pTable" + a).appendChild(price);
				document.getElementById("pTable" + a).appendChild(quantity);
				document.getElementById("pTable" + a).appendChild(basket);
				document.getElementById("pTable" + a).appendChild(update);
				
				a = a + 1;
			});
		}

	}
	Http.send();
}

function addToBasket(e) {
	const Http = new XMLHttpRequest();
	const url = 'http://localhost:9001/addToBasket';
	Http.open("POST", url, true);
	Http.setRequestHeader("Content-Type", "application/json");
	const product = e.target.parentElement;
	const products = {
		'name' : product.querySelector('#name').textContent,
		'description' : product.querySelector('#description').textContent,
		'price' : product.querySelector('#price').textContent,
		'quantity' : product.querySelector('#num').value
	}
		
	Http.onreadystatechange = function(ev) {
		console.log("Here");
	}

	Http.send(JSON.stringify(products));
	window.location.reload();

}

function showBasket() {
	const Http = new XMLHttpRequest();
	const url = 'http://localhost:9001/showBasket';
	Http.open("GET", url);
	var a = 1;
	Http.onreadystatechange = function(e) {
		if (Http.readyState == 4 && Http.status == 200) {
			data = JSON.parse(Http.responseText);
			data.forEach(function(item) {
				var table = document.createElement("tr");
				var name = document.createElement("td");
				var description = document.createElement("td");
				var price = document.createElement("td");
				var quantity = document.createElement("td");
				var productPrice = document.createElement("td");
				var remove = document.createElement("a");

				table.id = "bTable" + a;

				remove.id = item.basketid;
				remove.href = "#"
				remove.className = "button";
				remove.innerHTML = "x";
				remove.onclick = function() {
					deleteProduct(remove.id);
				}

				name.innerHTML = item.name;
				description.innerHTML = item.description;
				price.innerHTML = item.price;
				quantity.innerHTML = item.quantity;
				productPrice.innerHTML = parseInt(price.innerHTML) * parseInt(quantity.innerHTML);

				document.getElementById("bList").appendChild(table);
				document.getElementById("bTable" + a).appendChild(name);
				document.getElementById("bTable" + a).appendChild(description);
				document.getElementById("bTable" + a).appendChild(price);
				document.getElementById("bTable" + a).appendChild(quantity);
				document.getElementById("bTable" + a).appendChild(productPrice);
				document.getElementById("bTable" + a).appendChild(remove);
				
				a = a + 1;
			});
		}

	}
	Http.send();
}

function deleteProduct(bId) {
	$.ajax({
		url : 'http://localhost:9001/deleteFromBasket/' + bId,
		type : 'DELETE',
		success : function(result) {
			window.location.reload();
		}
	});
}

function updatePrice(pId, newPrice) {
	$.ajax({
		url : 'http://localhost:9001/updatePrice/' + pId + '/' + newPrice,
		type : 'PUT',
		success : function(result) {
			window.location.reload();
		}
	});
}

function searchProducts() {

	var input = document.getElementById("search");
	var filter = input.value.toUpperCase();
	var table = document.getElementById("pList");
	var list = table.getElementsByTagName("tr");
	var td = null;
	for (var i = 0; i < list.length; i++) {
		td = list[i].getElementsByTagName("td")[0];
		if (td) {
			var txt = td.textContent || td.innerHTML;
			if (txt.toUpperCase().indexOf(filter) > -1) {
				list[i].style.display = "";
			} else {
				list[i].style.display = "none";
			}
		}

	}
}

function sorting() {
	var sort = document.getElementById("sort");
	var selected = sort.options[sort.selectedIndex].value;
	var table = document.getElementById("pList");
	var switching = true;
	var shouldSwitch;
	if (selected == "name") {
		while (switching) {
			switching = false;
			var rows = table.rows;

			for (var i = 0; i < (rows.length - 1); i++) {
				shouldSwitch = false;
				var x = rows[i].getElementsByTagName("td")[0];
				var y = rows[i + 1].getElementsByTagName("td")[0];
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
			}
		}
	}

	if (selected == "price") {
		while (switching) {
			switching = false;
			var rows = table.rows;

			for (var i = 0; i < (rows.length - 1); i++) {
				shouldSwitch = false;
				var x = rows[i].getElementsByTagName("td")[2];
				var y = rows[i + 1].getElementsByTagName("td")[2];
				if (x.innerHTML > y.innerHTML) {
					shouldSwitch = true;
					break;
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
			}
		}
	}

}