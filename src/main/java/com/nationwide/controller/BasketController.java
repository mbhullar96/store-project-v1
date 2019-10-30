package com.nationwide.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nationwide.data.Basket;
import com.nationwide.service.BasketService;

@RestController
public class BasketController {
	
	@Autowired
	private BasketService service;
	
	@GetMapping("/showBasket")
	public ArrayList<Basket> showAll() {
		return service.findAll();
	}
	
	@PostMapping("/addToBasket")
	public String saveData(@RequestBody Basket basket) {
		return service.saveToBasket(basket);
	}
	
	@DeleteMapping("/deleteFromBasket/{bId}")
	public String delete(@PathVariable int bId) {
		return service.deleteFromBasket(bId);
	}
}
