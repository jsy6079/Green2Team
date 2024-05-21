package com.green.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.green.service.VideoBoardService;
import com.green.service.VrBoardService;
import com.green.vo.VideoBoardVo;
import com.green.vo.VrBoardVo;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MainController {
	
	@Autowired
	private VrBoardService vrBoardService;

	@Autowired
	private VideoBoardService videoBoardService;
	
    @Autowired
    public MainController(VideoBoardService videoBoardService, VrBoardService vrBoardService) {
        this.videoBoardService = videoBoardService;
        this.vrBoardService = vrBoardService;
    }
	
	

	@GetMapping("/index-blog/vr") // 메인에서 최근 3개 게시물 (vr 아카이빙)
	public List<VrBoardVo> main() {
	
		
		return vrBoardService.getrecentThreeVrSelect();
	
	}
	
	
	@GetMapping("/index-blog/video") // 메인에서 최근 3개 게시물 (영상 게시판)
	public List<VideoBoardVo> getVideoBoardData() {
		
	    return videoBoardService.getrecentThreeVideoSelect();
	}
	
	
	
	
	
	// 검색 결과
	
    @GetMapping("/page-all-cases-search/{searchText}")
    public List<Object> searchByKeyword(@PathVariable String searchText) {
        List<VideoBoardVo> videoResults = videoBoardService.selectByVideoSearch(searchText);
        List<VrBoardVo> vrResults = vrBoardService.selectByVrSearch(searchText);

        List<Object> combinedResults = new ArrayList<>();
        combinedResults.addAll(videoResults);
        combinedResults.addAll(vrResults);

        return combinedResults;
    }
	

}
