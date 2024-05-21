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
	margin: 0;
	font-family: Arial, sans-serif;
}

nav {
	background-color: #333;
	overflow: hidden;
	height: 300px;
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

nav div.title {
	text-align: center;
	color: white;
	padding: 80px;
}

.boardTitle {
	text-align: center; /* 텍스트를 가운데 정렬합니다. */
}

.text {
	background-color: white;
	padding: 10px;
	display: inline-block;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
	border-radius: 15px;
}
</style>
</head>
<body>
	<nav>
		<a href="/home/main" class="logo">로고이미지</a> <a href="/home/main">Home</a>
		<a href="#">VR 아카이빙</a> <a href="#">영상 게시판</a> <a href="#">디지털 조감도</a>
		<c:if test="${id == 'anonymousUser'}">
			<button type="button" onclick="location.href='/home/newMember'">회원가입</button>
			<button type="button" onclick="location.href='/home/login'">로그인</button>
		</c:if>
		<c:if test="${id != 'anonymousUser'}">
		<form id="logoutForm" action="/logout" method="post">
		<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
    		<!-- <input type="submit" value="로그아웃"> -->
    		<button type="submit">로그아웃</button>
		</form>
		</c:if>

	</nav>
	
        <h3>해당 검색 결과입니다.</h3>
        <c:forEach items="${searchResults}" var="video">
            <p>${video.videoBoardNo}</p>
            <p>${video.videoBoardTitle}</p>
            <p>${video.videoBoardContent}</p>
            <p><img src="<c:out value="${board.videoThumbnailImgUrl}" />"
			alt="Thumbnail" width="100" height="100"></p>
            <p>${video.videoViewerUrl}</p>
            <p>${video.videoViews}</p>
            <p>${video.videoWriter}</p>
            <p>${video.videoRegdate}</p>
            <p>${video.videoUpdatedate}</p>
            <hr>
        </c:forEach> 
        
</body>
</html>