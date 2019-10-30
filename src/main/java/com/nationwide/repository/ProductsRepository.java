package com.nationwide.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nationwide.data.Products;

public interface ProductsRepository extends JpaRepository<Products, Integer> {
	
	public ArrayList<Products> findAll();
	public Products findByName(String name);
	public Products findByProductid(int pId);
	public ArrayList<Products> findAllByOrderByPriceAsc();
	public ArrayList<Products> findAllByOrderByPriceDesc();
	public ArrayList<Products> findAllByOrderByNameAsc();
	public ArrayList<Products> findAllByOrderByNameDesc();
}
