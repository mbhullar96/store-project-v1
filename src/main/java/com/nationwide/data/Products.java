package com.nationwide.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Products {
	
	@Id
	@GeneratedValue
	private int productid;
	private String name;
	private String category;
	private double price;
	private int quantity;
	
//	public Products() {}
//	
//	public Products(int pId, String n, String d, int p, int q) {
//		productid = pId;
//		name = n;
//		description = d;
//		price = p;
//		quantity = q;
//	}
		
	public int getProductid() {
		return productid;
	}
	public void setProductid(int productid) {
		this.productid = productid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
}
