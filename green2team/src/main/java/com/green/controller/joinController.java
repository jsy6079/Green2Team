package com.green.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.green.exception.AuthChkFalseException;
import com.green.exception.AuthChkTrueException;
import com.green.exception.WrongAccessException;
import com.green.repository.UserRepository;
import com.green.service.CheckService;
import com.green.service.EmailAuthService;
import com.green.service.JoinService;
import com.green.vo.EmailAuthRequestDto;
import com.green.vo.JoinDTO;

import jakarta.validation.Valid;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class joinController {


    @Autowired
    private JoinService joinService;
    
    @Autowired
    private CheckService checkService;
    
    @Autowired
    private EmailAuthService EmailAuthService;
    
    @Autowired
    private UserRepository userRepository;

    
	
    @PostMapping("/api/id") // 회원가입 id 중복체크
	public ResponseEntity<Map<String, Object>> chkId(@RequestBody Map<String, String> requestBody) throws AuthChkFalseException, AuthChkTrueException{
		String username = requestBody.get("username");
    	System.out.println(username);
    	      
            
    	
    	if(userRepository.existsByUsername(username)) {
    		Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "로그인 성공!");
            return ResponseEntity.ok(response);
    	}else {
    		Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "로그인 성공!");
            return ResponseEntity.ok(response);
    	}
	
		

	}
    
    
    @PostMapping("/api/email") // 회원가입 id 중복체크
	public ResponseEntity<Map<String, Object>> chkEmail(@RequestBody Map<String, String> requestBody) throws AuthChkFalseException, AuthChkTrueException{
		String email = requestBody.get("email");
    	System.out.println(email);

    	if(userRepository.existsByEmail(email)) {
    		Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "로그인 성공!");
            return ResponseEntity.ok(response);
    	}else {
    		Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "로그인 성공!");
            return ResponseEntity.ok(response);
    	}
	
	}
    
 
    
	@PostMapping("/api/newMember") // 회원가입 버튼 누르면 DB에 저장
	public ResponseEntity<String> newMember(@Valid JoinDTO joinDTO, Errors errors) throws WrongAccessException {
		if(errors.hasErrors()) {
			/* 회원가입 실패시 입력 데이터 값을 유지 */
			throw new WrongAccessException("");
		}
		checkService.checkUsernameDuplication(joinDTO);
		checkService.checkEmailDuplication(joinDTO);
		
		joinService.joinProcess(joinDTO);
	
		return ResponseEntity.ok("Member successfully created");

	}
	
	
	
	@GetMapping("/sign/confirm-email")
	public String confirnmEmail(EmailAuthRequestDto emailAuthRequestDto) throws UnsupportedEncodingException {
		String link = EmailAuthService.confirmEmail(emailAuthRequestDto);
		if(link=="true") {
			return "인증되었습니다. 홈페이지에서 로그인을 해주세요.";
		}else if(link == "false"){

			return "링크가 만료되었습니다. 재발송된 링크로 인증해주세요.";
		}else {
			return "만료된 링크입니다.";
		}
	}
	


}