<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Navigation</title>
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

.content-box {
	height: 500px;
	background-color: #bfefff;
	padding: 20px;
}

.input-type {
	text-align: center;
}



.BoardBox {
	border: 1px solid;
	margin-bottom: 10px;
	padding: 10px;


}
.DigitalBox {
	margin-top: 20px; /* 간격 조절 */
	width: 70%; /* 너비 조절 */
	height: 700px;
	margin: 0 auto; /* 가운데 정렬 */
	background-color: #e0e0e0; /* 배경색 추가 */
	padding: 20px; /* 내부 여백 추가 */
}
.DigitalBox .Dbbox {
    display: inline-block;
    width: 50%; /* 각각의 div 요소를 반씩 차지하도록 설정합니다 */
    height: 700px;
    float: right; 
}

    .thumbnail-container {
        position: relative;
        display: inline-block;
    }

    .post-info {
        display: none;
        position: absolute;
        top: 0;
        left: 110px;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 10px;
        border: 1px solid #ccc;
        width: 200px;
    }

    .thumbnail-container:hover .post-info {
        display: block;
    }

    .post-details {
        margin-top: 10px; /* 제목과 내용 사이의 간격 조정 */
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
	
	<nav id ="home">
		<a href="/home/main" class="logo">Station-J</a><a href="#home">Home</a>
		<a href="#vrBoard">VR 아카이빙</a> <a href="#videoBoard">영상 게시판</a> <a href="#digitalBoard">디지털 조감도</a>
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

	<div class="content-box"></div>
	<div class="input-type">
		<form action="" method="post">
			<input type="text" name="searchText">
			<button type="submit">검색</button>
		</form>
		<P>"${id}"</P>
		<P>"${role}"</P>
	</div>


	<!-- VR 아카이빙 게시판 -->
	<div class="padding">
	<div id="vrBoard">
		<h3>VR 아카이빙</h3>
		<h5>
			법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를 제한하거나 인정하지 아니할 수
			있다. 대통령-국무총리-국무위원

			<!-- 버튼 클릭 시 VR 아카이빙 페이지(게시판)로 이동 -->
			<button type="button" onclick="location.href='/board/vrBoard'">See
				More</button>
		</h5>


		
		<c:forEach items="${recentThreeVrLists}" var="board">
        <div class="BoardBox">
            <div class="thumbnail-container">
                <a href="/board/vrBoardDetail?vrBoardNo=${board.vrBoardNo}">
                    <img src="<c:out value="${board.vrThumbnailImgUrl}" />" alt="Thumbnail" width="100" height="100">
                </a>
                <!-- 이미지 호버 시 추가 정보(조회수와 날짜) 표시 -->
                <div class="post-info">
				<p>
				    <!-- 날짜를 형식화하여 formattedDate 변수에 할당 -->
				    <c:set var="formattedDate">
				        <fmt:formatDate value="${board.vrRegdate}" pattern="yyyy.MM.dd" />
				    </c:set>
				    <!-- 형식화된 날짜를 출력 -->
				    <c:out value="${formattedDate}" />
				</p>
				<p>
				    조회수: <c:out value="${board.vrViews}" />
				</p>
                </div>
            </div>
            <!-- 해당 게시물의 제목과 내용 -->
            <div class="post-details">
                <p>
                    <c:out value="${fn:substring(board.vrBoardContent, 0, 30)}" />
                    <c:if test="${fn:length(board.vrBoardContent) > 30}">...</c:if>
                </p>
                <p>
                  조회수:
					<c:out value="${board.vrViews}" />
                </p>
            </div>
            <!-- 버튼 클릭 시 해당 게시물 상세 페이지로 이동해야함 -->
            <button type="button" onclick="location.href='/board/vrBoardDetail?vrBoardNo=${board.vrBoardNo}'">Read More</button>
        </div>
    </c:forEach>
</div>


	<!-- 영상 게시판 -->
<div id="videoBoard">
    <h3>영상 게시판</h3>
    <h5>
        법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를 제한하거나 인정하지 아니할 수 있다. 대통령-국무총리-국무위원
        <!-- 버튼 클릭 시 영상 게시판 페이지(게시판)로 이동해야함 -->
        <button type="button" onclick="location.href='/board/videoBoard'">See More</button>
    </h5>

   
    <c:forEach items="${videoLists}" var="board">
        <div class="BoardBox">
            <div class="thumbnail-container">
                <a href="/board/videoBoardDetail?videoBoardNo=${board.videoBoardNo}">
                    <img src="<c:out value="${board.videoThumbnailImgUrl}" />" alt="Thumbnail" width="100" height="100">
                </a>
                <!-- 이미지 호버 시 추가 정보(조회수와 날짜) 표시 -->
                <div class="post-info">
				<p>
				    <!-- 날짜를 형식화하여 formattedDate 변수에 할당 -->
				    <c:set var="formattedDate">
				        <fmt:formatDate value="${board.videoRegdate}" pattern="yyyy.MM.dd" />
				    </c:set>
				    <!-- 형식화된 날짜를 출력 -->
				    <c:out value="${formattedDate}" />
				</p>
				<p>
				    조회수: <c:out value="${board.videoViews}" />
				</p>
                </div>
            </div>
            <!-- 해당 게시물의 제목과 내용 -->
            <div class="post-details">
                <p>
                    <c:out value="${fn:substring(board.videoBoardContent, 0, 30)}" />
                    <c:if test="${fn:length(board.videoBoardContent) > 30}">...</c:if>
                </p>
                <p>
                  조회수:
					<c:out value="${board.videoViews}" />
                </p>
            </div>
            <!-- 버튼 클릭 시 해당 게시물 상세 페이지로 이동해야함 -->
            <button type="button" onclick="location.href='/board/videoBoardDetail?videoBoardNo=${board.videoBoardNo}'">Read More</button>
        </div>
    </c:forEach>
</div>
	
	<!-- 디지털 조감도 -->
	<div id="digitalBoard">
	<h3>디지털 조감도</h3>	
	<h5>법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여</h5>
	<h5>이를 제한하거나 인정하지 아니할 수 있다. 대통령 국모총리 국무의원</h5>
	<div class="DigitalBox">
    		<c:forEach items="${digitalLists}" var="board">
			<div>
	
				<a href="/board/digitalBoardDetail?digitalBoardNo=${board.digitalBoardNo}">
				<img src="<c:out value="${board.digitalViewerUrl}" />"
					alt="Thumbnail" width="100" height="100">
				</a>

				<div>
				<p><c:out value="${board.digitalBoardNo}" /></p>
				<p><c:out value="${board.digitalBoardTitle}" /></p>
					<p>
						<c:out value="${fn:substring(board.digitalBoardContent, 0, 30)}" />
						<c:if test="${fn:length(board.digitalBoardContent) > 30}">...</c:if>
					</p>
				</div>
				<hr>
			</div>
		</c:forEach>

	</div>
	</div>
	</div>
	<footer>
	<h3>@Incheon Metropolitan City. All rights reserved.</h3>
	</footer>

</body>
</html>