package com.mercury.SpringBootRESTDemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mercury.SpringBootRESTDemo.bean.User;

//@RestResource(path="users", rel="users")
public interface UserDao  extends JpaRepository<User, Integer>{
	User findByUsername(String username);
}
