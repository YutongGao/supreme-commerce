package com.mercury.SpringBootRESTDemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mercury.SpringBootRESTDemo.bean.OrderProduct;

public interface OrderProductDao extends JpaRepository<OrderProduct, Integer>{

}
