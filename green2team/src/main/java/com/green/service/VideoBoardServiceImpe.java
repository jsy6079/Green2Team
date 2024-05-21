package com.green.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.green.dao.VideoBoardDao;
import com.green.vo.ConditionValue;
import com.green.vo.VideoBoardVo;

@Service
public class VideoBoardServiceImpe implements VideoBoardService {
	@Autowired
	private VideoBoardDao dao;

	// 최근 업로드 게시물 3개 조회
	@Override
	public List<VideoBoardVo> getrecentThreeVideoSelect() {
		return dao.recentThreeVideoSelect();
	}

	// 페이징 - 리스트
	@Override
	public List<VideoBoardVo> getListWithPage(ConditionValue cv) {
		return dao.selectAllWithPage(cv);
	}

	// 페이징 - 페이지 번호
	@Override
	public int getTotalCnt() {
		return dao.selectTotalCount();
	}
	

	
	// 검색 비디오 테이블만 뽑기
	@Override
	public List<VideoBoardVo> selectByVideoSearch(String searchText) {
		return dao.selectByVideoSearch(searchText);
	}
	
	
	// 해당 게시물 상세조회
	@Override
	public VideoBoardVo get(Long videoBoardNo) {
		return dao.selectVideoBoardByVideoBoardNo(videoBoardNo);
	}

	// 게시글 상세보기 조회수 증가
	@Override
	public void increaseVideo(Long videoBoardNo) {
		dao.increaseViewsByVideoBoardNo(videoBoardNo);
		
	}

	// 글 등록
	@Override
	public void videoBoardPost(String title, String contents, String imageUrl, String url, String videoWriter) {
		VideoBoardVo newPost = new VideoBoardVo();
		newPost.setVideoBoardTitle(title);
		newPost.setVideoBoardContent(contents);
		newPost.setVideoThumbnailImgUrl(imageUrl);
		newPost.setVideoViewerUrl(url);
		newPost.setVideoWriter(videoWriter);
		
		dao.insertVideoBoard(newPost);
	}

	// 글 수정
	@Override
	public void modifyVideoBoard(Long videoBoardNo, String title, String contents, String imageUrl, String url, String videoWriter) {
	    VideoBoardVo updatedPost = dao.selectVideoBoardByVideoBoardNo(videoBoardNo);
	    if (updatedPost != null) {
	        updatedPost.setVideoBoardTitle(title);
	        updatedPost.setVideoBoardContent(contents);
	        updatedPost.setVideoThumbnailImgUrl(imageUrl);
	        updatedPost.setVideoViewerUrl(url);
	        updatedPost.setVideoWriter(videoWriter);
	        dao.updateVideoBoard(updatedPost);
	    }		
	}

	// 게시물 삭제
	@Override
	public void delete(Long videoBoardNo) {
		dao.deleteVideo(videoBoardNo);
		
	}


}