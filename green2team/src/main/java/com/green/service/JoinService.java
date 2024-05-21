package com.green.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.green.entity.EmailAuth;
import com.green.entity.UserEntity;
import com.green.exception.AlreadyExisitonEmailException;
import com.green.exception.AlreadyExisitonMemberException;
import com.green.repository.EmailAuthRepository;
import com.green.repository.UserRepository;
import com.green.vo.JoinDTO;

import jakarta.transaction.Transactional;

@Service
public class JoinService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private EmailAuthRepository emailAuthRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private EmailAuthService emailAuthService;
	
	
	
	
	public void joinProcess(JoinDTO joinDTO) throws AlreadyExisitonMemberException, AlreadyExisitonEmailException {
		
//		db에 이미 동일한 id를 가진 회원이 존재하는지?
		boolean isUser = userRepository.existsByUsername(joinDTO.getUsername());
		boolean isEmail = userRepository.existsByEmail(joinDTO.getEmail());
		if(isUser) {
			throw new AlreadyExisitonMemberException("");
		}else if(isEmail) {
			throw new AlreadyExisitonEmailException("");
		}
		
				
		EmailAuth emailAuth = emailAuthRepository.save(
				EmailAuth.builder()
                    .email(joinDTO.getEmail())
                    .authToken(UUID.randomUUID().toString())
                    .expired(false)
                    .build());
		
		System.out.println("0000000000000000000000000000"+joinDTO.getPassword().toString());
		
		
		UserEntity data = new UserEntity();
		System.out.println(joinDTO.getPassword());
		data.setUsername(joinDTO.getUsername());
		data.setEmail(joinDTO.getEmail());
		data.setEmailAuth(false);
		data.setPassword(bCryptPasswordEncoder.encode(joinDTO.getPassword())); 
		data.setRole("ROLE_USER");
	 
	    
	    userRepository.save(data);
	    
	    emailAuthService.send(emailAuth.getEmail(), emailAuth.getAuthToken());
	}
	

	}



