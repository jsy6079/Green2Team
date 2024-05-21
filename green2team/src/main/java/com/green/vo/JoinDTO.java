package com.green.vo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JoinDTO { // 회원가입시 필요한 VO객체
	
	@NotBlank(message = "아이디가 비어있습니다.")
	private String username;
	@NotBlank(message = "이메일이 비어있습니다")
	@Pattern(regexp = "^(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$", message = "이메일 형식이 올바르지 않습니다.")
	private String email;
	private Boolean emailAuth;
	@NotBlank(message = "비밀번호가 비어있습니다")
	@Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$)", message = "비밀번호는 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
	private String password;
	private String role;
}
