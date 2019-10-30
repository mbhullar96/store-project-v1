//function checkValues() {
//	var fname = document.getElementById("fname");
//	var lname = document.getElementById("lname");
//	var email = document.getElementById("email");
//	var password = document.getElementById("password");
//	var password1 = document.getElementById("password1");
//
//	if (fname.value == "") {
//		alert("First name is missing");
//		return false;
//	} else {
//		var regex = /^[a-zA-Z]+$/;
//		if (!fname.value.match(regex)) {
//			alert("Name must be letters only");
//			return false;
//		}
//	}
//	
//	if (lname.value == "") {
//		alert("Last name is missing");
//		return false;
//	} else {
//		var regex = /^[a-zA-Z]+$/;
//		if (!lname.value.match(regex)) {
//			alert("Name must be letters only");
//			return false;
//		}
//	}
//	
//	if(email.value == "") {
//		alert("Email is missing");
//		return false
//	} else {
//		var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//		if(!email.value.match(emailFormat)) {
//			alert("Email is invalid");
//			return false;
//		}
//	}
//
//	if (password.value == "") {
//		alert("Password is missing");
//		return false;
//	} else {
//		var upperCase = /[A-Z]/g;
//		var numbers = /[0-9]/g;
//		if (password.value.length <= 7) {
//			console.log(password.value);
//			alert("Password must be atleast 8 characters");
//			return false;
//		}
//
//		if (!password.value.match(upperCase)) {
//			console.log(password.value);
//			alert("Password must contain atleast one uppercase letter");
//			return false;
//		}
//		
//		if (!password.value.match(numbers)) {
//			alert("Password must contain atleast one number");
//			return false;
//		}
//	}
//	
//	if (password1.value == "") {
//		alert("Confirm password");
//		return false;
//	} else {
//		if(password.value != password1.value) 
//			alert("Passwords do not match");
//			return false;
//	}
//	return true;
//}

function addUsers() {
	const Http = new XMLHttpRequest();
	const url = 'http://localhost:8080/addUser';
	Http.open("POST", url, true);
	Http.setRequestHeader("Content-Type", "application/json");
	const user = {
		'fname' : document.querySelector('#fname').value,
		'lname' : document.querySelector('#lname').value,
		'email' : document.querySelector('#email').value,
		'password' : document.querySelector('#password').value
	}

	Http.onreadystatechange = function(ev) {
		console.log("Here");
	}

	Http.send(JSON.stringify(user));

}