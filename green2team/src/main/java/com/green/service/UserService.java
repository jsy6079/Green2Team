package com.green.service;

import java.util.List;
import java.util.Map;

import com.green.vo.ConditionValue;
import com.green.vo.UserVo;
import com.green.vo.VrBoardVo;

public interface UserService {
	
	// 페이징 - 리스트
	public List<UserVo> getListWithPage(ConditionValue cv);

	// 페이징 - 페이지 번호
	public int getTotalCnt();
	
	// 회원 상세보기
	public UserVo get(Long id);
	
	// 회원 수정하기
	public void modify(UserVo userVo);
	
	// 회원 삭제하기
	public void delete(Long id);
	
	// 페이징 - 검색 리스트
	public List<UserVo> getListWithPageSearch(Map<String, Object> parameterMap);
	
	// 페이징 - 검색 후 번호
	public int getSearchTotalCnt(String searchText);

}
