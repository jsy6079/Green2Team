# 🚉 그린컴퓨터 아카데미 Station-J 팀 프로젝트

인천시에서 추진 중인 **제물포 Station.J 프로젝트**  
(주)미디어그룹 사람과 숲 기업과 협업하여 **랜딩페이지 및 관리자 페이지 프로토타입**을 구축했습니다.

### 기술 스택  
- **Frontend:** React  
- **Backend:** Spring Boot, JPA, MyBatis  
- **API:** REST API 개발  

---

## 개발 기간 및 참여 인원
- **개발 기간:** 2024.04.01 ~ 2024.05.08  
- **개발 인원:** 3명  

---

## 주요 기능

### 랜딩페이지

#### 메인 페이지  
📌 경로: `../pages/Pages/DemoBlog/Blog/index`  
- 각 게시판별 최신 **3개 게시물 노출**  
- **Read More** 클릭 시 상세보기 이동  
- **더보기** 클릭 시 해당 게시판으로 이동  
- **검색 기능:**  
  - VR 아카이빙, 영상 게시판 관계없이 **제목, 상세내용, 작성자** 기준으로 검색 가능  
  📌 경로: `../pages/Pages/CaseStudy/AllCasesSearch`  

#### 로그인  
📌 경로: `../pages/Pages/AuthPages/PageLogin`  
- **아이디 + 비밀번호 로그인**  
- **소셜 로그인 지원**  
- **아이디 저장 & 자동 로그인 기능**  
- **로그인 상태 유지 기능**  
- **비밀번호 찾기** (이메일로 임시 비밀번호 발송)  
  📌 경로: `../pages/Pages/AuthPages/PageRecoveryPassword`  

#### 회원가입  
📌 경로: `../pages/Pages/AuthPages/PageSignup`  
- 아이디, 이메일, 비밀번호 입력 후 가입 가능  
- 약관 동의 필수  
- 비밀번호는 **특수문자 포함 필수**  
- 소셜 회원가입 가능  
- 이메일 인증 후 로그인 가능  

#### VR 아카이빙  
📌 경로: `../pages/Pages/Blog/PageBlog`  
- 전체 / 연도별 게시물 필터링 가능  
- 더보기 클릭 시 상세보기 이동  
  📌 경로: `../pages/Pages/CaseStudy/CaseDetail`  

#### 영상 게시판  
📌 경로: `../pages/Pages/Blog/PageBlogList`  
- 게시물 전체 노출  
- 더보기 클릭 시 상세보기 이동  
  📌 경로: `../pages/Pages/CaseStudy/CaseDetail2`  

---

### 관리자 페이지

📌 경로: `../pages/Pages/Account/PageChat`  


#### 아카이브 콘텐츠  
📌 경로: `../pages/Pages/Account/PageInvoice`  
- 게시물 작성 가능  
- 게시물 수정 가능  
  📌 경로: `../pages/Pages/Account/PageWorks1`  
- 게시물 삭제 가능  

#### 동영상 콘텐츠  
📌 경로: `../pages/Pages/Account/PagePayments`  
- 게시물 작성 가능  
- 게시물 수정 가능  
  📌 경로: `../pages/Pages/Account/PageWorks2`  
- 게시물 삭제 가능  

#### 계정 권한 관리  
📌 경로: `../pages/Pages/Account/PageProfile`  
- 전체 사용자 조회 가능  
- ID, 이메일 기준 검색 가능  
- 사용자 권한 수정 가능  
  📌 경로: `../pages/Pages/Account/PageProfileEdit`  
- 사용자 삭제 가능  

