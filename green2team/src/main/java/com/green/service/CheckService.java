package com.green.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import com.green.exception.WrongAccessException;
import com.green.repository.UserRepository;
import com.green.vo.JoinDTO;



@Service
public class CheckService {
	@Autowired
	private UserRepository userRepository;

	@Transactional(readOnly = true)
	public Map<String,String> validateHandling(Errors errors){
		Map<String, String> validatorResult = new HashMap<>();
		
		for (FieldError error : errors.getFieldErrors()) {
			String validKeyName = String.format("valid_%s", error.getField());
			validatorResult.put(validKeyName, error.getDefaultMessage());
		}
		return validatorResult;
	}
	
	@Transactional(readOnly = true)
	public void checkUsernameDuplication(JoinDTO joinDTO) {
		boolean usernameDuplicate = userRepository.existsByUsername(joinDTO.getUsername());
		if (usernameDuplicate) {
			throw new WrongAccessException("");
		}
	}
	
	@Transactional(readOnly = true)
	public void checkEmailDuplication(JoinDTO joinDTO) {
		boolean emailDuplicate = userRepository.existsByEmail(joinDTO.getEmail());
		if (emailDuplicate) {
			throw new WrongAccessException("");
		}
	}
}
