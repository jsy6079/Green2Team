package com.green.config;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.green.vo.CustomUserDetails;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler { 
   
    
	@Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

    	CustomUserDetails user = (CustomUserDetails)authentication.getPrincipal();
    	
    	String username = user.getUsername();
        String role = null;
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        for (GrantedAuthority authority : authorities) {
            role = authority.getAuthority();
        }
        System.out.println("0000000000000000000");
        Map<String, String> data = new HashMap<>();
        data.put("username", username);
        data.put("role", role);

        // JSON 객체를 문자열로 변환
        ObjectMapper mapper = new ObjectMapper();
        String jsonData = mapper.writeValueAsString(data);

        // 응답 헤더 설정
        response.setContentType("application/json");
        response.setContentLength(jsonData.length());

        // 응답 바디에 JSON 데이터 쓰기
        PrintWriter writer = response.getWriter();
        writer.write(jsonData);
        writer.flush();
        writer.close();
    }
}

