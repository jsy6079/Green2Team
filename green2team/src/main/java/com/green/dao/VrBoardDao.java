package com.green.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.green.vo.ConditionValue;
import com.green.vo.VideoBoardVo;
import com.green.vo.VrBoardVo;

@Mapper
public interface VrBoardDao {
	
	// 최근 업로드 3개 게시물 조회
	public List<VrBoardVo> recentThreeVrSelect();

	// 페이징 - 리스트
	public List<VrBoardVo> selectAllWithPage(ConditionValue cv);

	// 페이징 - 페이지 번호
	public int selectTotalCount();

	// 년도별 조회 - 리스트
	public List<VrBoardVo> selectByYearWithPaging(int selectedYear, int offset, int amount);

	// 년도별 조회 - 페이지 번호
	public int selectTotalCountByYear(int selectedYear);
	
	
	
	
	
	// VR 해당 상세보기
	public VrBoardVo selectVrBoardByVrBoardNo(Long vrBoardNo);
	
	// VR 해당 상세보기 조회수 증가
	public void increaseViewsByVrBoardNo(Long vrBoardNo);
	
	
	// VR 검색, vr 테이블만
	public List<VrBoardVo> selectByVrSearch(String searchText);
	
	// VR 글 등록
	public void insertVrBoard(VrBoardVo newPost);
	
	// VR 데이터 수정
	public void updateVrBoard(VrBoardVo updatedPost);
	
	// VR 게시물 삭제
	public void deleteVr(Long vrBoardNo);
	
}
