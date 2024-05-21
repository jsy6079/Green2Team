package com.green.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.green.vo.ConditionValue;
import com.green.vo.VideoBoardVo;

@Mapper
public interface VideoBoardDao {
	
	// 최근 업로드 3개 게시물 조회
	public List<VideoBoardVo> recentThreeVideoSelect();
	
	// 페이징 - 리스트
	public List<VideoBoardVo> selectAllWithPage(ConditionValue cv);

	// 페이징 - 페이지 번호
	public int selectTotalCount();
	
	
	
	
	
	// Video 검색, 비디오테이블만
	public List<VideoBoardVo> selectByVideoSearch(String searchText);
	
	// Video 해당 게시물 상세조회
	public VideoBoardVo selectVideoBoardByVideoBoardNo(Long videoBoardNo);
	
	// Video 해당 상세보기 조회수 증가
	public void increaseViewsByVideoBoardNo(Long videoBoardNo);
	
	// Video 글 등록
	public void insertVideoBoard(VideoBoardVo newPost);

	// Video 글 수정
	public void updateVideoBoard(VideoBoardVo updatedPost);
	
	// Video 게시물 삭제
	public void deleteVideo(Long videoBoardNo);
	
}
