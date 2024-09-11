package com.maxima.desafio_maxima;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(org.springframework.web.servlet.config.annotation.CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // Replace with your URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH") // Allowed methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow sending credentials like cookies
    }
}
