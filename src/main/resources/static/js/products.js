$(document).ready(function() {
	setTimeout(function() {
		getProducts();
		showBasket();

	}, 100);
	
	setTimeout(function() {
		basketCount();

	}, 150);

})

function basketCount() {
	var count = 0;
	count = document.getElementById("bList").getElementsByTagName("tr").length;
	document.getElementById("counter").innerHTML = "(" + count + ")";
}

function getProducts() {
	const Http = new XMLHttpRequest();
	const url = 'http://35.246.32.170:9001/showProducts';
	Http.open("GET", url);
	var a = 1;
	Http.onreadystatechange = function(e) {
		if (Http.readyState == 4) {
			data = JSON.parse(Http.responseText);
			data.forEach(function(item) {

				var productTable = document.getElementById("pList");
				var rows = productTable.insertRow();
				var name = rows.insertCell(0);
				var category = rows.insertCell(1);
				var price = rows.insertCell(2);
				var quantity = rows.insertCell(3);
				var basket = rows.insertCell(4);
				var update = rows.insertCell(5);
				var deleteTD = rows.insertCell(6);
				
				var basketIcon = document.createElement("span");
				var updateIcon = document.createElement("span");
				var confirm = document.createElement("span");
				var deleteIcon = document.createElement("span");
				
				var n = document.createElement("input");
				var c = document.createElement("input");
				var p = document.createElement("input");

				rows.id = "pTable" + a;
				name.id = "name";
				category.id = "category";
				price.id = "price";
				quantity.id = "quantity";	
				confirm.id = "confirm";
				basketIcon.id = "basketIcon";
				updateIcon.id = "update";
				deleteIcon.id = item.productid;
				
				quantity.style.display = "none";
				confirm.style.display = "none";
				
				confirm.className = "glyphicon glyphicon-ok";
				basketIcon.className = "glyphicon glyphicon-shopping-cart";
				updateIcon.className = "glyphicon glyphicon-edit";
				
				basket.onclick = function(e) {
					addToBasket(e);					
				}
				
				deleteIcon.className = "glyphicon glyphicon-remove";
				deleteIcon.onclick = function() {
					deleteProduct(item.productid);
				}
								
				updateIcon.onclick = function() {
					n.type = "text";
					c.type = "text";
					p.type = "text";
					
					n.value = name.innerHTML;
					c.value = category.innerHTML;
					p.value = price.innerHTML;
					
					name.remove();
					category.remove();
					price.remove();
					
					rows.insertCell(0).appendChild(n);
					rows.insertCell(1).appendChild(c);
					rows.insertCell(2).appendChild(p);
					
					if (update.style.display === "none") {
						update.style.display = "block";
						confirm.style.display = "none";
					} else {
						update.style.display = "none";
						rows.insertCell(5).appendChild(confirm);
						confirm.style.display = "block";
					}

				}

				confirm.onclick = function() {
					updateProduct(item.productid, n.value, c.value, p.value);
				}

				name.innerHTML = item.name;
				category.innerHTML = item.category;
				price.innerHTML = item.price;
				quantity.innerHTML = item.quantity;
				
				basket.appendChild(basketIcon);
				deleteTD.appendChild(deleteIcon);
				update.appendChild(updateIcon);
				update.appendChild(confirm);
	
				productTable.append(rows);

				a = a + 1;
			});
		}

	}
	Http.send();
}

function newProduct() {
	$.ajax({
		type : 'POST',
		url : 'http://35.246.32.170:9001/addProduct',
		data : JSON
				.stringify({
					'name' : document.querySelector('#addProductName').value,
					'category' : document.querySelector('#addProductCategory').value,
					'price' : document.querySelector('#addProductPrice').value,
					'quantity' : '1'
				}),
		dataType : "json",
		contentType : "application/json"

	});
	window.location.reload();
}

function addToBasket(e) {
	const Http = new XMLHttpRequest();
	const url = 'http://35.246.32.170:9001/addToBasket';
	Http.open("POST", url, true);
	Http.setRequestHeader("Content-Type", "application/json");
	const product = e.target.parentElement.parentElement;
	const products = {
		'name' : product.querySelector('#name').textContent,
		'category' : product.querySelector('#category').textContent,
		'price' : product.querySelector('#price').textContent,
		'quantity' : product.querySelector('#quantity').textContent
	}
	Http.onreadystatechange = function(ev) {
		console.log("Here");
	}
	Http.send(JSON.stringify(products));
	window.location.reload();

}

function showBasket() {
	const Http = new XMLHttpRequest();
	const url = 'http://35.246.32.170:9001/showBasket';
	Http.open("GET", url);
	var a = 1;
	Http.onreadystatechange = function(e) {
		if (Http.readyState == 4 && Http.status == 200) {
			data = JSON.parse(Http.responseText);
			data.forEach(function(item) {
				var table = document.createElement("tr");
				var name = document.createElement("td");
				var category = document.createElement("td");
				var price = document.createElement("td");
				var quantity = document.createElement("td");
				var num = document.createElement("input");
				var productPrice = document.createElement("td");
				var remove = document.createElement("td");
				var removeIcon = document.createElement("span");
				var confirm = document.createElement("span");

				table.id = "bTable" + a;
				quantity.id = "quantity";
				num.id = "num";
				num.type = "number";
				num.value = "1";
				num.min = "1";
				num.max = "5";

				confirm.style.visibility = "hidden";
				quantity.appendChild(num);
				quantity.appendChild(confirm);

				confirm.id = "confirm";
				confirm.href = "#";
				confirm.className = "glyphicon glyphicon-ok";

				num.onchange = function() {
					confirm.style.visibility = "visible";
				}

				confirm.onclick = function() {
					updateQuantity(item.basketid, num.value);
				}

				remove.appendChild(removeIcon);
				removeIcon.id = item.basketid;
				removeIcon.className = "glyphicon glyphicon-remove";
				removeIcon.onclick = function() {
					deleteFromBasket(removeIcon.id);
				}

				name.innerHTML = item.name;
				category.innerHTML = item.category;
				price.innerHTML = item.price;
				num.value = item.quantity;
				productPrice.innerHTML = "£" + (parseInt(price.innerHTML) * parseInt(num.value));

				document.getElementById("bList").appendChild(table);
				document.getElementById("bTable" + a).appendChild(name);
				document.getElementById("bTable" + a).appendChild(category);
				document.getElementById("bTable" + a).appendChild(price);
				document.getElementById("bTable" + a).appendChild(quantity);
				document.getElementById("bTable" + a).appendChild(productPrice)
				document.getElementById("bTable" + a).appendChild(remove);

				a = a + 1;
			});
		}

	}
	Http.send();
}

function deleteFromBasket(bId) {
	$.ajax({
		url : 'http://35.246.32.170:9001/deleteFromBasket/' + bId,
		type : 'DELETE',
		success : function(result) {
			window.location.reload();
		}
	});
}

function deleteProduct(pId) {
	$.ajax({
		url : 'http://35.246.32.170:9001/deleteProduct/' + pId,
		type : 'DELETE',
		success : function(result) {
			window.location.reload();
		}
	});
}

function updateProduct(pId, n, c, p) {
	$.ajax({
		url : 'http://35.246.32.170:9001/updateProduct/' + pId + '/' + n + '/' + c + '/' + p,
		type : 'PUT',
		success : function(result) {
			window.location.reload();
		}
	});

}

function updateQuantity(bId, q) {
	$.ajax({
		url : 'http://35.246.32.170:9001/updateQuantity/' + bId + '/' + q,
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

function sorting(n) {
	var table = document.getElementById("pList");
	var switching = true;
	var dir = "asc";
	var shouldSwitch;
	var switchCount = 0;
	var i;
	while (switching) {
		switching = false;
		var rows = table.rows;
		for (i = 0; i < (rows.length - 1); i++) {

			shouldSwitch = false;
			var x = rows[i].getElementsByTagName("td")[n];
			var y = rows[i + 1].getElementsByTagName("td")[n];
			if (dir == "asc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			} else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			switchCount++;
		} else {
			if (switchCount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}