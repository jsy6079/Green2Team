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
		<a href="/home/main" class="logo">�ΰ��̹���</a>
		<c:if test="${id == 'anonymousUser'}">
			<button type="button" onclick="location.href='/home/newMember'">ȸ������</button>
			<button type="button" onclick="location.href='/home/login'">�α���</button>
		</c:if>
		<c:if test="${id != 'anonymousUser'}">
		<form id="logoutForm" action="/logout" method="post">
		<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
    		<!-- <input type="submit" value="�α׾ƿ�"> -->
    		<button type="submit">�α׾ƿ�</button>
		</form>
		</c:if>

		<div class="title">
			<h2>���� �Խ���</h2>
			<h5>
				������ ���ϴ� �ֿ�������ü�� �����ϴ� �ٷ����� ��ü�ൿ���� ������ ���ϴ� �ٿ� ���Ͽ� <br> �̸� �����ϰų�
				�������� �ƴ��� �� ����. ���뷷-�����Ѹ�-��������
			</h5>
		</div>
	</nav>

	<!-- boardTitle -->
	<div class="boardTitle">
		<div class="text">Station-J ������</div>
	</div>

	<!-- ���� �Խ��� -->
	<div id="postContainer">
		<c:forEach items="${videoLists}" var="board">
			<div class="BoardBox">
			
			<div class="thumbnail-container">
				<!-- ����� -->
			<img src="<c:out value="${board.videoThumbnailImgUrl}" />"
			alt="Thumbnail" width="100" height="100">
			<div class="post-info">
			<p>
			<!-- ��¥�� ����ȭ�Ͽ� formattedDate ������ �Ҵ� -->
			<c:set var="formattedDate">
			<fmt:formatDate value="${board.videoRegdate}" pattern="yyyy.MM.dd" />
			</c:set>
			<!-- ����ȭ�� ��¥�� ��� -->
			<c:out value="${formattedDate}" />
			</p>
			<p>
				��ȸ��: <c:out value="${board.videoViews}" />
			</p>
            </div>
            </div>
					
					
					
					
				<!-- ���� -->
				<p>
					<c:out value="${board.videoBoardTitle}" />
				</p>
				<!-- ���� -->
				<p>
					<c:out value="${fn:substring(board.videoBoardContent, 0, 30)}" />
					<c:if test="${fn:length(board.videoBoardContent) > 30}">...</c:if>
				</p>
				<!-- ��ȸ�� -->
				<p>	��ȸ��:
					<c:out value="${board.videoViews}" />
				</p>
				<!-- ������ -->
				<!-- ��ư Ŭ�� �� �ش� �Խù� �� �������� �̵��ؾ��� -->
				<button type="button" onclick="location.href='/board/videoBoardDetail?videoBoardNo=${board.videoBoardNo}'">Read More</button>
			</div>
		</c:forEach>

		<!-- ����¡ -->
		<div>
			<c:if test="${page.prev }">
				<!--  ���� ������ �ִ°�? -->
				<a class="pageBtn" href="${page.startPage-1}">����</a>
			</c:if>

			<c:forEach var="num" begin="${page.startPage}" end="${page.endPage}"
				step="1">
				<a class="pageBtn" href="${num}"> ${num} </a>
			</c:forEach>

			<c:if test="${page.next }">
				<!--  ���� ������ �ִ°�? -->
				<a class="pageBtn" href="${page.endPage+1}">����</a>
			</c:if>
		</div>

		<form action="videoBoard" id="actionForm" method="get">
			<input type="hidden" name="pageNum" value="${page.cv.pageNum}">
			<input type="hidden" name="amount" value="${page.cv.amount}">
		</form>
	</div>

	<!-- footer(�߰� ����) -->
	<footer>
		<p class="copyright">@Incheon Metropolitan City. All rights
			reserved.</p>
	</footer>

</body>
</html>
