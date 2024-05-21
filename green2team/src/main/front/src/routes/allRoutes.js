import React from 'react'
import { Navigate } from "react-router-dom";


// 로그인, 회원가입, 비밀번호 찾기
import PageLogin from "../pages/Pages/AuthPages/PageLogin";
import PageSignup from "../pages/Pages/AuthPages/PageSignup";
import PageRecoveryPassword from "../pages/Pages/AuthPages/PageRecoveryPassword";


// 대시보드
import PageProfile from "../pages/Pages/Account/PageProfile";
import PageProfileEdit from "../pages/Pages/Account/PageProfileEdit";
import PageMembers from "../pages/Pages/Account/PageMembers"; 
import PageWorks1 from "../pages/Pages/Account/PageWorks1";
import PageWorks2 from "../pages/Pages/Account/PageWorks2";
import PageMessages from "../pages/Pages/Account/PageMessages"; 
import PagePayments from "../pages/Pages/Account/PagePayments";
import PageInvoice from "../pages/Pages/Account/PageInvoice";
import PageChat from "../pages/Pages/Account/PageChat";

// vr, 영상게시판 전체조회
import PageBlog from "../pages/Pages/Blog/PageBlog";
import PageBlogList from "../pages/Pages/Blog/PageBlogList";


// 검색
import AllCasesSearch from "../pages/Pages/CaseStudy/AllCasesSearch";

// vr, video 상세보기
import CaseDetail from "../pages/Pages/CaseStudy/CaseDetail";
import CaseDetail2 from "../pages/Pages/CaseStudy/CaseDetail2";

// 메인
import Blog from "../pages/Pages/DemoBlog/Blog/index";

// 푸터 
import PageFooterLayouts from "../pages/Pages/PageFooterLayouts/PageFooterLayouts";

const routes = [

  //Demo Blog 
  { path: "/index-blog", component: <Blog />, isWithoutLayout: true},

  //User Pages
  { path: "/auth-login", component: <PageLogin />, isWithoutLayout: true},

  { path: "/auth-signup", component: <PageSignup />, isWithoutLayout: true },

  {
    path: "/auth-re-password",
    component: <PageRecoveryPassword />,
    isWithoutLayout: true 
  },

  { path: "/footer-layouts", component: <PageFooterLayouts /> },


  //Page Profile
  { path: "/page-profile", component: <PageProfile />,requiredRole:['ROLE_ADMIN']},
  { path: "/page-members", component: <PageMembers />, },
  { path: "/page-works1/:vrBoardNo", component: <PageWorks1 />,requiredRole:['ROLE_ADMIN','ROLE_BOARD','ROLE_TRADER']  },
  { path: "/page-works2/:videoBoardNo", component: <PageWorks2 />,requiredRole:['ROLE_ADMIN','ROLE_BOARD','ROLE_TRADER'] },
  { path: "/page-messages", component: <PageMessages />, },
  { path: "/page-profile-edit/:id", component: <PageProfileEdit />,requiredRole:['ROLE_ADMIN']},
  { path: "/page-payments", component: <PagePayments />,requiredRole:['ROLE_ADMIN','ROLE_BOARD','ROLE_TRADER'] },
  { path: "/page-invoice", component: <PageInvoice />, isTopbarDark: true,requiredRole:['ROLE_ADMIN','ROLE_BOARD','ROLE_TRADER'] },
  { path: "/page-chat", component: <PageChat /> ,requiredRole:['ROLE_ADMIN','ROLE_BOARD','ROLE_TRADER']},

  //Page Blog
  { path: "/page-blog-grid", component: <PageBlog />, isTopbarDark: true  }, 
  { path: "/page-blog-list", component: <PageBlogList />, isTopbarDark: true }, 


  //Page Case Study

  { path: "/page-all-cases-search/:searchText", component: <AllCasesSearch /> }, 
  { path: "/page-case-detail/:vrBoardNo", component: <CaseDetail />, isTopbarDark: true }, 
  { path: "/page-case-detail2/:videoBoardNo", component: <CaseDetail2 />, isTopbarDark: true }, 


  //Index Main
  {
    path: "/",
    exact: true ,
    component: <Navigate to="/index-blog" />,
  },
  { path: "/", component: <Blog />, isWithoutLayout: true},


];

export default routes;
