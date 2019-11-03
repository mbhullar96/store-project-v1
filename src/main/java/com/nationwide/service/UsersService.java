package com.nationwide.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.nationwide.data.Users;
import com.nationwide.repository.UsersRepository;

@Service
public class UsersService {

	@Autowired
	private UsersRepository repo;
	
	public ArrayList<Users> findAll() {
		return repo.findAll();
	}	

	public String saveData(@RequestBody Users user) {
		repo.save(user);
		return "User added";	
	}

	public Users findByUserid(int uId) {
		return repo.findByUserid(uId);
	}	
	
	public Users findByLname(String LName) {
		return repo.findByLname(LName);
	}
	
	public Users findByEmail(String email) {
		return repo.findByEmail(email);
	}
	
	public String deleteUser(int uId) {

		Users u = findByUserid(uId);
		if(u == null) {
			return "User not found";
		}
		repo.delete(u);
		return "User deleted";
	}
	
	public String updateUser(int uId, String fn, String ln, String e) {

		Users user = findByUserid(uId);
		user.setFname(fn);
		user.setLname(ln);
		user.setEmail(e);
		repo.save(user);
		return "User updated";
	}
	
	public Boolean checkLogin(Users user) {
		Users savedUser = repo.findByEmail(user.getEmail());
		if(savedUser.getPassword().equals(user.getPassword())) {
			return true;
		} else {
			return false;
		}
	}
	

}
