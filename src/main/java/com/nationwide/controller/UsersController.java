package com.nationwide.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nationwide.data.Users;
import com.nationwide.service.UsersService;

@RestController
public class UsersController {
	
	@Autowired
	private UsersService service;
	
	@GetMapping("/showUsers")
	public ArrayList<Users> showUsers(){
		return service.findAll();
	}
	
	@PostMapping("/addUser")
	public String saveData(@RequestBody Users user) {
		return service.saveData(user);
	}
	
	@GetMapping("/findByUserId/{uId}")
	public Users findByUserid(@PathVariable int uId) {
		return service.findByUserid(uId);
	}
	
	@GetMapping("/findByLastName/{lName}")
	public Users findByLastName(@PathVariable String lName) {
		return service.findByLname(lName);
	}
	
	@GetMapping("/findByEmail/{email}")
	public Users findByEmail(@PathVariable String email) {
		return service.findByEmail(email);
	}
	
	@DeleteMapping("/deleteUser/{uId}")
	public String deleteUser(@PathVariable int uId) {
		return service.deleteUser(uId);
	}
	
	@PutMapping("/updateUser/{uId}/{fn}/{ln}/{e}")
	public String updateUser(@PathVariable int uId, @PathVariable String fn, @PathVariable String ln, @PathVariable String e) {
		return service.updateUser(uId, fn, ln, e);
	}
	
	

}
