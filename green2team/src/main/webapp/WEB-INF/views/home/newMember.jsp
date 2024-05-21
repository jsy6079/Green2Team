<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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

.newMember {
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
	<div class="newMember">
	<form action="" method="post" onsubmit="return validateForm()" name="joinForm" id="zxc">
		<h3>회원가입</h3>
		성 : <input type="text" name="firstName" size="5" required> 이름
		: <input type="text" name="lastName" size="8" required><br>
		아이디 : <input type="text" name="username" size="7" required><br>
		<!-- 비밀번호 : <input type="password" name="password" required><br>  -->
		비밀번호 : <input type="password" name="password" id="passwordInput" required><br> 
		<input type="checkbox" id="agree" name="agree">
		<a href="javascript:showTerms()">약관</a>에 동의합니다
			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
		<button type="submit">회원가입</button>
	</form>
	<form>
		<p>또는 소셜로 가입하기</p>
		<a href="/oauth2/authorization/google">구글</a>
		<a href="/oauth2/authorization/kakao">카카오</a>
		<p>
			이미 아이디가 있으신가요?<a href="/home/login">로그인</a>
		</p>
	</form>
	</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

	<script>

		function showTerms() {
			let popup = window.open("", "약관", "width=400,height=300");
			popup.document.write("<h3>약관</h3>");
			popup.document
					.write("<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>");
		}
		

		</script>
		
		

		<script type="text/javascript">
			const url = new URL(window.location.href);
			const urlParam = url.searchParams;
		if(urlParam.get('error') == null){
			
		}else if(urlParam.get('error') == 6){
			$("#zxc").append("<p>"+urlParam.get('exception')+"</p>");
		}
		
		
		
		
	    // 웹 크립토 API를 사용하여 비밀번호를 해시화하는 함수
	    async function hashPassword(password) {
	        const encoder = new TextEncoder();
	        const data = encoder.encode(password);
	        const hash = await crypto.subtle.digest('SHA-256', data);
	        return hash;
	    }

	    // 폼 제출 시 비밀번호를 해시화하여 전송
	    $('form').submit(async function(e) {
	        e.preventDefault();
			const result = true;

			var checkBox = document.getElementById("agree");
			if (!checkBox.checked) {
				alert("약관에 동의해주세요.");
				result = false;
			}
			
			var passwordInput = document.getElementById("passwordInput").value;
			var passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/; 
			if (!passwordPattern.test(passwordInput)) {
				alert("비밀번호는 특수문자를 포함해야합니다.");
			
				result =  false;
			}

			if(result){
				const password = $(this).find('input[name="password"]').val();
				const hashedPassword = await hashPassword(password);
				// 해시된 비밀번호를 필드에 설정
				$(this).find('input[name="password"]').val(new Uint8Array(hashedPassword));
				this.submit();
			}
	    });
	    
	    
		
		</script>

        




</body>
</html>