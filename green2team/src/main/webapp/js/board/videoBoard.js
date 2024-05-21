$(document).ready(
	function() {
		let actionForm = $('#actionForm');

		// 전체 데이터 페이징 버튼 클릭 이벤트
		$('.pageBtn').on("click",function(e) {
				e.preventDefault(); // 기본 동작 차단
				let pageNum = $(this).attr("href");
				
				actionForm.find("input[name='pageNum']").val(pageNum);
				
				actionForm.submit();
			});
	});