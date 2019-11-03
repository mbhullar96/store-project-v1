package com.nationwide.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.nationwide.data.Basket;
import com.nationwide.repository.BasketRepository;

@Service
public class BasketService {

	@Autowired
	private BasketRepository repo;

	public ArrayList<Basket> findAll() {
		return repo.findAll();
	}	
	
	public String saveToBasket(@RequestBody Basket basket) {
		repo.save(basket);
		return "Product added";	
	}
	
	public Basket findByBasketid(int bId) {
		return repo.findByBasketid(bId);
	}	
	
	public String deleteFromBasket(int bId) {

		Basket b = findByBasketid(bId);
		if(b == null) {
			return "Product not found";
		}
		repo.delete(b);
		return "Product deleted";
	}
	
	public String updateQuantity(int bId, int q) {

		Basket basket = findByBasketid(bId);
		basket.setQuantity(q);
		repo.save(basket);
		return "Quantity updated";
	}

}
