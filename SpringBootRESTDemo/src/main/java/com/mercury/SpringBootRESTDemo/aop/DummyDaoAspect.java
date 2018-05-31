package com.mercury.SpringBootRESTDemo.aop;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.DeclareParents;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class DummyDaoAspect {
	@DeclareParents(value="com.mercury.SpringBootRESTDemo.aop.DummyDao",
			defaultImpl=DynamicDaoImpl.class)
	public static IDynamicDao dynamicDao;
}
