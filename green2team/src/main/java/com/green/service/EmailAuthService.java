package com.green.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import com.green.entity.EmailAuth;
import com.green.entity.UserEntity;
import com.green.exception.EmailAuthTokenNotFoundException;
import com.green.repository.EmailAuthRepository;
import com.green.repository.UserRepository;
import com.green.vo.EmailAuthRequestDto;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@EnableAsync
@RequiredArgsConstructor
public class EmailAuthService {

  private final JavaMailSender javaMailSender;
  private final EmailAuthRepository emailAuthRepository;
  private final UserRepository userRepository;
  
  @Autowired
  private EntityManager entityManager;

    @Async
    public void send(String email, String authToken) {
        SimpleMailMessage smm = new SimpleMailMessage();
        smm.setTo(email);
        smm.setSubject("회원가입 이메일 인증");
        smm.setText("http://localhost:8080/sign/confirm-email?email="+email+"&authToken="+authToken);

        javaMailSender.send(smm);
    }
    
    @Transactional
    public void expired() {
    	
    }
    
    @Transactional
    public String confirmEmail(EmailAuthRequestDto requestDto) {
    	
    	
        Optional<EmailAuth> optionalEmailAuth  = emailAuthRepository.findValidAuthByEmail(requestDto.getEmail(), requestDto.getAuthToken(), LocalDateTime.now());
        emailAuthRepository.usedLink(requestDto.getEmail());
        if(optionalEmailAuth .isPresent()) {
        	emailAuthRepository.deleteByEmailAndExpiredIsTrue(requestDto.getEmail());
        	UserEntity userEntity = userRepository.findByEmail(requestDto.getEmail());
            userEntity.emailVerifiedSuccess();

            return "true";
        }else if(userRepository.checkEmailAuth(requestDto.getEmail())){
        	return "wrong";
        }else {
    		emailAuthRepository.deleteByEmailAndExpiredIsTrue(requestDto.getEmail());
             
			EmailAuth emailAuth = EmailAuth.builder()
			         .email(requestDto.getEmail())
			         .authToken(UUID.randomUUID().toString())
			         .expired(false)
			         .build();
			 emailAuthRepository.save(emailAuth);

			 
			 entityManager.flush();
			 entityManager.clear();
			 
			 send(requestDto.getEmail(), emailAuth.getAuthToken());
			 return "false";
     	}
    }


}
