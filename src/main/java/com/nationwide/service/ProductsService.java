package com.nationwide.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.nationwide.data.Products;
import com.nationwide.repository.ProductsRepository;

@Service
public class ProductsService {

	@Autowired
	private ProductsRepository repo;
	
	public ArrayList<Products> findAll() {
		return repo.findAll();
	}	

	public String saveData(@RequestBody Products product) {
		repo.save(product);
		return "Product added";	
	}

	public Products findByProductid(int pId) {
		return repo.findByProductid(pId);
	}
	
	public Products findByName(String name) {
		return repo.findByName(name);
	}
	
	public String deleteProduct(int pId) {

		Products p = findByProductid(pId);
		if(p == null) {
			return "Product not found";
		}
		repo.delete(p);
		return "Product deleted";
	}
	
	public String updateProduct(int pId, String n, String d, int p) {

		Products product = findByProductid(pId);
		product.setName(n);
		product.setDescription(d);
		product.setPrice(p);
//		product.setQuantity(q);
		repo.save(product);
		return "Product updated";
	}
	
	public String updatePrice(int pId, int p) {

		Products product = findByProductid(pId);
		product.setPrice(p);
		repo.save(product);
		return "Price updated";
	}
	
	public ArrayList<Products> findAllByPriceAsc() {
		return repo.findAllByOrderByPriceAsc();
	}	
	
	public ArrayList<Products> findAllByPriceDesc() {
		return repo.findAllByOrderByPriceDesc();
	}	
	
	public ArrayList<Products> findAllByNameAsc() {
		return repo.findAllByOrderByNameAsc();
	}
	
	public ArrayList<Products> findAllByNameDesc() {
		return repo.findAllByOrderByNameDesc();
	}
	

}
