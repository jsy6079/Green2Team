package com.green.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.green.entity.EmailAuth;
import com.green.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	
	
	// 회원가입시 아이디 중복 검사
	@Query("SELECT COUNT(u) > 0 FROM UserEntity u WHERE u.username = :username")
	boolean existsByUsername(String username);
	
	// 회원가입시 이메일 중복 검사
	@Query("SELECT COUNT(u) > 0 FROM UserEntity u WHERE u.email = :email")
	boolean existsByEmail(String email);
	
	// 이메일 인증 여부
	@Query("SELECT COUNT(u) > 0 FROM UserEntity u WHERE u.email = :email AND u.emailAuth = true")
	boolean checkEmailAuth(String email);
	
	// 아이디, 비밀번호 찾기
	@Query("SELECT u FROM UserEntity u WHERE u.email = :email")
	UserEntity findByEmail(String email);
	
	// 로그인시 아이디 검사
	@Query("SELECT u FROM UserEntity u WHERE u.username = :username")
	UserEntity findByUsername(String username);
	
	@Modifying
    @Query("UPDATE UserEntity u SET u.password = :newPassword WHERE u.email = :email")
    void updatePasswordByEmail(String email, String newPassword);
	
	// 회원 ADMIN 유무
	@Query("SELECT COUNT(u) > 0 FROM UserEntity u WHERE u.role = :role")
	boolean existsByUserRole(String role);
}
