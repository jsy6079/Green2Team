package com.green.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.green.entity.EmailAuth;

public interface EmailAuthRepository extends JpaRepository<EmailAuth, Integer> {
	
	// 이메일 인증
	@Query("SELECT ea FROM EmailAuth ea WHERE ea.email = :email AND ea.authToken = :authToken AND ea.expireDate >= :currentTime AND ea.expired = false")
	Optional<EmailAuth> findValidAuthByEmail(String email, String authToken, LocalDateTime currentTime);
	
	void deleteByEmailAndExpiredIsTrue(String email);
	
	 
	@Modifying
    @Query("UPDATE EmailAuth ea SET ea.expired = true WHERE ea.email = :email AND ea.expired = false")
    void usedLink(String email);
	 
	 
}
