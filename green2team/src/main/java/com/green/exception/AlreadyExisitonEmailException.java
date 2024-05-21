package com.green.exception;

public class AlreadyExisitonEmailException extends RuntimeException {

	public AlreadyExisitonEmailException(String msg) {
		super(msg);
	}
	
}
