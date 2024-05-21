package com.green.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.green.dao.UserDao;
import com.green.vo.ConditionValue;
import com.green.vo.UserVo;
import com.green.vo.VrBoardVo;

@Service
public class UserServiceImpe implements UserService {
	
	@Autowired
	private UserDao dao;

	@Override
	public List<UserVo> getListWithPage(ConditionValue cv) {
	
		return dao.selectAllWithPage(cv);
	}

	@Override
	public int getTotalCnt() {
		
		return dao.selectTotalCount();
	}

	// 회원 상세보기
	@Override
	public UserVo get(Long id) {
		
		return dao.selectUserById(id);
	}

	// 회원 수정
	@Override
	public void modify(UserVo userVo) {
		dao.updateUser(userVo);
		
	}

	// 회원 삭제
	@Override
	public void delete(Long id) {
		dao.deleteUser(id);
		
	}
	
	// 회원 검색 리스트
	@Override
	public List<UserVo> getListWithPageSearch(Map<String, Object> parameterMap) {
	
		return dao.selectAllWithPageSearch(parameterMap);
	}

	@Override
	public int getSearchTotalCnt(String searchText) {
		return dao.selectSearchTotalCount(searchText);
	}
	
	



}
