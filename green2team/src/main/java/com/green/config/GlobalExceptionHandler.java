package com.green.config;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.green.exception.AlreadyExisitonEmailException;
import com.green.exception.AlreadyExisitonMemberException;
import com.green.exception.EmailAuthTokenNotFoundException;
import com.green.exception.NotFoundException;
import com.green.exception.WrongAccessException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@ControllerAdvice
public class GlobalExceptionHandler{

	
	@ExceptionHandler(WrongAccessException.class)
	 public void handleWrongAccessException(HttpServletRequest request, HttpServletResponse response,
			 WrongAccessException exception) throws IOException, ServletException {
	        if (exception instanceof WrongAccessException) {
	        	int error = 1;
	        
           Map<String, Object> errorResponse = new HashMap<>();
   		
           errorResponse.put("success", false);
           errorResponse.put("error", error);
           
           response.setStatus(HttpStatus.UNAUTHORIZED.value());
           response.setContentType("application/json");
           response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
	    }
	}
	
	@ExceptionHandler(AlreadyExisitonMemberException.class)
    public void handleAlreadyExisitonMemberException(HttpServletRequest request, HttpServletResponse response,
    		AlreadyExisitonMemberException exception) throws IOException, ServletException {
        String errorMessage = null;
        if (exception instanceof AlreadyExisitonMemberException) {
            errorMessage = "아이디가 중복되었습니다.";
        }

        errorMessage = URLEncoder.encode(errorMessage, "UTF-8"); /* 한글 인코딩 깨진 문제 방지 */
        response.sendRedirect("/home/newMember?error=6&exception=" + errorMessage);
    }
	
	@ExceptionHandler(NotFoundException.class)
	 public void handleNotFoundException(HttpServletRequest request, HttpServletResponse response,
			 NotFoundException exception) throws IOException, ServletException {
	        String errorMessage = null;
	        if (exception instanceof NotFoundException) {
//	            errorMessage = "입력된 이메일이 존재하지 않습니다.";
	        	int error = 21;


	        
            Map<String, Object> errorResponse = new HashMap<>();
    		
            errorResponse.put("success", false);
            errorResponse.put("error", error);
//            errorResponse.put("message", errorMessage);
            
            

            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType("application/json");
            response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
	    }
	}
	
	@ExceptionHandler(AlreadyExisitonEmailException.class)
    public void handleAlreadyExisitonEmailException(HttpServletRequest request, HttpServletResponse response,
    		AlreadyExisitonEmailException exception) throws IOException, ServletException {
        String errorMessage = null;
        if (exception instanceof AlreadyExisitonEmailException) {
            errorMessage = "이미 가입된 이메일입니다.";
        }

        errorMessage = URLEncoder.encode(errorMessage, "UTF-8"); /* 한글 인코딩 깨진 문제 방지 */
        response.sendRedirect("/home/newMember?error=8&exception=" + errorMessage);
    }
	
	
	@ExceptionHandler(EmailAuthTokenNotFoundException.class)
    public void handleEmailAuthTokenNotFountException(HttpServletRequest request, HttpServletResponse response,
    		EmailAuthTokenNotFoundException exception) throws IOException, ServletException {
        String errorMessage = null;
        if (exception instanceof EmailAuthTokenNotFoundException) {
            System.out.println("이메일 인증 유효시간이 끝났습니다.");
        }
        
    }
	
	
	
}