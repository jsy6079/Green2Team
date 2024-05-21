<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
body {

	margin: 0 auto; /* 가운데 정렬 */

}

.padding{

    padding: 0 50px; /* 좌우 여백 추가 */
    font-family: Arial, sans-serif; /* 기본 글꼴 지정 */
}

nav {
	background-color: #333;
	overflow: hidden;
}

nav a {
	float: left;
	display: block;
	color: white;
	text-align: center;
	padding: 14px 20px;
	text-decoration: none;
}

nav a:hover {
	background-color: #ddd;
	color: black;
}

nav a.logo {
	font-size: 24px;
	font-weight: bold;
}

nav button {
	float: right;
	display: block;
	background-color: transparent;
	border: none;
	color: white;
	padding: 14px 20px;
	cursor: pointer;
}

nav button:hover {
	background-color: #ddd;
	color: black;
}

.input-type {
	text-align: center;
}

.board-content {
  text-align: center; /* 가운데 정렬 */
}

.board-content img {
  display: block; /* 이미지 블록화 */
  margin: 0 auto; /* 이미지 가운데 정렬 */
}

footer {
	background-color: #333;
	color: white;
	text-align: center;
	padding: 14px 20px;
	text-decoration: none;
}
</style>
</head>
<body>
	<nav>
		<a href="home/main" class="logo">Station-J</a> <a href="/home/main"></a>
		<c:if test="${id == 'anonymousUser'}">
			<button type="button" onclick="location.href='/home/newMember'">회원가입</button>
			<button type="button" onclick="location.href='/home/login'">로그인</button>
		</c:if>
		<c:if test="${id != 'anonymousUser'}">
		<form id="logoutForm" action="/logout" method="post">
		<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
    		<button type="submit">로그아웃</button>
		</form>
		</c:if>
	</nav>
	
			<div class="board-content">
				<p><c:out value="${board.videoBoardTitle}" /></p>
				<p><c:out value="${board.videoViewerUrl}" /></p>
					<p><c:out value="${board.videoBoardContent}"/></p>
				</div>
	
</body>
</html>