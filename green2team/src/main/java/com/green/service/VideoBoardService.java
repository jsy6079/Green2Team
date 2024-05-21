package com.green.service;

import java.util.List;

import com.green.vo.ConditionValue;
import com.green.vo.VideoBoardVo;

public interface VideoBoardService {
	// 영상 게시판
	
	// 최근 업로드 3개 게시물 조회
	public List<VideoBoardVo> getrecentThreeVideoSelect();

	// 페이징 - 리스트
	public List<VideoBoardVo> getListWithPage(ConditionValue cv);

	// 페이징 - 페이지 번호
	public int getTotalCnt();
	
	

	// Video 검색 -> Video테이블만
	public List<VideoBoardVo> selectByVideoSearch(String searchText);
	
	// Video 해당 게시물 상세조회
	public VideoBoardVo get(Long videoBoardNo);
	
	// Video 상세보기 조회수 증가
	public void increaseVideo(Long videoBoardNo);
	
	// Video 글 등록
	public void videoBoardPost(String title, String contents, String imageUrl, String url, String videoWriter);

	// Video 글 수정
	public void modifyVideoBoard(Long videoBoardNo, String title, String contents, String imageUrl, String url, String videoWriter);
	
	// Video 게시물 삭제하기
	public void delete(Long videoBoardNo);
}
