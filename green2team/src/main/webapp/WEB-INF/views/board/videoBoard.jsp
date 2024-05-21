<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Video Board</title>

<!-- CSS -->
<link rel="stylesheet" href="/css/board/videoBoard.css">


<!-- SCRIPT -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="/jquery/jquery-3.7.1.js"></script>
<script src="/js/board/videoBoard.js" charset="utf-8"></script>
</head>
<body>

	<!-- navigation -->
	<nav>
		<a href="/home/main" class="logo">로고이미지</a>
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

		<div class="title">
			<h2>영상 게시판</h2>
			<h5>
				법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 <br> 이를 제한하거나
				인정하지 아니할 수 없다. 대통렁-국무총리-국무위원
			</h5>
		</div>
	</nav>

	<!-- boardTitle -->
	<div class="boardTitle">
		<div class="text">Station-J 동영상</div>
	</div>

	<!-- 영상 게시판 -->
	<div id="postContainer">
		<c:forEach items="${videoLists}" var="board">
			<div class="BoardBox">
			
			<div class="thumbnail-container">
				<!-- 썸네일 -->
			<img src="<c:out value="${board.videoThumbnailImgUrl}" />"
			alt="Thumbnail" width="100" height="100">
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
					
					
					
					
				<!-- 제목 -->
				<p>
					<c:out value="${board.videoBoardTitle}" />
				</p>
				<!-- 내용 -->
				<p>
					<c:out value="${fn:substring(board.videoBoardContent, 0, 30)}" />
					<c:if test="${fn:length(board.videoBoardContent) > 30}">...</c:if>
				</p>
				<!-- 조회수 -->
				<p>	조회수:
					<c:out value="${board.videoViews}" />
				</p>
				<!-- 더보기 -->
				<!-- 버튼 클릭 시 해당 게시물 상세 페이지로 이동해야함 -->
				<button type="button" onclick="location.href='/board/videoBoardDetail?videoBoardNo=${board.videoBoardNo}'">Read More</button>
			</div>
		</c:forEach>

		<!-- 페이징 -->
		<div>
			<c:if test="${page.prev }">
				<!--  이전 섹션이 있는가? -->
				<a class="pageBtn" href="${page.startPage-1}">이전</a>
			</c:if>

			<c:forEach var="num" begin="${page.startPage}" end="${page.endPage}"
				step="1">
				<a class="pageBtn" href="${num}"> ${num} </a>
			</c:forEach>

			<c:if test="${page.next }">
				<!--  다음 섹션이 있는가? -->
				<a class="pageBtn" href="${page.endPage+1}">다음</a>
			</c:if>
		</div>

		<form action="videoBoard" id="actionForm" method="get">
			<input type="hidden" name="pageNum" value="${page.cv.pageNum}">
			<input type="hidden" name="amount" value="${page.cv.amount}">
		</form>
	</div>

	<!-- footer(추가 예정) -->
	<footer>
		<p class="copyright">@Incheon Metropolitan City. All rights
			reserved.</p>
	</footer>

</body>
</html>
