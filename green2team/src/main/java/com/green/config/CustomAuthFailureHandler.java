package com.green.config;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.green.exception.EmailAuthUncertifiedException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class CustomAuthFailureHandler extends SimpleUrlAuthenticationFailureHandler{

	/*
	 * HttpServletRequest : request 정보
	 * HttpServletResponse : Response에 대해 설정할 수 있는 변수
	 * AuthenticationException : 로그인 실패 시 예외에 대한 정보
	 */
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		
		String errorMessage;
		int error;
		
		if(exception instanceof EmailAuthUncertifiedException) {
			errorMessage = "인증되지 않은 계정입니다. 이메일 인증을 진행해주세요.";
			error = 11;
		}else if(exception instanceof BadCredentialsException) {
			errorMessage = "아이디 또는 비밀번호가 맞지 않습니다. 다시 확인해주세요.";
			error = 1;
		} else if (exception instanceof UsernameNotFoundException) {
			errorMessage = "아이디 또는 비밀번호가 맞지 않습니다. 다시 확인해주세요.";
			error = 2;
		} else if (exception instanceof InternalAuthenticationServiceException) {
			errorMessage = "내부 시스템 문제로 로그인 요청을 처리할 수 없습니다. 관리자에게 문의하세요. ";
			error = 3;
		} else if (exception instanceof AuthenticationCredentialsNotFoundException) {
			errorMessage = "인증 요청이 거부되었습니다. 관리자에게 문의하세요.";
			error = 4;
		} else {
			errorMessage = "알 수 없는 오류로 로그인 요청을 처리할 수 없습니다. 관리자에게 문의하세요.";
			error = 5;
		}
		
		
		
		Map<String, Object> errorResponse = new HashMap<>();
		
        errorResponse.put("success", false);
        errorResponse.put("error", error);
        errorResponse.put("message", errorMessage);
        
        

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");
        response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));

        
        
 // errorResponse = URLEncoder.encode(errorResponse, "UTF-8"); /* 한글 인코딩 깨진 문제 방지 */      
//		setDefaultFailureUrl(error+errorMessage);
//		super.onAuthenticationFailure(request, response, exception);
	}	
	
}

