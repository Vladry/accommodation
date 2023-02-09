package com.hub.accommodation.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
	
	 @Override
	 public void configureMessageBroker(MessageBrokerRegistry config) {
	  config
			  .setApplicationDestinationPrefixes("/app")
			  .enableSimpleBroker("/topic", "/queue");

//подключаем rabbitMq:
//	  config
//			  .setApplicationDestinationPrefixes("/app")
//			  .enableStompBrokerRelay("/topic", "/queue")
//			  .setSystemLogin("admin")
//			  .setSystemPasscode("admin")
//			  .setClientLogin("admin")
//			  .setClientPasscode("admin")
//			  .setRelayHost("localhost")
//			  .setRelayPort(61613);
	 }
	 
	 @Override
	 public void registerStompEndpoints(StompEndpointRegistry registry) {
	  registry.addEndpoint("/ws").setAllowedOriginPatterns("*");
	 }
	
}