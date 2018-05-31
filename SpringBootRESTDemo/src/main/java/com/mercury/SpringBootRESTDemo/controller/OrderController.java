package com.mercury.SpringBootRESTDemo.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mercury.SpringBootRESTDemo.bean.Order;
import com.mercury.SpringBootRESTDemo.dao.OrderDao;
import com.mercury.SpringBootRESTDemo.http.Response;
import com.mercury.SpringBootRESTDemo.service.OrderService;

@RestController
public class OrderController {
	
	@Autowired
	OrderDao orderDao;
	
	@Autowired
	OrderService orderService;

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@GetMapping("/orders")
	public List<Order> getOrders() {
		System.out.println("GetOrders is invoking!");
		return (List<Order>) orderDao.findAll();
	}
	
	@GetMapping("/orders/{id}")
	public Order getOrder(@PathVariable int id) {
		return orderDao.findById(id).get();
	}
	
	public void printOrders() {
		System.out.println(Arrays.asList((List<Order>) orderDao.findAll()));
	}
	
	@PostMapping("/orders")
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
	public Response postOrders(@RequestBody Order order) {
		return orderService.addOrder(order);
	}
	
	@PutMapping("/orders")
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
	public Response putOrders(@RequestBody Order order) {
		return orderService.editOrder(order);
	}
}
