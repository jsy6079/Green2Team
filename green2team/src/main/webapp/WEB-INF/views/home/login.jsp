<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<style>
body {
	background-color: black; /* 전체 배경을 검정색으로 설정 */
	color: black; /* 글자 색상을 흰색으로 설정 */
}

.login {
	background-color: white; /* 폼 태그를 하얀색으로 설정 */
	padding: 20px; /* 내부 여백 설정 */
	border-radius: 10px; /* 폼 태그 모서리를 둥글게 만듦 */
	width: 300px; /* 폼의 너비 설정 */
	margin: 0 auto; /* 가운데 정렬 */
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); /* 그림자 효과 추가 */
}
</style>
</head>
<body>
	<div class="login">
    <form action="loginPrc" method="post" name="loginForm" id="asd">
        <h3>로그인</h3>
        아이디 : <input type="text" name="username" required><br>
        비밀번호 : <input type="password" name="password" required><br> 
        <input type="checkbox" id="rememberId" name="rememberId">아이디 저장 
        <input type="checkbox" id="remember-me" name="remember-me">자동 로그인<br>
        <a href="#">비밀번호 찾기</a>
        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
        <button type="submit" value="login">로그인</button>
    </form>
	<div>
		<p>소셜 로그인</p>
		<a href="/oauth2/authorization/google">구글</a>
		<a href="/oauth2/authorization/kakao">카카오</a>
		<p>
			아이디가 없으신가요?<a href="/home/newMember">가입하기</a>
		</p>
	</div>
	</div>
	
 		<script>
			document.getElementById('asd').addEventListener('submit', function(event) {
			    var rememberId = document.getElementById('rememberId').checked;
			    if (rememberId) {
			        var username = document.getElementsByName('username')[0].value;
			        localStorage.setItem('rememberedUsername', username);
			    } else {
			        localStorage.removeItem('rememberedUsername');
			    }
			});
			
		// 페이지 로드 시 저장된 아이디가 있는지 확인하여 입력 필드에 설정
		window.addEventListener('DOMContentLoaded', function() {
		    var rememberedUsername = localStorage.getItem('rememberedUsername');
		    if (rememberedUsername) {
		        document.getElementsByName('username')[0].value = rememberedUsername;
		        document.getElementById('rememberId').checked = true;
		    }
		});
		</script> 
		
		
		

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	<script type="text/javascript">
		const url = new URL(window.location.href);
		const urlParam = url.searchParams;
	if(urlParam.get('error') == null){
		
	}else if(urlParam.get('error') == 1){
		$("#asd").append("<p>"+urlParam.get('exception')+"</p>");
	}else if(urlParam.get('error') == 2){
		$("#asd").append("<p>"+urlParam.get('exception')+"</p>");
	}else if(urlParam.get('error') == 3){
		$("#asd").append("<p>"+urlParam.get('exception')+"</p>");
	}else if(urlParam.get('error') == 4){
		$("#asd").append("<p>"+urlParam.get('exception')+"</p>");
	}else if(urlParam.get('error') == 5){
		$("#asd").append("<p>"+urlParam.get('exception')+"</p>");
	}
	
	
	
		    // 웹 크립토 API를 사용하여 비밀번호를 해시화하는 함수
/* 		async function hashPassword(password) {
		    const encoder = new TextEncoder();
		    const data = encoder.encode(password);
		    const hash = await crypto.subtle.digest('SHA-256', data);
		    return hash;
		}
		 */
		    
		async function sha256(message) {
			const encoder = new TextEncoder();
			const data = encoder.encode(message);
			const hash = await crypto.subtle.digest('SHA-256', data);
		
		// 해시 값을 16진수 문자열로 변환
		return Array.from(new Uint8Array(hash))
			.map(byte => ('0' + byte.toString(16)).slice(-2))
			.join('');
		}

		    
		// 폼 제출 시 비밀번호를 해시화하여 전송
		$('form').submit(async function(e) {
		    e.preventDefault();
		    const password = $(this).find('input[name="password"]').val();
		    const hashedPassword = await sha256(password);
		    // 해시된 비밀번호를 필드에 설정
		    $(this).find('input[name="password"]').val(hashedPassword);
		    // 폼 제출
		    this.submit();
		});

	</script>
	
</body>
</html>