package com.green.service;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.stereotype.Service;

@Service
public class SHA256Example {

    public String main(String message) {
        String result = null;
        try {
            // SHA-256 해시 알고리즘을 사용하여 MessageDigest 객체 생성
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            
            // 입력 문자열을 바이트 배열로 변환하여 해시 계산
            byte[] hashBytes = digest.digest(message.getBytes());
            
            // 해시 값을 16진수 문자열로 변환
            StringBuilder hexString = new StringBuilder();
            for (byte hashByte : hashBytes) {
                String hex = Integer.toHexString(0xff & hashByte);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            
            
            System.out.println("SHA-256 해시: " + hexString.toString());
            result = hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return result;
    }
}