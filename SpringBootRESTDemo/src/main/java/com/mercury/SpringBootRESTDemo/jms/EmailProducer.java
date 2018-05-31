package com.mercury.SpringBootRESTDemo.jms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

@Component
public class EmailProducer {

	@Autowired
    private JmsTemplate jmsQueueTemplate;
	
	public void send(){
        jmsQueueTemplate.send("emailQueue", session -> {
            return session.createTextMessage("send message");
        });
    }

    public void convertAndSend(){
        jmsQueueTemplate.convertAndSend("emailQueue", "convert and send message");
    }
	
}
