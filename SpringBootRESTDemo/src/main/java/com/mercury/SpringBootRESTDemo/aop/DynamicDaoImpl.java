package com.mercury.SpringBootRESTDemo.aop;

public class DynamicDaoImpl implements IDynamicDao{

	@Override
	public void sayHello() {
		System.out.println("Hello from DynamicDao!");
	}
	
}
