package com.green.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.green.vo.ConditionValue;
import com.green.vo.UserVo;
import com.green.vo.VrBoardVo;

@Mapper
public interface UserDao {
	
	// 페이징 - 리스트
	public List<UserVo> selectAllWithPage(ConditionValue cv);

	// 페이징 - 페이지 번호
	public int selectTotalCount();
	
	// 해당 회원 상세보기
	public UserVo selectUserById(Long id);
	
	// 회원 수정
	public void updateUser(UserVo userVo);
	
	// 회원 삭제
	public void deleteUser(Long id);
	
	// 페이징 - 검색 리스트
	public List<UserVo> selectAllWithPageSearch(Map<String, Object> parameterMap);
	
	// 페이징 - 검색 후 번호
	public int selectSearchTotalCount(String searchText);
	
	
}
