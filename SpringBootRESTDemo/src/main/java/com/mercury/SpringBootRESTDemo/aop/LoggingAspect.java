package com.mercury.SpringBootRESTDemo.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {
	
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	@Pointcut("execution(* com.mercury.SpringBootRESTDemo.controller.*.*(..))")
	public void controllerMethods() {
		
	}
	
	@After("controllerMethods()")
	public void logControllerMethods(JoinPoint jp) {
		LOGGER.info(jp.getSignature().getName() + " was invoked!");
	}
}
