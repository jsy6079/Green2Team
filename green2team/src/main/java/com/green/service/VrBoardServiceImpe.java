package com.green.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.green.dao.VrBoardDao;
import com.green.vo.ConditionValue;
import com.green.vo.VrBoardVo;

@Service
public class VrBoardServiceImpe implements VrBoardService {
	@Autowired
	private VrBoardDao dao;

	// 최근 업로드 게시물 3개 조회
	@Override
	public List<VrBoardVo> getrecentThreeVrSelect() {
		return dao.recentThreeVrSelect();
	}

	// 페이징 - 리스트
	@Override
	public List<VrBoardVo> getListWithPage(ConditionValue cv) {
		return dao.selectAllWithPage(cv);
	}

	// 페이징 - 페이지 번호
	@Override
	public int getTotalCnt() {
		return dao.selectTotalCount();
	}

	// 년도별 조회 - 리스트
	@Override
	public List<VrBoardVo> getListByYearWithPaging(int selectedYear, int offset, int amount) {
		return dao.selectByYearWithPaging(selectedYear, offset, amount);
	}

	// 년도별 조회 - 페이지 번호
	@Override
	public int getTotalCntByYear(int selectedYear) {
		return dao.selectTotalCountByYear(selectedYear);
	}
	
	
	
	
	
	
	// 게시글 상세보기
	@Override
	public VrBoardVo get(Long vrBoardNo) {
		return dao.selectVrBoardByVrBoardNo(vrBoardNo);
	}

	// 게시글 상세보기 조회수 증가
	@Override
	public void increaseVr(Long vrBoardNo) {
		dao.increaseViewsByVrBoardNo(vrBoardNo);
	}

	// 검색 vr 테이블만
	@Override
	public List<VrBoardVo> selectByVrSearch(String searchText) {
		return dao.selectByVrSearch(searchText);
	}

	// 글 등록
	@Override
	public void save(String title, String contents, String imageUrl, String url,String vrWriter) {
		VrBoardVo newPost = new VrBoardVo();
		newPost.setVrBoardTitle(title);
		newPost.setVrBoardContent(contents);
		newPost.setVrThumbnailImgUrl(imageUrl);
		newPost.setVrPanoramaViewerUrl(url);
		newPost.setVrWriter(vrWriter);

		dao.insertVrBoard(newPost);
	}

	// VR 데이터 수정
	@Override
	public void modifyVrBoard(Long vrBoardNo, String title, String contents, String imageUrl, String url, String vrWriter) {
	    VrBoardVo updatedPost = dao.selectVrBoardByVrBoardNo(vrBoardNo);
	    if (updatedPost != null) {
	        updatedPost.setVrBoardTitle(title);
	        updatedPost.setVrBoardContent(contents);
	        updatedPost.setVrThumbnailImgUrl(imageUrl);
	        updatedPost.setVrPanoramaViewerUrl(url);
	        updatedPost.setVrWriter(vrWriter);
	        
	        dao.updateVrBoard(updatedPost);
	    }
	}

	// 게시물 삭제
	@Override
	public void delete(Long vrBoardNo) {
		dao.deleteVr(vrBoardNo);
		
	}
	
	
	

}