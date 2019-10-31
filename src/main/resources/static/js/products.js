$(document).ready(function() {
	setTimeout(function() {
		getProducts();
		showBasket();

	}, 100);

})

// $(document).ready(function() {
// setTimeout(function() {
// basketCount();
//		
// }, 500);
//
// })
//
function basketCount() {
	var count = 0;
	count = document.getElementById("bList").getElementsByTagName("tr").length;
	document.getElementById("counter").innerHTML = count;
	console.log(document.getElementById("counter").innerHTML);
}

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
				var basket = document.createElement("td");
				var basketIcon = document.createElement("span");
				var update = document.createElement("td");
				var confirm = document.createElement("span");
				var deleteIcon = document.createElement("span");
				var n = document.createElement("input");
				var d = document.createElement("input");
				var p = document.createElement("input");

				table.id = "pTable" + a;
				name.id = "name";
				description.id = "description";
				price.id = "price";
				quantity.id = "quantity";
				quantity.style.display = "none";

				// table.onclick = function() {
				// n.type = "text";
				// n.value = name.innerHTML;
				// d.type = "text";
				// d.value = description.innerHTML;
				// p.type = "text";
				// p.value = price.innerHTML;
				// name.parentNode.replaceChild(n, name);
				// description.parentNode.replaceChild(d, description);
				// price.parentNode.replaceChild(p, price);
				// }

				// price.onclick = function() {
				// var p = document.createElement("input");
				// p.type = "text";
				// p.value = price.innerHTML;
				// price.parentNode.replaceChild(p, price);
				// }

				confirm.id = "confirm";
				confirm.href = "#";
				confirm.className = "glyphicon glyphicon-ok";
				confirm.style.display = "none";
				
				deleteIcon.id = item.productid;
				deleteIcon.href = "#";
				deleteIcon.className = "glyphicon glyphicon-remove";
				deleteIcon.style.display = "none";
				deleteIcon.onclick = function() {
					deleteProduct(item.productid);
				}
				
				update.id = "update";
				update.href = "#";
				update.innerHTML = "Update";
				update.onclick = function() {
					n.type = "text";
					n.value = name.innerHTML;
					d.type = "text";
					d.value = description.innerHTML;
					p.type = "text";
					p.value = price.innerHTML;
					name.parentNode.replaceChild(n, name);
					description.parentNode.replaceChild(d, description);
					price.parentNode.replaceChild(p, price);
					if (update.style.display === "none") {
						update.style.display = "block";
						confirm.style.display = "none";
						deleteIcon.style.display = "none";
					} else {
						update.style.display = "none";
						confirm.style.display = "block";
						deleteIcon.style.display = "block";
					}

				}

				confirm.onclick = function() {
					updateProduct(item.productid, n.value, d.value, p.value);
				}

				basketIcon.id = "basketIcon";
				basketIcon.className = "glyphicon glyphicon-shopping-cart";
				basket.appendChild(basketIcon);
				// basket.id = "basket";
				basket.onclick = function(e) {
					addToBasket(e);
					// basketCount();
				}

				name.innerHTML = item.name;
				description.innerHTML = item.description;
				price.innerHTML = item.price;
				quantity.innerHTML = item.quantity;

				document.getElementById("pList").appendChild(table);
				document.getElementById("pTable" + a).appendChild(name);
				document.getElementById("pTable" + a).appendChild(description);
				document.getElementById("pTable" + a).appendChild(price);
				document.getElementById("pTable" + a).appendChild(basket);
				document.getElementById("pTable" + a).appendChild(confirm);
				document.getElementById("pTable" + a).appendChild(deleteIcon);
				document.getElementById("pTable" + a).appendChild(quantity);
				document.getElementById("pTable" + a).appendChild(update);

				a = a + 1;
			});
		}

	}
	Http.send();
}

function newProduct() {
	$.ajax({
		type : 'POST',
		url : 'http://localhost:9001/addProduct',
		data : JSON.stringify({
			'name' : document.querySelector('#addProductName').value,
			'description' : document.querySelector('#addProductDescription').value,
			'price' : document.querySelector('#addProductPrice').value,
			'quantity' : '1'
		}),
		dataType : "json",
		contentType : "application/json"
		
	});
	window.location.reload();
//	const Http = new XMLHttpRequest();
//	const url = 'http://localhost:9001/addProduct';
//	Http.open("POST", url, true);
//	Http.setRequestHeader("Content-Type", "application/json");
//	var product = JSON.stringify({
//		'name' : document.querySelector('#addProductName').value,
//		'description' : document.querySelector('#addProductDescription').value,
//		'price' : document.querySelector('#addProductPrice').value,
//		'quantity' : '1'
//	});
//console.log(product);
//	Http.onreadystatechange = function(ev) {
//		console.log("Here");
//	}
//
//	Http.send(products);
////	console.log(JSON.stringify(products));
//	
////	window.location.reload();
//	// $( "#basket" ).load(window.location.href + " #basket" );

}

function addToBasket(e) {
	const Http = new XMLHttpRequest();
	const url = 'http://localhost:9001/addToBasket';
	Http.open("POST", url, true);
	Http.setRequestHeader("Content-Type", "application/json");
	const product = e.target.parentElement.parentElement;
	const products = {
		'name' : product.querySelector('#name').textContent,
		'description' : product.querySelector('#description').textContent,
		'price' : product.querySelector('#price').textContent,
		'quantity' : product.querySelector('#quantity').textContent
	}
	Http.onreadystatechange = function(ev) {
		console.log("Here");
	}
//console.log(products);
	Http.send(JSON.stringify(products));
	window.location.reload();
	console.log(JSON.stringify(products));
	// $( "#basket" ).load(window.location.href + " #basket" );

}

function showBasket() {
	const Http = new XMLHttpRequest();
	const url = 'http://localhost:9001/showBasket';
	Http.open("GET", url);
	var a = 1;
	Http.onreadystatechange = function(e) {
		if (Http.readyState == 4 && Http.status == 200) {
			data = JSON.parse(Http.responseText);
			data
					.forEach(function(item) {
						var table = document.createElement("tr");
						var name = document.createElement("td");
						var description = document.createElement("td");
						var price = document.createElement("td");
						var quantity = document.createElement("td");
						var num = document.createElement("input");
						var productPrice = document.createElement("td");
						var remove = document.createElement("span");
						var confirm = document.createElement("span");

						table.id = "bTable" + a;
						quantity.id = "quantity";
						num.id = "num";
						num.type = "number";
						num.value = "1";
						num.min = "1";
						num.max = "5";

						quantity.appendChild(num);

						confirm.id = "confirm";
						confirm.href = "#";
						// confirm.innerHTML = "Confirm";
						confirm.className = "glyphicon glyphicon-ok";
						confirm.style.display = "none";

						num.onchange = function() {
							confirm.style.display = "block";
						}

						confirm.onclick = function() {
							updateQuantity(item.basketid, num.value);

						}

						remove.id = item.basketid;
						remove.href = "#"
						remove.className = "glyphicon glyphicon-remove";
						remove.onclick = function() {
							deleteFromBasket(remove.id);
						}

						name.innerHTML = item.name;
						description.innerHTML = item.description;
						price.innerHTML = item.price;
						num.value = item.quantity;
						productPrice.innerHTML = parseInt(price.innerHTML)
								* parseInt(num.value);

						document.getElementById("bList").appendChild(table);
						document.getElementById("bList").appendChild(confirm);
						document.getElementById("bTable" + a).appendChild(name);
						document.getElementById("bTable" + a).appendChild(
								description);
						document.getElementById("bTable" + a)
								.appendChild(price);
						document.getElementById("bTable" + a).appendChild(
								quantity);
						document.getElementById("bTable" + a).appendChild(
								productPrice);
						document.getElementById("bTable" + a).appendChild(
								remove);

						a = a + 1;
					});
		}

	}
	Http.send();
}

function deleteFromBasket(bId) {
	$.ajax({
		url : 'http://localhost:9001/deleteFromBasket/' + bId,
		type : 'DELETE',
		success : function(result) {
			// window.location.reload();
			$("#basket").load(window.location.href + " #basket");
			showBasket();
		}
	});
}

function deleteProduct(pId) {
	$.ajax({
		url : 'http://localhost:9001/deleteProduct/' + pId,
		type : 'DELETE',
		success : function(result) {
			// window.location.reload();
			$("#basket").load(window.location.href + " #basket");
			window.location.reload();
		}
	});
}

function updateProduct(pId, n, d, p) {
	$.ajax({
		url : 'http://localhost:9001/updateProduct/' + pId + '/' + n + '/' + d
				+ '/' + p,
		type : 'PUT',
		success : function(result) {
			window.location.reload();
			// $( "#products" ).load(window.location.href + " #products" );

		}
	});

}

function updateQuantity(bId, q) {
	$.ajax({
		url : 'http://localhost:9001/updateQuantity/' + bId + '/' + q,
		type : 'PUT',
		success : function(result) {
			// window.location.reload();
			$("#basket").load(window.location.href + " #basket");
			showBasket();

		}
	});

}

// function updatePrice(pId, newPrice) {
// $.ajax({
// url : 'http://localhost:9001/updatePrice/' + pId + '/' + newPrice,
// type : 'PUT',
// success : function(result) {
// window.location.reload();
//
// }
// });
//
// }

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