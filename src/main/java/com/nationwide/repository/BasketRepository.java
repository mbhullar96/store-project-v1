package com.nationwide.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nationwide.data.Basket;

public interface BasketRepository extends JpaRepository<Basket, Integer> {
	
	public ArrayList<Basket> findAll();

	public Basket findByBasketid(int bId);

}
