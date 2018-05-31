package com.mercury.SpringBootRESTDemo.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class OrderControllerAspect {

	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	@Pointcut("execution(* com.mercury.SpringBootRESTDemo.controller.OrderController.getOrders(..))")
	public void getOrders() {

	}

	@Before("getOrders()")
	public void logAfterGetOrders() {
		LOGGER.info("GetOrders is about to be invoked");
	}

	@After("getOrders()")
	public void logBeforeGetOrders() {
		LOGGER.info("GetOrders was invoked");
	}

	@Around("execution(* com.mercury.SpringBootRESTDemo.controller.OrderController.printOrders(..))")
	public void logAroundPrintOrders(ProceedingJoinPoint pjp) {
		try {
			LOGGER.info("Around: PrintOrders is about to be invoked");
			pjp.proceed();
			LOGGER.info("Around: PrintOrders was invoked");
		} catch (Throwable e) {
			LOGGER.info("Around: PrintOrders got exception.");
		}

	}

}
