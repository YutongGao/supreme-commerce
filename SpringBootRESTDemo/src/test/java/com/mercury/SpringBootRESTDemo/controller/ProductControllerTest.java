package com.mercury.SpringBootRESTDemo.controller;

import java.util.ArrayList;
import java.util.List;

import org.hamcrest.Matchers;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.mercury.SpringBootRESTDemo.bean.Product;
import com.mercury.SpringBootRESTDemo.dao.ProductDao;
import com.mercury.SpringBootRESTDemo.service.ProductService;

@RunWith(SpringRunner.class)
@WebMvcTest(value = {ProductController.class}, secure = false)
public class ProductControllerTest {
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	ProductDao productDao;

	@MockBean
	ProductService productService;

	@Test
	public void testGetAllProducts() throws Exception {
		List<Product> products = new ArrayList<>();
		products.add(new Product("Test", "Test", 88, 888));
		Mockito.when(productService.getProducts()).thenReturn(products);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/products").accept(MediaType.APPLICATION_JSON);
		mockMvc.perform(requestBuilder).andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(1)));
	}
}
