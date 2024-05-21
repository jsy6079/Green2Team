$(document).ready(
	function() {
		let actionForm = $('#actionForm');

		// 전체 데이터 페이징 버튼 클릭 이벤트
		$('.pageBtn').on("click",function(e) {
				e.preventDefault(); // 기본 동작 차단
				let pageNum = $(this).attr('href').split('pageNum=')[1];
				let yearParam = new URLSearchParams(window.location.search).get('year');
				
				actionForm.find("input[name='year']").val(yearParam);
				actionForm.find("input[name='pageNum']").val(pageNum);
				
				actionForm.submit();
			});

		// 년도별 페이징 버튼 클릭 이벤트
		$('.yearPageBtn').on("click",function() {
				let pageNum = $(this).attr('href').split('pageNum=')[1];
				let yearParam = new URLSearchParams(window.location.search).get('year');
				
				actionForm.find("input[name='year']").val(yearParam);
				actionForm.find("input[name='pageNum']").val(pageNum);
				
				actionForm.submit();
			});

	});