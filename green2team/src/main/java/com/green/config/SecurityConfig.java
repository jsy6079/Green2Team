package com.green.config;

import java.io.IOException;
import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.green.service.CustomOAuth2UserService;

import jakarta.servlet.DispatcherType;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	
//    public SecurityConfig(CustomOAuth2UserService customOAuth2UserService,UserDetailsService userDetailsService) {
//        this.customOAuth2UserService = customOAuth2UserService;
//        this.userDetailsService = userDetailsService;
//    }
	
	
    private final CustomOAuth2UserService customOAuth2UserService;
	
    private final CustomOAuth2SuccessHandler customOAuth2SuccessHandler;
	
	private final CustomAuthFailureHandler customAuthFailureHandler;
	
	private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;
	
	private final ServerProperties serverProperties;
	

	@Autowired
	private final UserDetailsService userDetailsService;
	
	
	  @Bean
	  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		  
		  
	http
		.csrf(csrf -> csrf.csrfTokenRepository(csrfTokenRepository()));
		  
		  
	http
		.cors(cros->cros.configurationSource(corsConfigurationSource())
			);


    http
            .httpBasic((basic) -> basic.disable());

    http
            .oauth2Login((oauth2) -> oauth2
            		.loginPage("/home/login")
//            		.defaultSuccessUrl("/")
            		.successHandler(customOAuth2SuccessHandler)
                    .userInfoEndpoint((userInfoEndpointConfig) ->
                            userInfoEndpointConfig.userService(customOAuth2UserService)));

	        http
            .authorizeHttpRequests((auth) -> auth
              .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                .requestMatchers("/**").permitAll()
                .requestMatchers("/page-chat").hasRole("ADMIN")
                .requestMatchers("manager/**").hasAnyRole("ADMIN", "MANAGER")
                .anyRequest().authenticated()
            );
//            
    

    

	        
	        http
	        .formLogin((auth) -> auth
	            .loginPage("http://localhost:3000/index-blog") // 리액트 애플리케이션의 로그인 페이지 URL 설정
	            .loginProcessingUrl("/api/login") // 로그인 처리 URL 설정
	            .successHandler(customAuthenticationSuccessHandler)
	            .failureHandler(customAuthFailureHandler)
	            .permitAll()
	        );
            
	        
	        
	        http.rememberMe(rememberMe -> 
	        rememberMe
	            .rememberMeParameter("remember-me") // default: remember-me, checkbox 등의 이름과 맞춰야함
	            .tokenValiditySeconds(3600) // 쿠키의 만료시간 설정(초), default: 14일
	            .alwaysRemember(false) // 사용자가 체크박스를 활성화하지 않아도 항상 실행, default: false
	            .userDetailsService(userDetailsService)
	            .useSecureCookie(true)
	            

	    );
              
		            
        return http.build();
    }
	  
	    @Bean
	    protected CorsConfigurationSource corsConfigurationSource() {
	    	CorsConfiguration corsConfiguration = new CorsConfiguration();
	    	corsConfiguration.addAllowedOrigin("*");
	    	corsConfiguration.addAllowedMethod("*");
	    	corsConfiguration.addAllowedHeader("*");
	    	
	    	UrlBasedCorsConfigurationSource sourse = new UrlBasedCorsConfigurationSource();
	    	sourse.registerCorsConfiguration("/**", corsConfiguration);
	    	
	    	
	    	return sourse;
	    }

	  
	    @Bean
	    public CsrfTokenRepository csrfTokenRepository() {
	        Session.Cookie cookie = serverProperties.getServlet().getSession().getCookie();
	        CookieCsrfTokenRepository tokenRepository = new CookieCsrfTokenRepository();
	        tokenRepository.setCookieCustomizer(c -> c.secure(cookie.getSecure())
	                .path(cookie.getPath())
	                .httpOnly(cookie.getHttpOnly())
	                .maxAge(Duration.ofMinutes(30)));
	        return tokenRepository;
	    }
	    
	    
	    
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }

}


