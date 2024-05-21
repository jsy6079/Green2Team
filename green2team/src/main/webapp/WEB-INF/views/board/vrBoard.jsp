<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>VR Board</title>

<!-- CSS -->
<link rel="stylesheet" href="/css/board/vrBoard.css">

<!-- SCRIPT -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="/jquery/jquery-3.7.1.js"></script>
<script src="/js/board/vrBoard.js" charset="utf-8"></script>
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
			<h2>360�� VR ��ī�̺�</h2>
			<h5>
				������ ���ϴ� �ֿ�������ü�� �����ϴ� �ٷ����� ��ü�ൿ���� ������ ���ϴ� �ٿ� ���Ͽ� <br> �̸� �����ϰų�
				�������� �ƴ��� �� ����. ���뷷-�����Ѹ�-��������
			</h5>
		</div>
	</nav>

	<!-- boardTitle -->
	<div class="boardTitle">
		<div class="text">360�� VR ��ī�̺�</div>
	</div>

	<!-- �⵵(�⵵ �߰� �� �ش� �κ� ����) -->
	<div class="yearFilter">
		<a href="/board/vrBoard">��ü</a>
		<a href="/board/vrBoardByYear?year=2024">2024</a> 
		<a href="/board/vrBoardByYear?year=2025">2025</a> 
		<a href="/board/vrBoardByYear?year=2026">2026</a>
	</div>

	<!-- VR ��ī�̺� �Խ��� -->
	<div id="postContainer">
		<c:forEach items="${vrLists}" var="board">
			<div class="BoardBox">
			
			
			<div class="thumbnail-container">
				<!-- ����� -->
				<img src="<c:out value="${board.vrThumbnailImgUrl}" />"
					alt="Thumbnail" width="100" height="100">
			<div class="post-info">
			<p>
				    <!-- ��¥�� ����ȭ�Ͽ� formattedDate ������ �Ҵ� -->
				    <c:set var="formattedDate">
				        <fmt:formatDate value="${board.vrRegdate}" pattern="yyyy.MM.dd" />
				    </c:set>
				    <!-- ����ȭ�� ��¥�� ��� -->
				    <c:out value="${formattedDate}" />
				</p>
				<p>
				    ��ȸ��: <c:out value="${board.vrViews}" />
				</p>
                </div>
            </div>
					
					
					
				<!-- ���ε峯¥ -->
				<p>
					<fmt:formatDate pattern="YYYY" value="${board.vrRegdate}" />
				</p>
				<!-- ���� -->
				<p>
					<c:out value="${board.vrBoardTitle}" />
				</p>
				<!-- ���� -->
				<p>
					<c:out value="${fn:substring(board.vrBoardContent, 0, 30)}" />
					<c:if test="${fn:length(board.vrBoardContent) > 30}">...</c:if>
				</p>
				<!-- ������ -->
				<!-- ��ư Ŭ�� �� �ش� �Խù� �� �������� �̵��ؾ��� -->
				<button type="button" onclick="location.href='/board/vrBoardDetail?vrBoardNo=${board.vrBoardNo}'">Read More</button>
			</div>
		</c:forEach>

		<!-- ����¡ -->
		<div>
			<c:choose>
				<c:when test="${empty year}">
					<c:if test="${page.prev}">
						<!-- ���� ������ �ִ°�? -->
						<a class="pageBtn"
							href="/board/vrBoardByYear?year=${year}&pageNum=${page.startPage-1}">����</a>
					</c:if>

					<c:forEach var="num" begin="${page.startPage}"
						end="${page.endPage}" step="1">
						<a class="pageBtn"
							href="/board/vrBoardByYear?year=${year}&pageNum=${num}">${num}</a>
					</c:forEach>

					<c:if test="${page.next}">
						<!-- ���� ������ �ִ°�? -->
						<a class="pageBtn"
							href="/board/vrBoardByYear?year=${year}&pageNum=${page.endPage+1}">����</a>
					</c:if>
				</c:when>
				<c:otherwise>
					<c:if test="${page.prev}">
						<!-- ���� ������ �ִ°�? -->
						<a class="yearPageBtn"
							href="/board/vrBoardByYear?year=${year}&pageNum=${page.startPage-1}">����</a>
					</c:if>

					<c:forEach var="num" begin="${page.startPage}"
						end="${page.endPage}" step="1">
						<a class="yearPageBtn"
							href="/board/vrBoardByYear?year=${year}&pageNum=${num}">${num}</a>
					</c:forEach>

					<c:if test="${page.next}">
						<!-- ���� ������ �ִ°�? -->
						<a class="yearPageBtn"
							href="/board/vrBoardByYear?year=${year}&pageNum=${page.endPage+1}">����</a>
					</c:if>
				</c:otherwise>
			</c:choose>
		</div>

		<form action="vrBoard" id="actionForm" method="get">
			<input type="hidden" name="pageNum" value="${page.cv.pageNum}">
			<input type="hidden" name="amount" value="${page.cv.amount}">
			<input type="hidden" name="year" value="${year}">
		</form>
	</div>

	<!-- footer(�߰� ����) -->
	<footer>
		<p class="copyright">@Incheon Metropolitan City. All rights reserved.</p>
	</footer>

</body>
</html>