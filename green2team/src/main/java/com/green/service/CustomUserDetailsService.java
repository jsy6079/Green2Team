package com.green.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.green.entity.UserEntity;
import com.green.exception.EmailAuthUncertifiedException;
import com.green.repository.UserRepository;
import com.green.vo.CustomUserDetails;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	// 시큐리티 로그인 서비스는 여기에 따로 만들거임
	
	@Autowired
	private UserRepository userRepository;
	
	
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, EmailAuthUncertifiedException {
	
	UserEntity userData = userRepository.findByUsername(username);

	if(userData != null) {
	
        // 사용자의 역할에 따라 리다이렉션 URL 결정
     
		if(!userData.getEmailAuth()) {
			throw new EmailAuthUncertifiedException("");
		}
		return new CustomUserDetails(userData);
		
	}
		
	throw new UsernameNotFoundException("");
		
	}

	
	
}

