# 프로젝트 소개


인천시에서 추진중인 프로젝트 제물포 Station.J (주)미디어그룹 사람과 숲 기업과 협업을 맺어 
랜딩페이지 및 관리자페이지 프로토타입 구축

Spring Boot와 JPA, Mybatis를 사용하여 REST API를 개발했습니다. 😀

### 개발 기간 및 인원

기간 : 2024.4.1 ~ 2024.5.8
인원 : 3명


# 주요 기능


### [랜딩페이지]
#### [메인] (../pages/Pages/DemoBlog/Blog/index)

* 해당 게시판 별로 최신 3개 게시물 노출
* Read more 클릭시 상세보기로 이동
* 더보기 누를시 해당 게시판 으로 이동
* 검색어 입력시 VR 아카이빙, 영상 게시판 관계없이 '제목','상세내용','작성자' 기준으로 검색 가능 (../pages/Pages/CaseStudy/AllCasesSearch)

#### [로그인] (../pages/Pages/AuthPages/PageLogin)

* 사용자는 아이디와 비밀번호를 이용해 로그인
* 소셜 로그인 가능
* 아이디 저장 체크 후 재 로그인 시 해당 아이디 자동으로 생성
* 로그인 상태 유지 체크 후 로그인시 정해진 시간동안 로그인 상태 유지 가능
* 비밀번호 찾기 시 인증했던 메일을 입력하면 해당 메일로 임시 비밀번호 발송 (../pages/Pages/AuthPages/PageRecoveryPassword)

#### [회원가입] (../pages/Pages/AuthPages/PageSignup)
* 사용자는 아이디, 이메일, 비밀번호를 입력받아 회원가입 가능
* 약관 동의 체크를 안할 시 회원가입 불가능
* 비밀번호는 특수문자 기호 필수
* 소셜 회원가입 가능
* 이메일을 입력 후 해당 이메일로 인증 링크를 눌러야 로그인 가능

#### [VR 아카이빙] (../pages/Pages/Blog/PageBlog)
 * 전체 또는 연도별로 해당 게시물 노출
 * 더보기 누를 시 상세보기로 이동 (../pages/Pages/CaseStudy/CaseDetail)

#### [영상 게시판] (../pages/Pages/Blog/PageBlogList)
  * 전체 해당 게시물 노출
  * 더보기 누를 시 상세보기로 이동 (../pages/Pages/CaseStudy/CaseDetail2)

### [관리자페이지] (../pages/Pages/Account/PageChat)
#### [콘텐츠관리-아카이브 콘텐츠] (../pages/Pages/Account/PageInvoice)

* 글 쓰기 버튼을 누르면 글 작성 가능
* 수정 버튼을 누르면 해당 게시물 수정 페이지 이동 (../pages/Pages/Account/PageWorks1)
* 삭제 버튼을 누르면 해당 게시물 삭제 가능

#### [콘텐츠관리-동영상 콘텐츠] (../pages/Pages/Account/PagePayments)

* 글 쓰기 버튼을 누르면 글 작성 가능
* 수정 버튼을 누르면 해당 게시물 수정 페이지 이동 (../pages/Pages/Account/PageWorks2)
* 삭제 버튼을 누르면 해당 게시물 삭제 가능

#### [계정관리-계정 권한 관리] (../pages/Pages/Account/PageProfile)

* 사용자 전체 조회
* 검색어 입력시 'ID','E-Mail' 기준으로 검색 가능
* 권한 수정시 수정 및 삭제 페이지로 이동 (../pages/Pages/Account/PageProfileEdit)
* 해당 사용자 역할 수정 가능
* 해당 사용자 삭제 가능
