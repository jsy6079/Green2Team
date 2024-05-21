package com.green.service;

import java.util.List;

import com.green.vo.ConditionValue;
import com.green.vo.VideoBoardVo;
import com.green.vo.VrBoardVo;

public interface VrBoardService {
	// VR 아카이빙 게시판

	// 최근 업로드 3개 게시물 조회
	public List<VrBoardVo> getrecentThreeVrSelect();

	// 페이징 - 리스트
	public List<VrBoardVo> getListWithPage(ConditionValue cv);

	// 페이징 - 페이지 번호
	public int getTotalCnt();

	// 년도별 조회 - 리스트
	public List<VrBoardVo> getListByYearWithPaging(int selectedYear, int offset, int amount);

	// 년도별 조회 - 페이지 번호
	public int getTotalCntByYear(int selectedYear);
	
	

	
	
	
	
	
	// VR 게시글 상세보기
	public VrBoardVo get(Long vrBoardNo);
	
	// VR 상세보기 조회수 증가
	public void increaseVr(Long vrBoardNo);
	
	// VR 검색 -> vr테이블만
	public List<VrBoardVo> selectByVrSearch(String searchText);
	
	// VR 글 등록
	public void save(String title, String contents, String imageUrl, String url, String vrWriter);
	

	// VR 데이터 수정
	public void modifyVrBoard(Long vrBoardNo, String title, String contents, String imageUrl, String url, String vrWriter);
	
	// VR 게시물 삭제하기
	public void delete(Long vrBoardNo);
	

}
