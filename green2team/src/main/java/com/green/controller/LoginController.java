package com.green.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.green.exception.EmailAuthUncertifiedException;
import com.green.exception.NotFoundException;
import com.green.service.GmailService;
import com.green.vo.CustomOAuth2User;
import com.green.vo.CustomUserDetails;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
//@RequestMapping("/api")
public class LoginController {
	
	@Autowired
	private GmailService gmailService;

	
	@GetMapping("/api/login")
    public ResponseEntity<Map<String, Object>> login() {
      
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "로그인 성공!");
        return ResponseEntity.ok(response);

    }
	
	@PostMapping("/api/user")
	public ResponseEntity<Map<String, String>> update(@AuthenticationPrincipal CustomUserDetails customUserDetails,
	                                                   @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
	    String username;
	    String role;

	    if (customUserDetails != null) {
	        username = customUserDetails.getUsername();
	        role = customUserDetails.getAuthorities().stream()
	                .findFirst()
	                .map(GrantedAuthority::getAuthority)
	                .orElse(null);
	    } else if (customOAuth2User != null) {
	        username = customOAuth2User.getUsername();
	        role = customOAuth2User.getAuthorities().stream()
	                .findFirst()
	                .map(GrantedAuthority::getAuthority)
	                .orElse(null);
	    } else {
	        username = "Anonymous";
	        role = "Anonymous";
	    }

	    Map<String, String> data = new HashMap<>();
	    data.put("username", username);
	    data.put("role", role);

	    return ResponseEntity.ok(data);
	}

    @GetMapping("/api/csrf")
    public CsrfToken csrf(CsrfToken csrfToken) {

        return csrfToken;
    }
	   
	   
	  	   
	   // 임시 비밀번호 발송 [비밀번호 찾기]
	   @PostMapping("api/newOne") 
	   public ResponseEntity<Map<String, Object>> newpw(String email) throws NotFoundException{
		   gmailService.temporaryPassword(email);
		   
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "로그인 성공!");
        return ResponseEntity.ok(response);
	   }
	
	   
	   
	   // 로그아웃
	   
	    @PostMapping("/api/logout")
	    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
	        
	        Cookie cookie = new Cookie("remember-me", null);
	        cookie.setPath("/");
	        cookie.setMaxAge(0); // 쿠키를 삭제하기 위해 만료일을 과거로 설정
	        response.addCookie(cookie);
	    	
	    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        if (authentication != null) {
	            // 현재 인증 정보가 있다면, 로그아웃 처리
	        	
	            new SecurityContextLogoutHandler().logout(request, response, authentication);
	        }
	        // 로그아웃 성공 후에 리다이렉트 등을 할 수 있습니다.
	        return ResponseEntity.ok().build();
	    }
	
	
	

}

