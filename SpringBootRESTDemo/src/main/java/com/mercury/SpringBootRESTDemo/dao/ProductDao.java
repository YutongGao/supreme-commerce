package com.mercury.SpringBootRESTDemo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import com.mercury.SpringBootRESTDemo.bean.Product;

//@RestResource(path="products", rel="products")
public interface ProductDao extends JpaRepository<Product, Integer> {
	
	public List<Product> findByBrand(String brand);
	
	@Query("select max(p.price) from Product p")
	public int getMaxPrice();
	
	@Query("select p from Product p where p.stock > :stock")
	public List<Product> getProducstWithStock(@Param("stock") int stock);
}
