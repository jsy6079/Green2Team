package com.green.service;

import java.security.NoSuchAlgorithmException;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.green.entity.UserEntity;
import com.green.exception.NotFoundException;
import com.green.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class GmailService {
	
	@Autowired
	private JavaMailSender emailSender;
	@Autowired
    private UserRepository userRepository;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	private SHA256Example sHA256Example;


	
	public String temporarilyPW() {
		int leftLimit = 48; // numeral '0'
		int rightLimit = 122; // letter 'z'
		int targetStringLength = 10;
		Random random = new Random();

		String generatedString = random.ints(leftLimit,rightLimit + 1)
		  .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
		  .limit(targetStringLength)
		  .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
		  .toString();
		
		return generatedString;
	}

	
	
	@Transactional
	public void temporaryPassword(String email) throws NotFoundException{
		UserEntity user = userRepository.findByEmail(email);
		if(user!=null) {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(email);
			message.setSubject("테스트 사이트 임시 ID/PW입니다.");
			String newOne = temporarilyPW();
			message.setText("아이디는 "+user.getUsername()+", 임시 비밀번호는 "+newOne+"입니다. 로그인후 안전한 비밀번호로 변경해주세요.");
			String hashed1 = sHA256Example.main(newOne);
			String hashed2 = bCryptPasswordEncoder.encode(hashed1);
			userRepository.updatePasswordByEmail(email, hashed2);
			emailSender.send(message);
			System.out.println("success");
		}else {
			throw new NotFoundException("");
		}
		
		
	}
	
	
}
