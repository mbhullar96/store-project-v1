package com.nationwide.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nationwide.data.Users;

public interface UsersRepository extends JpaRepository<Users, Integer> {
	
	public ArrayList<Users> findAll();
	public Users findByUserid(int uId);
	public Users findByLname(String lName);
	public Users findByEmail(String email);
}
