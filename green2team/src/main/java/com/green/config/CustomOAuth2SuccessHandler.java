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
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		
		
    if (authentication.getAuthorities().stream().anyMatch(a -> 
    a.getAuthority().equals("ROLE_ADMIN") ||
    a.getAuthority().equals("ROLE_BOARD") ||
    a.getAuthority().equals("ROLE_TRADER"))) {

    	response.sendRedirect("http://localhost:3000/page-chat");
   } else {

	   response.sendRedirect("http://localhost:3000/index-blog");
   }
        
        
    }
		
	}


