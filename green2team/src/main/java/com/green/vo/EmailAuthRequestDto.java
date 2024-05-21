package com.green.vo;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailAuthRequestDto {

	private String email;
	private String authToken;
	private LocalDate time;
	
	
}
