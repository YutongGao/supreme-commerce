package com.mercury.SpringBootRESTDemo.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import com.mercury.SpringBootRESTDemo.bean.Product;
import com.mercury.SpringBootRESTDemo.dao.ProductDao;

@RunWith(SpringRunner.class)
public class ProductServiceTest {
	
	@TestConfiguration
	static class ProductServiceTestContextConfiguration {
		@MockBean
		ServletContext context;
		
		@Bean
		public ProductService productService() {
			return new ProductService();
		}
	}
	
	@Autowired
	ProductService productService;
	
	@MockBean
	ProductDao productDao;
	
	@Before
	public void setup() {
		List<Product> products = new ArrayList<>();
		products.add(new Product("Test", "Test", 88, 888));
		Mockito.when(productDao.findAll()).thenReturn(products);
	}

	@Test
	public void test() {
		List<Product> products = productService.getProducts();
		assertThat(products.get(0).getName()).isEqualTo("Test");
	}

}
