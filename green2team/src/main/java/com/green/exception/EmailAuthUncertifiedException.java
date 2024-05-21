package com.green.exception;

import org.springframework.security.authentication.InternalAuthenticationServiceException;

public class EmailAuthUncertifiedException extends InternalAuthenticationServiceException{

	public EmailAuthUncertifiedException(String msg) {
		super(msg);
	}
}
