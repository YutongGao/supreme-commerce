package com.mercury.SpringBootRESTDemo.dao;

import org.springframework.data.repository.CrudRepository;

import com.mercury.SpringBootRESTDemo.bean.Order;

public interface OrderDao  extends CrudRepository<Order, Integer>{

}
