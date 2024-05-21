package com.green.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.green.repository.UserRepository;
import com.green.service.UserService;
import com.green.vo.ConditionValue;
import com.green.vo.PageDto;
import com.green.vo.UserVo;
import com.green.vo.VrBoardVo;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	
    // 회원 데이터 전체 조회(페이징 포함)
    @GetMapping("/page-profile/List")
    public Map<String, Object> vrMain(ConditionValue cv) {
        Map<String, Object> response = new HashMap<>();
        List<UserVo> userLists = userService.getListWithPage(cv);

        int total = userService.getTotalCnt();

        response.put("userLists", userLists);
        response.put("page", new PageDto(cv, total));

        return response;
    }
    
    
	//회원 상세보기
	@GetMapping("/page-profile-edit/{id}")
	public UserVo getVrBoardDetail(@PathVariable("id") Long id) {

	
		UserVo userVo = userService.get(id);
		
	    return userVo;
	}
	
	
	// 회원 수정
	@PutMapping("/api/updateRoleAdmin")
	public Map<String, Object> updateProfileAdmin(@RequestBody UserVo userVo) {
		Map<String, Object> response = new HashMap<>();
		if(userRepository.existsByUserRole("ROLE_ADMIN")) {
			response.put("userRole", '1');
		} else {
			userService.modify(userVo);
		}
		
		return response;
		
	}
	
	
	@PutMapping("/api/updateRole")
	public void updateProfile(@RequestBody UserVo userVo) {
			userService.modify(userVo);
	}
	
	
	// 회원 삭제
	@DeleteMapping("/api/deleteUser/{id}")
	public void deleteUserList(@PathVariable Long id) {
		userService.delete(id);
	}
	
	 // 회원 검색 및 페이징
    @GetMapping("/page-profile-search")
    public Map<String, Object> searchByUserKeyword(@RequestParam("searchText") String searchText,
                                                   @RequestParam("pageNum") int pageNum,
                                                   @RequestParam("amount") int amount){
    	
    	System.out.println("하이2222222");

        Map<String, Object> parameterMap = new HashMap<>();
        ConditionValue cv = new ConditionValue(pageNum, amount); // 페이지네이션 정보 생성
        parameterMap.put("cv", cv);
        parameterMap.put("searchText", searchText);
        System.out.println("searchText: " + searchText);
        Map<String, Object> response = new HashMap<>();
        List<UserVo> userLists = userService.getListWithPageSearch(parameterMap);
      
        int total = userService.getSearchTotalCnt(searchText);
        System.out.println("total: " + total);
        
        response.put("userLists", userLists);
        response.put("page", new PageDto(cv, total));
        
        return response;
    }
    
	// 회원 검색
	@GetMapping("/page-profile-search/{searchText}")
	public Map<String, Object> searchByUserKeyword(@PathVariable String searchText){
	    Map<String, Object> parameterMap = new HashMap<>();
	    ConditionValue cv = new ConditionValue(); // 페이지네이션 정보 생성
	    parameterMap.put("cv", cv);
	    parameterMap.put("searchText", searchText);
	    
	    Map<String, Object> response = new HashMap<>();
	    List<UserVo> userLists = userService.getListWithPageSearch(parameterMap);
	  
	    int total = userService.getTotalCnt();

	    response.put("userLists", userLists);
	    response.put("page", new PageDto(cv, total));

	    return response;
	}
    

}
