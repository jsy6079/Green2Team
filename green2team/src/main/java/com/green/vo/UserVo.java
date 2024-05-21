package com.green.vo;

import java.time.LocalDate;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserVo {
	

	private Long id;
	private String username;
	private String email;
	private LocalDate join_date = LocalDate.now();
	private String role;

	
	
}
