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

import com.nationwide.data.Products;
import com.nationwide.service.ProductsService;

@RestController
public class ProductsController {
	
	@Autowired
	private ProductsService productService;
	
	@GetMapping("/showProducts")
	public ArrayList<Products> showAll() {
		return productService.findAll();
	}
	
	@PostMapping("/addProduct")
	public String saveData(@RequestBody Products product) {
		return productService.saveData(product);
	}
	
	@GetMapping("/findByProductId/{pId}")
	public Products findByProductid(@PathVariable int pId) {
		return productService.findByProductid(pId);
	}
	
	@GetMapping("/findByName/{name}")
	public Products findByName(@PathVariable String name) {
		return productService.findByName(name);
	}
	
	@DeleteMapping("/deleteProduct/{pId}")
	public String deleteProduct(@PathVariable int pId) {
		return productService.deleteProduct(pId);
	}
	
	@PutMapping("/updateProduct/{pId}/{n}/{d}/{p}/{q}")
	public String updateProduct(@PathVariable int pId, @PathVariable String n, @PathVariable String d, @PathVariable int p, @PathVariable int q) {
		return productService.updateProduct(pId, n, d, p, q);
	}
	
	@GetMapping("/priceAsc")
	public ArrayList<Products> priceAsc() {
		return productService.findAllByPriceAsc();
	}
	
	@GetMapping("/priceDesc")
	public ArrayList<Products> priceDesc() {
		return productService.findAllByPriceDesc();
	}
	
	@GetMapping("/nameAsc")
	public ArrayList<Products> nameAsc() {
		return productService.findAllByNameAsc();
	}
	
	@GetMapping("/nameDesc")
	public ArrayList<Products> nameDesc() {
		return productService.findAllByNameDesc();
	}
	
	
	
//	@RequestMapping("/")
//	public String viewHome(Model model) {
//		model.addAttribute("productsList", productService.findAll());
//		return "index";
//	}
	
//	@PutMapping("/updateProduct/{pId}/{name}/{description}/{price}/{quantity}")
//	public String updateProduct(@PathVariable int pId, @PathVariable String name, @PathVariable String description, @PathVariable int price, @PathVariable int quantity) {
//		return service.updateProduct(name, description, price, quantity);
//	}
	
//	@RequestMapping(method = RequestMethod.GET)
//	public String index(ModelMap modelMap) {
//		modelMap.put("products", repo.findAll());
//		return "products/index";
//	}
	
//	@RequestMapping(method = RequestMethod.GET)
//	public ModelAndView index(ModelAndView model) {
//		model.addObject("products", repo.findAll());
//		model.setViewName("products/index");
//		return model;
//	}



	
}
