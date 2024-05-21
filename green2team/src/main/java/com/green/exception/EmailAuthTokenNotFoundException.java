package com.green.exception;

public class EmailAuthTokenNotFoundException extends RuntimeException {

	public EmailAuthTokenNotFoundException(String msg) {
		super(msg);
	}
}
