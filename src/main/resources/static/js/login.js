function login() {
	const Http = new XMLHttpRequest();
	const url = 'http://localhost:8080/showUsers';
	Http.open("GET", url);
	Http.onreadystatechange = function(e) {
		if (Http.readyState == 4) {	
			data = JSON.parse(Http.responseText);
			data.forEach(function(item) {
				var email1 = document.getElementById("email").value;
				var password1 = document.getElementById("password").value;
				console.log(email1);
				console.log(password1);
				console.log(item.email);
				console.log(item.password);
				if((email1 == item.email) && (password1 == item.password)) {
					alert("Login Successful");
					location.replace("index.html");
				} else {
					alert("Error");
					return false;
					
				}
			});
		}
	}
	Http.send();
}