package com.green.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.green.service.VideoBoardService;
import com.green.service.VrBoardService;
import com.green.vo.ConditionValue;
import com.green.vo.PageDto;
import com.green.vo.UserVo;
import com.green.vo.VideoBoardVo;
import com.green.vo.VrBoardVo;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BoardController {

	@Autowired
	private VrBoardService vrBoardService;
	
	@Autowired
	private VideoBoardService videoBoardService;
	
    // VR 데이터 전체 조회(페이징 포함)
    @GetMapping("/board/vrBoard")
    public Map<String, Object> vrMain(ConditionValue cv) {
        Map<String, Object> response = new HashMap<>();
        List<VrBoardVo> vrLists = vrBoardService.getListWithPage(cv);

        int total = vrBoardService.getTotalCnt();

        response.put("vrLists", vrLists);
        response.put("page", new PageDto(cv, total));

        return response;
    }

    // VR 년도별 조회
    @GetMapping("/board/vrBoardByYear/{year}")
    public Map<String, Object> getVrBoardListByYear(@PathVariable("year") int year, ConditionValue cv) {
        Map<String, Object> response = new HashMap<>();

        int total = vrBoardService.getTotalCntByYear(year);
        int offset = (cv.getPageNum() - 1) * cv.getAmount();

        List<VrBoardVo> vrListsByYear = vrBoardService.getListByYearWithPaging(year, offset, cv.getAmount());

        response.put("vrLists", vrListsByYear);
        response.put("page", new PageDto(cv, total));

        return response;
    }
	
	
	// 영상 게시판 데이터 전체 조회(페이징 포함)
	@GetMapping("/board/videoBoard")
	public Map<String, Object> videoMain(ConditionValue cv) {
        Map<String, Object> response = new HashMap<>();
        List<VideoBoardVo> videoLists = videoBoardService.getListWithPage(cv);

		int total = videoBoardService.getTotalCnt();

	    response.put("videoLists", videoLists);
	    response.put("page", new PageDto(cv, total));

		return response;
	}
	
	
	//vr 게시판 상세보기
	@GetMapping("/page-case-detail/{vrBoardNo}")
	public VrBoardVo getVrBoardDetail(@PathVariable("vrBoardNo") Long vrBoardNo) {

		vrBoardService.increaseVr(vrBoardNo);
		VrBoardVo vrBoard = vrBoardService.get(vrBoardNo);
		
	    return vrBoard;
	}


	
	// 영상 상세보기	
	@GetMapping("/page-case-detail2/{videoBoardNo}")
	public VideoBoardVo getVideoBoardDetail(@PathVariable("videoBoardNo") Long videoBoardNo) {
	    
		videoBoardService.increaseVideo(videoBoardNo);
		VideoBoardVo videoBoard = videoBoardService.get(videoBoardNo);
		
	    return videoBoard;
	    
	}
	    
		// VR 글 등록
		@PostMapping(value = "/api/post", consumes = { "multipart/form-data" })
		public ResponseEntity<?> save(@RequestParam("file") MultipartFile file, @RequestParam("title") String title, @RequestParam("contents") String contents, @RequestParam("url") String url,@RequestParam("username") String vrWriter) {
			try {
				// 파일 처리 로직
				String path = "src/main/resources/static/images/vrBoardImage";
				String imageFileName = file.getOriginalFilename();
				
				Path filePath = Paths.get(path, imageFileName);
				Files.write(filePath, file.getBytes());

				// DB에 저장할 이미지 URL
				String imageUrl = "/images/vrBoardImage/" + imageFileName; 

				// DB 저장 로직
				vrBoardService.save(title, contents, imageUrl, url,vrWriter);

				Map<String, String> response = new HashMap<>();
				response.put("message", "게시물 업로드 성공");
				return ResponseEntity.ok(response);
			} catch (IOException e) {
				e.printStackTrace();
				return ResponseEntity.badRequest().body("요청 처리 실패");
			}
		}
		
		
		
		//vr 게시판 수정 불러오기
		@GetMapping("/page-case-detail-modify/{vrBoardNo}")
		public VrBoardVo getVrBoardDetail00(@PathVariable("vrBoardNo") Long vrBoardNo) {
	
			
			VrBoardVo vrBoard = vrBoardService.get(vrBoardNo);
			
		    return vrBoard;
		}
		
	      // VR 데이터 수정
	      @PutMapping(value = "/api/modifyVrBoard/{vrBoardNo}", consumes = { "multipart/form-data" })
	      public ResponseEntity<?> modifyVrBoard(@PathVariable("vrBoardNo") Long vrBoardNo, @RequestParam(value="file", required = false) MultipartFile file, @RequestParam("title") String title, @RequestParam("contents") String contents, @RequestParam("url") String url, @RequestParam("thumbnail") String thumbnail, @RequestParam("username") String vrWriter) {
	          
	         System.out.println("@@");
	         
	         try {
	               if(file==null) {
	                   vrBoardService.modifyVrBoard(vrBoardNo, title, contents, thumbnail, url,vrWriter);
	                     
	                       Map<String, String> response = new HashMap<>();
	                       response.put("message", "게시물 수정 성공");
	                       return ResponseEntity.ok(response);
	               }else {
	                    // 파일 처리 로직
	                    String path = "src/main/resources/static/images/vrBoardImage";
	                    String imageFileName = file.getOriginalFilename();
	      
	                    Path filePath = Paths.get(path, imageFileName);
	                    Files.write(filePath, file.getBytes());
	      
	                    // DB에 저장할 이미지 URL
	                    String imageUrl = "/images/vrBoardImage/" + imageFileName;
	      
	                    // DB 수정 로직
	                    vrBoardService.modifyVrBoard(vrBoardNo, title, contents, imageUrl, url,vrWriter);
	      
	                    Map<String, String> response = new HashMap<>();
	                    response.put("message", "게시물 수정 성공");
	                    return ResponseEntity.ok(response);
	               }
	          } catch (IOException e) {
	              e.printStackTrace();
	              return ResponseEntity.badRequest().body("요청 처리 실패");
	          }
	      }

	      

		
		
		// VideoBoard 글 등록
		@PostMapping(value = "/api/videoBoardPost", consumes = { "multipart/form-data" })
		public ResponseEntity<?> videoBoardPost(@RequestParam("file") MultipartFile file, @RequestParam("title") String title, @RequestParam("contents") String contents, @RequestParam("url") String url, @RequestParam("username") String videoWriter) {
			try {
				// 파일 처리 로직
				String path = "src/main/resources/static/images/videoBoardImage";
				String imageFileName = file.getOriginalFilename();
				
				Path filePath = Paths.get(path, imageFileName);
				Files.write(filePath, file.getBytes());

				// DB에 저장할 이미지 URL
				String imageUrl = "/images/videoBoardImage/" + imageFileName; 

				// DB 저장 로직
				videoBoardService.videoBoardPost(title, contents, imageUrl, url, videoWriter);

				Map<String, String> response = new HashMap<>();
				response.put("message", "게시물 업로드 성공");
				return ResponseEntity.ok(response);
			} catch (IOException e) {
				e.printStackTrace();
				return ResponseEntity.badRequest().body("요청 처리 실패");
			}
		}
		
		// Video 게시판 수정 불러오기
		@GetMapping("/page-case-detail/modify/{videoBoardNo}")
		public VideoBoardVo getVideoBoardDetail00(@PathVariable("videoBoardNo") Long videoBoardNo) {
		    
		
			VideoBoardVo videoBoard = videoBoardService.get(videoBoardNo);
			
		    return videoBoard;
		    
		}
		
		
		// Video 데이터 수정
			@PutMapping(value = "/api/modifyVideoBoard/{videoBoardNo}", consumes = { "multipart/form-data" })
			public ResponseEntity<?> modifyVideoBoard(@PathVariable("videoBoardNo") Long videoBoardNo, @RequestParam(value="file", required = false) MultipartFile file, @RequestParam("title") String title, @RequestParam("contents") String contents, @RequestParam("url") String url,@RequestParam("thumbnail") String thumbnail, @RequestParam("username") String videoWriter) {			
				try {
	               if(file==null) {
	            	   videoBoardService.modifyVideoBoard(videoBoardNo, title, contents, thumbnail, url, videoWriter);
	                     
	                       Map<String, String> response = new HashMap<>();
	                       response.put("message", "게시물 수정 성공");
	                       return ResponseEntity.ok(response);
	               }else {
			        // 파일 처리 로직
			        String path = "src/main/resources/static/images/videoBoardImage";
			        String imageFileName = file.getOriginalFilename();

			        Path filePath = Paths.get(path, imageFileName);
			        Files.write(filePath, file.getBytes());

			        // DB에 저장할 이미지 URL
			        String imageUrl = "/images/videoBoardImage/" + imageFileName;

			        // DB 수정 로직
			        videoBoardService.modifyVideoBoard(videoBoardNo, title, contents, imageUrl, url, videoWriter);

			        Map<String, String> response = new HashMap<>();
			        response.put("message", "게시물 수정 성공");
			        return ResponseEntity.ok(response);
			        
	               }
			    } catch (IOException e) {
			        e.printStackTrace();
			        return ResponseEntity.badRequest().body("요청 처리 실패");
			    }
			}
			
	
	// vr 게시물 삭제
		@DeleteMapping("/api/deleteVr/{vrBoardNo}")
		public void deleteVrList(@PathVariable Long vrBoardNo) {
			vrBoardService.delete(vrBoardNo);
		}
	
			
	// video 게시물 삭제
		@DeleteMapping("/api/deleteVideo/{videoBoardNo}")
		public void deleteVideoList(@PathVariable Long videoBoardNo) {
			videoBoardService.delete(videoBoardNo);
		}
			
	}

