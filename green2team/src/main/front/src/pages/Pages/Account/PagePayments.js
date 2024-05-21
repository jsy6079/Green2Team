import React, { Component } from "react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
// import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';

import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

import { Link } from "react-router-dom";

// import 'simplebar/dist/simplebar.min.css';
import logoDark from "../../../assets/images/logo-dark.png";
import logoLight from "../../../assets/images/logo-light.png";
import logoIcon from "../../../assets/images/logo-icon.png";
import c04 from "../../../assets/images/client/04.jpg";
import c05 from "../../../assets/images/client/05.jpg";
import c15 from "../../../assets/images/client/15.jpg";
import rtl from "../../../assets/images/demos/rtl.png";
import dark from "../../../assets/images/demos/dark.png";
import landing from "../../../assets/images/demos/landing.png";
import ltr from "../../../assets/images/demos/ltr.png";
import darkrtl from "../../../assets/images/demos/dark-rtl.png";

import FileUploader from "./FileUploader";


class PagePayments extends Component {

      // 로그아웃 

      handleLogout = () => {
        // 로그아웃 요청 보내기
        axios.post('/api/logout', null, {
        withCredentials: true
        })
        .then(response => {
        // 로그아웃 성공 시 추가 작업 수행
        // 예: 홈페이지로 리디렉션
        window.location.href = '/index-blog'; // 홈페이지로 이동
        })
        .catch(error => {
        console.error('로그아웃 중 오류 발생:', error);
        });
    };

    // 글 삭제 메서드 정의
    handleDeleteVr = (videoBoardNo) => {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        // 사용자 삭제 요청 보내기
        axios.delete(`/api/deleteVideo/${videoBoardNo}`)
          .then(response => {
            // 삭제 성공 시 필요한 작업 수행
            console.log('삭제 성공:', response);
            window.location.reload()
          })
          .catch(error => {
            console.error('삭제 실패:', error);
            console.log(videoBoardNo);
          });
      } else {
        // 취소 시 필요한 작업 수행
      }
    };



    constructor(props) {
        super(props);

        this.editor = null;
        this.handleFileChange = this.handleFileChange.bind(this);

        this.state = {
          title: "",
          contents: "",
          file: null,
          blogs: [],
          currentPage: 1,
          showModal: false,
          showDashboardSubMenu: false,
          showContentManagementSubMenu: true,
          showInformationManagementSubMenu: false,
          showAccountManagementSubMenu: false,
          isSidebarOpen: false
        };
     
      }

      toggleDashboardSubMenu = () => {
        this.setState(prevState => ({
            showDashboardSubMenu: !prevState.showDashboardSubMenu
        }));
    };

    toggleContentManagementSubMenu = () => {
        this.setState(prevState => ({
            showContentManagementSubMenu: !prevState.showContentManagementSubMenu
        }));
    };

    toggleInformationManagementSubMenu = () => {
        this.setState(prevState => ({
            showInformationManagementSubMenu: !prevState.showInformationManagementSubMenu
        }));
    };


    toggleAccountManagementSubMenu = () => {
        this.setState(prevState => ({
            showAccountManagementSubMenu: !prevState.showAccountManagementSubMenu
        }));
    };

    handleSidebarToggle = () => {
      this.setState(prevState => ({
          isSidebarOpen: !prevState.isSidebarOpen
      }));
  };


    // 모달창 열기
    openModal = () => {
      this.setState({ showModal: true });
    }

    // 모달창 닫기
    closeModal = () => {
      this.setState({ showModal: false });
    }

      componentDidMount() {

        this.fetchData(this.state.currentPage);



        axios.post('/api/user')
        .then(res => {
          const userdata = res.data;
          console.log(userdata.role);
        
          // 사용자의 role이 null이거나 "ROLE_USER"인 경우에만 페이지 이동
          
            this.setState({ username: userdata.username }); // 사용자 이름 가져오기
          
        })
        .catch(error => {
          // 사용자 데이터를 가져오는데 실패한 경우
          console.error("사용자 데이터를 가져오는데 실패하였습니다:", error);
        });   

        
        ClassicEditor
          .create(document.querySelector('#editor'), {
          })
          .then(editor => {
            this.editor = editor;
          })



          .catch(error => {
            console.error(error);
          });
    }

      componentWillUnmount() {
        if (this.editor) {
          this.editor.destroy().then(() => {
            this.editor = null;
          });
        }
      }

      handleFileChange(event) {
        const file = event.target.files[0];
        // 파일을 업로드하는 로직을 여기에 추가
      }

    // 데이터 가져오는 fetchData 메서드
    fetchData = (page) => {
    fetch(`http://localhost:8080/board/videoBoard?pageNum=${page}&amount=8`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          blogs: data.videoLists, // 전체 데이터
          pageSize: 8,
          totalPages: Math.ceil(data.page.total / 8), // 총 페이지 수
          currentPage: page, // 현재 선택된 페이지 번호
        });
      })
      .catch((error) => {
        console.error('Error fetching data : ', error);
      });
    };

    // 페이지 변경 처리를 위한 handlePageChange 메서드
    handlePageChange = (page) => {
    this.setState({ currentPage: page }, () => {
      this.fetchData(page);
    });
    };

    // 글 쓰기 - 썸네일 업로드
    handleFileChange(event) {
    const file = event.target.files[0];
    this.setState({ file: file });
    }

    // 제목 및 내용 입력값 변경 처리
    handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    };

    // 내용 및 URL 추출
    extractContentAndURL(editorData) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(editorData, 'text/html');

    let content = '';
    let url = '';

    // URL 추출
    const editorContent = doc.body.cloneNode(true);
    const urlElements = editorContent.querySelectorAll('figure.media oembed');
    if (urlElements) {
      urlElements.forEach(element => {
        const urlValue = element.getAttribute('url');
        if (urlValue) {
          url += `<figure class="media"><oembed url="${urlValue}"></oembed></figure>\n`;
        }
        const figureMedia = element.closest('figure.media');
        if (figureMedia) {
          figureMedia.parentNode.removeChild(figureMedia);
        }
      });
    }

    // 내용 추출
    content = editorContent.innerHTML.trim();

    return { content, url };
    }

    // 글쓰기 폼 제출 처리
    handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const { content, url } = this.extractContentAndURL(this.editor.getData());

    formData.append('file', this.state.file);
    formData.append('title', this.state.title);
    formData.append('contents', content);
    formData.append('url', url);
    formData.append('username', this.state.username);

    try {
      const response = await axios.post('/api/videoBoardPost',formData); 
      alert("등록되었습니다.");
      this.closeModal();
      window.location.reload();
    } catch (error) {
      console.error('등록 실패:', error);
    }
    };



  render() {

      // 스타일 정의
      const sidebarStyle = {
        width: "250px", // 네비게이션 바의 기본 너비
        transition: "width 0.3s ease" // 너비 변화에 대한 전환 효과 설정
    };

    const rotateStyle = {
        transform: "rotate(180deg)" // 토글 버튼 회전 효과
    };

    // 네비게이션 바의 토글 상태에 따른 스타일
    const toggledSidebarStyle = {
        width: "300px",
    };

    const { blogs, currentPage, totalPages,showDashboardSubMenu, showContentManagementSubMenu,showInformationManagementSubMenu,showAccountManagementSubMenu,isSidebarOpen } = this.state;


    return (
      <React.Fragment>
       <div className={`page-wrapper ${isSidebarOpen ? "" : "toggled"}`}>
  
      {/* SIDEBAR */}    
      <nav id="sidebar" className="sidebar-wrapper sidebar-dark" style={isSidebarOpen ? sidebarStyle : toggledSidebarStyle}>
                <div className="sidebar-content" data-simplebar style={{ height: 'calc(100% - 60px)' }}>
                    <div className="sidebar-brand">
                    <Link to="/index-blog">
                            <img src={logoDark} height="24" className="logo-light-mode" alt=""/>
                            <img src={logoLight}height="24" className="logo-dark-mode" alt=""/>
                            <span className="sidebar-colored">
                                <img src={logoLight} height="24" alt=""/>
                            </span>
                      </Link>
                    </div>
        
                    <ul className="sidebar-menu">
                        <li className="sidebar-dropdown">
                            <a href="javascript:void(0)" onClick={this.toggleDashboardSubMenu}><i className="ti ti-home me-2"></i>대시보드</a>
                            {showDashboardSubMenu && (
                                <div>
                                    <ul>
                                        <li><Link to="/page-chat">통계데이터</Link></li>
                                    </ul>
                                </div>
                            )}
                        </li>
                      
                        
                     
                        <li className="sidebar-dropdown">
                            <a href="javascript:void(0)" onClick={this.toggleContentManagementSubMenu}><i className="ti ti-brand-youtube me-2"></i>콘텐츠 관리</a>
                            {showContentManagementSubMenu && (
                            <div>
                                <ul>
                                <li><Link to="/page-invoice">아카이브 콘텐츠</Link></li>
                                <li><Link to="javascript:void(0)">VR 콘텐츠</Link></li>
                                <li><Link to="javascript:void(0)">AR 콘텐츠</Link></li>
                                <li><Link to="/page-payments">동영상 콘텐츠</Link></li>
                                </ul>
                            </div>
                            )}
                        </li>
                       
                        <li className="sidebar-dropdown">
                            <a href="javascript:void(0)" onClick={this.toggleInformationManagementSubMenu}><i className="ti ti-address-book me-2"></i>기준정보 관리</a>
                            {showInformationManagementSubMenu && (
                            <div>
                                <ul>
                                    <li><a href="javascript:void(0)">아이콘 관리</a></li>
                                    <li><a href="javascript:void(0)">코드 관리</a></li>
                                    <li><a href="javascript:void(0)">지도 정보 관리</a></li>
                                </ul>
                            </div>
                            )}
                        </li>
                        <li className="sidebar-dropdown">
                            <a href="javascript:void(0)" onClick={this.toggleAccountManagementSubMenu}><i className="ti ti-users me-2"></i>계정 관리</a>
                            {showAccountManagementSubMenu && (
                            <div>
                                <ul>
                                    <li><Link to="/page-profile">계정 권한 관리</Link></li>
                                </ul>
                            </div>
                            )}
                        </li>
                    </ul>
                   
                 </div>
      
           

            </nav>
  
      {/* MAIN */}
      <main className="page-content bg-light">
        {/* HEADER */}
        <div className="top-header">
          <div className="header-bar d-flex justify-content-between">
              <div className="d-flex align-items-center">
                  <a href="#" className="logo-icon me-3">
                      <img src={logoIcon} height="30" className="small" alt=""/>
                      <span className="big">
                          <img src={logoDark} height="24" className="logo-light-mode" alt=""/>
                          <img src={logoLight} height="24" className="logo-dark-mode" alt=""/>
                      </span>
                  </a>
                  <a id="close-sidebar" className="btn btn-icon btn-soft-light" style={rotateStyle} onClick={this.handleSidebarToggle}>
                  <i className="ti ti-menu-2"></i>
                </a>
                  <div className="search-bar p-0 d-none d-md-block ms-2">
              
                  </div>
              </div>
                
              <ul className="list-unstyled mb-0">
              
                  <li className="list-inline-item mb-0 ms-1">
                      <div className="dropdown dropdown-primary">
                          
              
              
                          <div className="dropdown-menu dd-menu shadow rounded border-0 mt-3 p-0" data-simplebar style={{ height: '320px', width: '290px' }}>
                              <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                                  <h6 className="mb-0 text-dark">Notifications</h6>
                                  <span className="badge bg-soft-danger rounded-pill">3</span>
                              </div>
                              <div className="p-3">
                                  <a href="#!" className="dropdown-item features feature-primary key-feature p-0">
                                      <div className="d-flex align-items-center">
                                          <div className="icon text-center rounded-circle me-2">
                                              <i className="ti ti-shopping-cart"></i>
                                          </div>
                                          <div className="flex-1">
                                              <h6 className="mb-0 text-dark title">Order Complete</h6>
                                              <small className="text-muted">15 min ago</small>
                                          </div>
                                      </div>
                                  </a>
                  
                                  <a href="#!" className="dropdown-item features feature-primary key-feature p-0 mt-3">
                                      <div className="d-flex align-items-center">
                                          <img src={c04} className="avatar avatar-md-sm rounded-circle border shadow me-2" alt=""/>
                                          <div className="flex-1">
                                              <h6 className="mb-0 text-dark title"><span className="fw-bold">Message</span> from Luis</h6>
                                              <small className="text-muted">1 hour ago</small>
                                          </div>
                                      </div>
                                  </a>
                  
                                  <a href="#!" className="dropdown-item features feature-primary key-feature p-0 mt-3">
                                      <div className="d-flex align-items-center">
                                          <div className="icon text-center rounded-circle me-2">
                                              <i className="ti ti-currency-dollar"></i>
                                          </div>
                                          <div className="flex-1">
                                              <h6 className="mb-0 text-dark title"><span className="fw-bold">One Refund Request</span></h6>
                                              <small className="text-muted">2 hour ago</small>
                                          </div>
                                      </div>
                                  </a>
                              
                                  <a href="#!" className="dropdown-item features feature-primary key-feature p-0 mt-3">
                                      <div className="d-flex align-items-center">
                                          <div className="icon text-center rounded-circle me-2">
                                              <i className="ti ti-truck-delivery"></i>
                                          </div>
                                          <div className="flex-1">
                                              <h6 className="mb-0 text-dark title">Deliverd your Order</h6>
                                              <small className="text-muted">Yesterday</small>
                                          </div>
                                      </div>
                                  </a>
                  
                                  <a href="#!" className="dropdown-item features feature-primary key-feature p-0 mt-3">
                                      <div className="d-flex align-items-center">
                                          <img src={c15} className="avatar avatar-md-sm rounded-circle border shadow me-2" alt=""/>
                                          <div className="flex-1">
                                              <h6 className="mb-0 text-dark title"><span className="fw-bold">Cally</span> started following you</h6>
                                              <small className="text-muted">2 days ago</small>
                                          </div>
                                      </div>
                                  </a>
                              </div>
                          </div>
                      </div>
                  </li>
              
                  <li className="list-inline-item mb-0 ms-1">
                      <div className="dropdown dropdown-primary">
                          <button type="button" className="btn btn-soft-light dropdown-toggle p-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={c05} className="avatar avatar-ex-small rounded" alt=""/></button>
                          <div className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3" style={{ minWidth: '200px' }}>
                              <a className="dropdown-item d-flex align-items-center text-dark pb-3" href="javascript:void(0)">
                                  <img src={c05} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                  <div className="flex-1 ms-2">
                                    {/* 관리자 해당 이름 */}
                                  <span className="d-block">{this.state.username}</span>
                                  </div>
                              </a>
                                {/* 로그아웃 버튼 */}
                                <a className="dropdown-item text-dark" onClick={this.handleLogout} href="javascript:void(0)"><span className="mb-0 d-inline-block me-1"><i className="ti ti-logout"></i></span> Logout</a>
                          </div>
                      </div>
                  </li>
              </ul>
          </div>
        </div>
              
        {/* CONTENT */}
        <div className="container-fluid">
          <div className="layout-specing">
            <div className="d-md-flex justify-content-between">
              <div>
                  <h5 className="mb-0">동영상 콘텐츠</h5>
  
                  <nav aria-label="breadcrumb" className="d-inline-block mt-1">
                      <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                          <li className="breadcrumb-item text-capitalize">콘텐츠 관리</li>
                          <li className="breadcrumb-item text-capitalize active" aria-current="page">동영상 콘텐츠</li>
                      </ul>
                  </nav>
              </div>
  
              {/* MODAL_글 쓰기 */}
              <div className="modal fade" id="newblogadd" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header border-bottom p-3">
                      <h5 className="modal-title" id="exampleModalLabel">동영상 컨텐츠 등록</h5>
                      <button type="button" className="btn btn-icon btn-close" data-bs-dismiss="modal" id="close-modal"><i className="uil uil-times fs-4 text-dark"></i></button>
                    </div>
  
                    <div className="modal-body p-3 pt-4">
                      <div className="row">
                
                          <div className="col-12">
                            <div className="mb-3">
                            <input className="form-control" placeholder="제목" name="title" value={this.state.title} onChange={this.handleChange} />
                            </div>
                          </div>
  
                          <div className="col-12">
                            <div className="preview-box d-block justify-content-center rounded shadow overflow-hidden bg-light p-1"></div>
                            <input type="file" id="input-file" name="input-file" accept="image/*" onChange={this.handleFileChange} />
                            <textarea id="editor" name="contents" value={this.state.contents} onChange={(e) => this.setState({ contents: e.target.value })} />
                          </div>
                       
  
                        <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>등록</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          
              {/* 없애기 */}
              <div className="modal fade" id="compose-mail" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header border-bottom p-3">
                            <h5 className="modal-title" id="exampleModalLabel">글쓰기</h5>
                            <button type="button" className="btn btn-icon btn-close" data-bs-dismiss="modal" id="close-modal"><i className="uil uil-times fs-4 text-dark"></i></button>
                        </div>
                        <div className="modal-body p-3 pt-4">
                            <form>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <input  className="form-control" placeholder="제목"/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                      <div id="editor">
                                        <p>
                                          Hello,<br/><br/> If the distribution of letters and 'words' is random, the reader will not be distracted from making a neutral judgement on the visual impact and readability of the typefaces (typography), or the distribution of text on the page (layout or type area). <br/><br/>Thank you
                                        </p>
                                      </div>
                                      {/* <div className="ck ck-reset ck-editor ck-rounded-corners" role="application" dir="ltr" lang="en" aria-labelledby="ck-editor__label_eb476c68c5714ecd5006551d94a41e8a9">
                                        <label className="ck ck-label ck-voice-label" id="ck-editor__label_eb476c68c5714ecd5006551d94a41e8a9">Rich Text Editor</label>
                                        <div className="ck ck-editor__top ck-reset_all" role="presentation">
                                          <div className="ck ck-sticky-panel">
                                            <div className="ck ck-sticky-panel__placeholder" style={{ display: 'none' }}></div>
                                            <div className="ck ck-sticky-panel__content">
                                              <div className="ck ck-toolbar ck-toolbar_grouping" role="toolbar" aria-label="Editor toolbar" tabIndex="-1">
                                                <div className="ck ck-toolbar__items">
                                                  <button className="ck ck-button ck-disabled ck-off" type="button" tabIndex="-1" aria-labelledby="ck-editor__aria-label_ea39853c445246df3bffce368e02d8f6b" aria-disabled="true" data-cke-tooltip-text="Undo (Ctrl+Z)" data-cke-tooltip-position="s">
                                                    <svg className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20">
                                                      <path d="m5.042 9.367 2.189 1.837a.75.75 0 0 1-.965 1.149l-3.788-3.18a.747.747 0 0 1-.21-.284.75.75 0 0 1 .17-.945L6.23 4.762a.75.75 0 1 1 .964 1.15L4.863 7.866h8.917A.75.75 0 0 1 14 7.9a4 4 0 1 1-1.477 7.718l.344-1.489a2.5 2.5 0 1 0 1.094-4.73l.008-.032H5.042z"></path>
                                                    </svg>
                                                    <span className="ck ck-button__label" id="ck-editor__aria-label_ea39853c445246df3bffce368e02d8f6b">Undo</span>
                                                  </button>
                                                  <button className="ck ck-button ck-disabled ck-off" type="button" tabIndex="-1" aria-labelledby="ck-editor__aria-label_e806c3bb50d11ee06e2d3b54271a6987c" aria-disabled="true" data-cke-tooltip-text="Redo (Ctrl+Y)" data-cke-tooltip-position="s">
                                                    <svg className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20">
                                                      <path d="m14.958 9.367-2.189 1.837a.75.75 0 0 0 .965 1.149l3.788-3.18a.747.747 0 0 0 .21-.284.75.75 0 0 0-.17-.945L13.77 4.762a.75.75 0 1 0-.964 1.15l2.331 1.955H6.22A.75.75 0 0 0 6 7.9a4 4 0 1 0 1.477 7.718l-.344-1.489A2.5 2.5 0 1 1 6.039 9.4l-.008-.032h8.927z"></path>
                                                    </svg>
                                                    <span className="ck ck-button__label" id="ck-editor__aria-label_e806c3bb50d11ee06e2d3b54271a6987c">Redo</span>
                                                  </button>
                                                  <span className="ck ck-toolbar__separator"></span>
                                                  <div className="ck ck-dropdown ck-heading-dropdown">
                                                    <button className="ck ck-button ck-off ck-button_with-text ck-dropdown__button" type="button" tabIndex="-1" aria-label="Heading" data-cke-tooltip-text="Heading" data-cke-tooltip-position="s" aria-haspopup="true" aria-expanded="false">
                                                      <span className="ck ck-button__label">Paragraph</span>
                                                      <svg className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-dropdown__arrow" viewBox="0 0 10 10">
                                                        <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path>
                                                      </svg>
                                                    </button>
                                                    <div className="ck ck-reset ck-dropdown__panel ck-dropdown__panel_se" tabIndex="-1"></div>
                                                  </div>
                                                  <span className="ck ck-toolbar__separator"></span>
                                                  <button className="ck ck-button ck-off" type="button" tabIndex="-1" aria-labelledby="ck-editor__aria-label_ecf99fccd2dfe12944adb84fcead6b71d" aria-pressed="false" data-cke-tooltip-text="Bold (Ctrl+B)" data-cke-tooltip-position="s">
                                                    <svg className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20">
                                                      <path d="M10.187 17H5.773c-.637 0-1.092-.138-1.364-.415-.273-.277-.409-.718-.409-1.323V4.738c0-.617.14-1.062.419-1.332.279-.27.73-.406 1.354-.406h4.68c.69 0 1.288.041 1.793.124.506.083.96.242 1.36.478.341.197.644.447.906.75a3.262 3.262 0 0 1 .808 2.162c0 1.401-.722 2.426-2.167 3.075C15.05 10.175 16 11.315 16 13.01a3.756 3.756 0 0 1-2.296 3.504 6.1 6.1 0 0 1-1.517.377c-.571.073-1.238.11-2 .11zm-.217-6.217H7v4.087h3.069c1.977 0 2.965-.69 2.965-2.072 0-.707-.256-1.22-.768-1.537-.512-.319-1.277-.478-2.296-.478zM7 5.13v3.619h2.606c.729 0 1.292-.067 1.69-.2a1.6 1.6 0 0 0 .91-.765c.165-.267.247-.566.247-.897 0-.707-.26-1.176-.778-1.409-.519-.232-1.31-.348-2.375-.348H7z"></path>
                                                    </svg>
                                                    <span className="ck ck-button__label" id="ck-editor__aria-label_ecf99fccd2dfe12944adb84fcead6b71d">Bold</span>
                                                  </button>
                                                  <button className="ck ck-button ck-off" type="button" tabIndex="-1" aria-labelledby="ck-editor__aria-label_e298380abd37d17c70ba636693de9bd30" aria-pressed="false" data-cke-tooltip-text="Italic (Ctrl+I)" data-cke-tooltip-position="s">
                                                    <svg className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20">
                                                      <path d="m9.586 14.633.021.004c-.036.335.095.655.393.962.082.083.173.15.274.201h1.474a.6.6 0 1 1 0 1.2H5.304a.6.6 0 0 1 0-1.2h1.15c.474-.07.809-.182 1.005-.334.157-.122.291-.32.404-.597l2.416-9.55a1.053 1.053 0 0 0-.281-.823 1.12 1.12 0 0 0-.442-.296H8.15a.6.6 0 0 1 0-1.2h6.443a.6.6 0 1 1 0 1.2h-1.195c-.376.056-.65.155-.823.296-.215.175-.423.439-.623.79l-2.366 9.347z"></path>
                                                    </svg>
                                                    <span className="ck ck-button__label" id="ck-editor__aria-label_e298380abd37d17c70ba636693de9bd30">Italic</span>
                                                  </button>
                                                  <span className="ck ck-toolbar__separator"></span>
                                                  <button className="ck ck-button ck-off" type="button" tabIndex="-1" aria-labelledby="ck-editor__aria-label_e89adb1bb96063b866033b4957a979a5d" aria-pressed="false" data-cke-tooltip-text="Link (Ctrl+K)" data-cke-tooltip-position="s">
                                                    <svg className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20">
                                                      <path d="m11.077 15 .991-1.416a.75.75 0 1 1 1.229.86l-1.148 1.64a.748.748 0 0 1-.217.206 5.251 5.251 0 0 1-8.503-5.955.741.741 0 0 1 .12-.274l1.147-1.639a.75.75 0 1 1 1.228.86L4.933 10.7l.006.003a3.75 3.75 0 0 0 6.132 4.294l.006.004zm5.494-5.335a.748.748 0 0 1-.12.274l-1.147 1.639a.75.75 0 1 1-1.228-.86l.86-1.23a3.75 3.75 0 0 0-6.144-4.301l-.86 1.229a.75.75 0 0 1-1.229-.86l1.148-1.64a.748.748 0 0 1 .217-.206 5.251 5.251 0 0 1 8.503 5.955zm-4.563-2.532a.75.75 0 0 1 .184 1.045l-3.155 4.505a.75.75 0 1 1-1.229-.86l3.155-4.506a.75.75 0 0 1 1.045-.184z"></path>
                                                    </svg>
                                                    <span className="ck ck-button__label" id="ck-editor__aria-label_e89adb1bb96063b866033b4957a979a5d">Link</span>
                                                  </button>
                                                  <button className="ck ck-button ck-off ck-file-dialog-button" type="button" tabIndex="-1" aria-labelledby="ck-editor__aria-label_e9ab6675b0021ba4f1280ad1d66961761" data-cke-tooltip-text="Upload image from computer" data-cke-tooltip-position="s">
                                                    <svg className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20">
                                                      <path d="M1.201 1C.538 1 0 1.47 0 2.1v14.363c0 .64.534 1.037 1.186 1.037h9.494a2.97 2.97 0 0 1-.414-.287 2.998 2.998 0 0 1-1.055-2.03 3.003 3.003 0 0 1 .693-2.185l.383-.455-.02.018-3.65-3.41a.695.695 0 0 0-.957-.034L1.5 13.6V2.5h15v5.535a2.97 2.97 0 0 1 1.412.932l.088.105V2.1c0-.63-.547-1.1-1.2-1.1H1.202Zm11.713 2.803a2.146 2.146 0 0 0-2.049 1.992 2.14 2.14 0 0 0 1.28 2.096 2.13 2.13 0 0 0 2.644-3.11 2.134 2.134 0 0 0-1.875-.978Z"></path>
                                                      <path d="M15.522 19.1a.79.79 0 0 0 .79-.79v-5.373l2.059 2.455a.79.79 0 1 0 1.211-1.015l-3.352-3.995a.79.79 0 0 0-.995-.179.784.784 0 0 0-.299.221l-3.35 3.99a.79.79 0 1 0 1.21 1.017l1.936-2.306v5.185c0 .436.353.79.79.79Z"></path><path d="M15.522 19.1a.79.79 0 0 0 .79-.79v-5.373l2.059 2.455a.79.79 0 1 0 1.211-1.015l-3.352-3.995a.79.79 0 0 0-.995-.179.784.784 0 0 0-.299.221l-3.35 3.99a.79.79 0 1 0 1.21 1.017l1.936-2.306v5.185c0 .436.353.79.79.79Z"></path>
                                                    </svg>
                                                    <span className="ck ck-button__label" id="ck-editor__aria-label_e9ab6675b0021ba4f1280ad1d66961761">Upload image from computer</span>
                                                    <input className="ck-hidden" type="file" tabIndex="-1" accept="image/jpeg,image/png,image/gif,image/bmp,image/webp,image/tiff" multiple="true"/>
                                                  </button>
                                                  <div className="ck ck-dropdown">
                                                    <button className="ck ck-button ck-off ck-dropdown__button" type="button" tabIndex="-1" aria-labelledby="ck-editor__aria-label_ec0edbe9a705a916f2d53da63c75fd2ef" data-cke-tooltip-text="Insert table" data-cke-tooltip-position="s" aria-haspopup="true" aria-expanded="false">
                                                      <svg className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20">
                                                        <path d="M3 5.5v3h4v-3H3Zm0 4v3h4v-3H3Zm0 4v3h4v-3H3Zm5 3h4v-3H8v3Zm5 0h4v-3h-4v3Zm4-4v-3h-4v3h4Zm0-4v-3h-4v3h4Zm1.5 8A1.5 1.5 0 0 1 17 18H3a1.5 1.5 0 0 1-1.5-1.5V3c.222-.863 1.068-1.5 2-1.5h13c.932 0 1.778.637 2 1.5v13.5Zm-6.5-4v-3H8v3h4Zm0-4v-3H8v3h4Z"></path>
                                                      </svg>
                                                      <span className="ck ck-button__label" id="ck-editor__aria-label_ec0edbe9a705a916f2d53da63c75fd2ef">Insert table</span>
                                                      <svg className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-dropdown__arrow" viewBox="0 0 10 10">
                                                        <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path>
                                                      </svg>
                                                    </button>
                                                    <div className="ck ck-reset ck-dropdown__panel ck-dropdown__panel_se" tabIndex="-1"></div>
                                                  </div>
                                                  <button className="ck ck-button ck-off" type="button" tabIndex="-1" aria-labelledby="ck-editor__aria-label_eb3cbbd34f647546c16c0e953e22389ce" aria-pressed="false" data-cke-tooltip-text="Block quote" data-cke-tooltip-position="s">
                                                    <svg className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20">
                                                      <path d="M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z"></path>
                                                    </svg>
                                                    <span className="ck ck-button__label" id="ck-editor__aria-label_eb3cbbd34f647546c16c0e953e22389ce">Block quote</span>
                                                  </button>
                                                  <div className="ck ck-dropdown">
                                                    <button className="ck ck-button ck-off ck-dropdown__button" type="button" tabIndex="-1" aria-labelledby="ck-editor__aria-label_e3c60bdf4c63fbf63dc5ac4fdf96d5777" data-cke-tooltip-text="Insert media" data-cke-tooltip-position="s" aria-haspopup="true" aria-expanded="false">
                                                      <svg className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 22 20">
                                                        <path d="M1.587 1.5c-.612 0-.601-.029-.601.551v14.84c0 .59-.01.559.591.559h18.846c.602 0 .591.03.591-.56V2.052c0-.58.01-.55-.591-.55H1.587Zm.701.971h1.003v1H2.288v-1Zm16.448 0h1.003v1h-1.003v-1Zm-14.24 1h13.008v12H4.467l.029-12Zm-2.208 1h1.003v1H2.288v-1Zm16.448 0h1.003v1h-1.003v-1Zm-16.448 2h1.003v1H2.288v-1Zm16.448 0h1.003v1h-1.003v-1Zm-16.448 2h1.003v1H2.288v-1Zm16.448 0h1.003v1h-1.003v-1Zm-16.448 2h1.003v1H2.288v-1Zm16.448 0h1.003v1h-1.003v-1Zm-16.448 2h1.003l-.029 1h-.974v-1Zm16.448 0h1.003v1h-1.003v-1Zm-16.448 2h.974v1h-.974v-1Zm16.448 0h1.003v1h-1.003v-1Z"></path>
                                                        <path d="M8.374 6.648a.399.399 0 0 1 .395-.4.402.402 0 0 1 .2.049l5.148 2.824a.4.4 0 0 1 0 .7l-5.148 2.824a.403.403 0 0 1-.595-.35V6.648Z"></path>
                                                      </svg>
                                                      <span className="ck ck-button__label" id="ck-editor__aria-label_e3c60bdf4c63fbf63dc5ac4fdf96d5777">Insert media</span>
                                                      <svg className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-dropdown__arrow" viewBox="0 0 10 10">
                                                        <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path>
                                                      </svg>
                                                    </button>
                                                    <div className="ck ck-reset ck-dropdown__panel ck-dropdown__panel_se" tabIndex="-1"></div>
                                                  </div>
                                                  <span className="ck ck-toolbar__separator"></span>
                                                  <button className="ck ck-button ck-off" type="button" tabIndex="-1" aria-labelledby="ck-editor__aria-label_eb8f8bfc4b6aabbed43c2e908e7d2da96" aria-pressed="false" data-cke-tooltip-text="Bulleted List" data-cke-tooltip-position="s">
                                                    <svg className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20">
                                                      <path d="M7 5.75c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zm-6 0C1 4.784 1.777 4 2.75 4c.966 0 1.75.777 1.75 1.75 0 .966-.777 1.75-1.75 1.75C1.784 7.5 1 6.723 1 5.75zm6 9c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zm-6 0c0-.966.777-1.75 1.75-1.75.966 0 1.75.777 1.75 1.75 0 .966-.777 1.75-1.75 1.75-.966 0-1.75-.777-1.75-1.75z"></path>
                                                    </svg>
                                                    <span className="ck ck-button__label" id="ck-editor__aria-label_eb8f8bfc4b6aabbed43c2e908e7d2da96">Bulleted List</span>
                                                  </button>
                                                  <button className="ck ck-button ck-off" type="button" tabIndex="-1" aria-labelledby="ck-editor__aria-label_e477568d4e5904fc144083f3781889db6" aria-pressed="false" data-cke-tooltip-text="Numbered List" data-cke-tooltip-position="s">
                                                    <svg className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20">
                                                      <path d="M7 5.75c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zM3.5 3v5H2V3.7H1v-1h2.5V3zM.343 17.857l2.59-3.257H2.92a.6.6 0 1 0-1.04 0H.302a2 2 0 1 1 3.995 0h-.001c-.048.405-.16.734-.333.988-.175.254-.59.692-1.244 1.312H4.3v1h-4l.043-.043zM7 14.75a.75.75 0 0 1 .75-.75h9.5a.75.75 0 1 1 0 1.5h-9.5a.75.75 0 0 1-.75-.75z"></path>
                                                    </svg>
                                                    <span className="ck ck-button__label" id="ck-editor__aria-label_e477568d4e5904fc144083f3781889db6">Numbered List</span>
                                                  </button>
                                                  <button className="ck ck-button ck-disabled ck-off" type="button" tabIndex="-1" aria-labelledby="ck-editor__aria-label_e6538beb29a343c30e33424f3ffd0e4bc" aria-disabled="true" data-cke-tooltip-text="Decrease indent" data-cke-tooltip-position="s">
                                                    <svg className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20">
                                                      <path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm5 6c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zM2.75 16.5h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 1 0 0 1.5zm1.618-9.55L.98 9.358a.4.4 0 0 0 .013.661l3.39 2.207A.4.4 0 0 0 5 11.892V7.275a.4.4 0 0 0-.632-.326z"></path>
                                                    </svg>
                                                    <span className="ck ck-button__label" id="ck-editor__aria-label_e6538beb29a343c30e33424f3ffd0e4bc">Decrease indent</span>
                                                  </button>
                                                  <button className="ck ck-button ck-disabled ck-off" type="button" tabIndex="-1" aria-labelledby="ck-editor__aria-label_eb69b2b2c585a52f889da52078ff28ca0" aria-disabled="true" data-cke-tooltip-text="Increase indent" data-cke-tooltip-position="s">
                                                    <svg className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon" viewBox="0 0 20 20">
                                                      <path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm5 6c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zM2.75 16.5h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 1 0 0 1.5zM1.632 6.95 5.02 9.358a.4.4 0 0 1-.013.661l-3.39 2.207A.4.4 0 0 1 1 11.892V7.275a.4.4 0 0 1 .632-.326z"></path>
                                                    </svg>
                                                    <span className="ck ck-button__label" id="ck-editor__aria-label_eb69b2b2c585a52f889da52078ff28ca0">Increase indent</span>
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="ck ck-editor__main" role="presentation">
                                          <div className="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred" lang="en" dir="ltr" role="textbox" aria-label="Editor editing area: main. Press Alt+0 for help." contentEditable="true">
                                            <p>Hello,<br/><br/>If the distribution of letters and 'words' is random, the reader will not be distracted from making a neutral judgement on the visual impact and readability of the typefaces (typography), or the distribution of text on the page (layout or type area).&nbsp;<br/><br/>Thank you</p>
                                          </div>
                                        </div>
                                      </div> */}
                                    </div>
                                    <div className="col-12 mt-4">
                                        <button type="submit" className="btn btn-primary">저장</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                      </div>
                    </div>
              </div>
        
              {/* ???? */}
              <div className="offcanvas offcanvas-end shadow" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header p-4 border-bottom">
                  <h5 id="offcanvasLeftLabel" className="mb-0">
                    <img src={logoDark} height="24" className="logo-light-mode" alt=""/>
                    <img src={logoLight} height="24" className="logo-dark-mode" alt=""/>
                  </h5>
  
                  <button type="button" className="btn-close d-flex align-items-center text-dark" data-bs-dismiss="offcanvas" aria-label="Close"><i className="uil uil-times fs-4"></i></button>
                </div>
  
                <div className="offcanvas-body p-4">
                  <div className="row">
                    <div className="col-12">
                      <div className="text-center">
                        <h6 className="fw-bold">Theme Options</h6>
  
                        <ul className="text-center style-switcher list-unstyled mt-4">
                          <li className="d-grid"><a href="javascript:void(0)" className="rtl-version t-rtl-light" onClick="setTheme('style-rtl')"><img src={rtl} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">RTL Version</span></a></li>
                          <li className="d-grid"><a href="javascript:void(0)" className="ltr-version t-ltr-light" onClick="setTheme('style')"><img src={ltr} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">/LTR Version</span></a></li>
                          <li className="d-grid"><a href="javascript:void(0)" className="dark-rtl-version t-rtl-dark" onClick="setTheme('style-dark-rtl')"><img src={rtl}  className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">RTL Version</span></a></li>
                          <li className="d-grid"><a href="javascript:void(0)" className="dark-ltr-version t-ltr-dark" onClick="setTheme('style-dark')"><img src={dark} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">LTR Version</span></a></li>
                          <li className="d-grid"><a href="javascript:void(0)" className="dark-version t-dark mt-4" onClick="setTheme('style-dark')"><img src={dark} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">Dark Version</span></a></li>
                          <li className="d-grid"><a href="javascript:void(0)" className="light-version t-light mt-4" onClick="setTheme('style')"><img src={ltr} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">Light Version</span></a></li>
                          <li className="d-grid"><a href="javascript:void(0)" target="_blank" rel="noreferrer" className="mt-4"><img src={landing} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">Landing</span></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="offcanvas-footer p-4 border-top text-center">
                  <ul className="list-unstyled social-icon social mb-0">
                    <li className="list-inline-item mb-0"><a href="https://1.envato.market/landrick" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-shopping-cart align-middle" title="Buy Now"></i></a></li>
                    <li className="list-inline-item mb-0"><a href="https://dribbble.com/shreethemes" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-dribbble align-middle" title="dribbble"></i></a></li>
                    <li className="list-inline-item mb-0"><a href="https://www.behance.net/shreethemes" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-behance align-middle" title="behance"></i></a></li>
                    <li className="list-inline-item mb-0"><a href="https://www.facebook.com/shreethemes" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-facebook-f align-middle" title="facebook"></i></a></li>
                    <li className="list-inline-item mb-0"><a href="https://www.instagram.com/shreethemes/" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-instagram align-middle" title="instagram"></i></a></li>
                    <li className="list-inline-item mb-0"><a href="https://twitter.com/shreethemes" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-twitter align-middle" title="twitter"></i></a></li>
                    <li className="list-inline-item mb-0"><a href="mailto:support@shreethemes.in" className="rounded"><i className="uil uil-envelope align-middle" title="email"></i></a></li>
                    <li className="list-inline-item mb-0"><a href="https://shreethemes.in" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-globe align-middle" title="website"></i></a></li>
                  </ul>
                </div>
              </div>
        
              {/* BUTTON */}
              <div className="mt-4 mt-sm-0">
                <a href="javascript:void(0)" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newblogadd"><i className="uil uil-plus me-1"></i> 글 쓰기</a>
              </div>
            </div>
        
            {/* BOARD */}
            <div className="row">
              {blogs.map((blog, key) => (
                <div className="col-xl-3 col-lg-4 col-md-6 mt-4" key={key} name="blog">
                  <div className="card blog blog-primary rounded border-0 shadow overflow-hidden">
                    <div className="position-relative">
                      <img src={blog.videoThumbnailImgUrl} className="card-img-top" alt="..." style={{ width: '100%', height: '235px'}}/>
                      <div className="overlay rounded-top"></div>
                    </div>
                      
                    <div className="card-body content">
                      <h5><a href="javascript:void(0)" className="card-title title text-dark">{blog.videoBoardTitle}</a></h5>
                      <div className="post-meta d-flex justify-content-between mt-3" style={{ width: '300px' }}>
                      <Link to={`/page-works2/${blog.videoBoardNo}`} className="btn btn-primary" style={{ width: '90px', height: '40px', fontSize: '12px' }}> 수정</Link>
                      <button 
                              className="btn btn-primary" 
                              style={{ width: '90px', height: '40px', fontSize: '12px' }}
                              onClick={() => this.handleDeleteVr(blog.videoBoardNo)} // 해당 게시물의 번호를 전달
                            >
                              삭제
                        </button>
                      </div>
                    </div>
                  
                    <div className="author">
                      <small className="text-white user d-block"><i className="uil uil-user"></i>{blog.videoWriter}</small>
                      <small className="text-white date"><i className="uil uil-calendar-alt"></i>{blog.videoRegdate.slice(0, 10)}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          
            {/* PAGINATION */}
            <div className="row">
              <div className="col-12 mt-4">
              <Pagination listClassName="justify-content-center mb-0">
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink
                    onClick={() => this.handlePageChange(currentPage - 1)}
                    previous
                  />
                </PaginationItem>
  
                {[...Array(totalPages).keys()].map((page) => {
                  if (
                    page + 1 === currentPage ||
                    page + 1 === currentPage - 1 ||
                    page + 1 === currentPage + 1 ||
                    (currentPage === 1 && page < 3) ||
                    (currentPage === totalPages && page >= totalPages - 3)
                  ) {
                    return (
                      <PaginationItem
                        key={page}
                        active={page + 1 === currentPage}
                      >
                        <PaginationLink
                          onClick={() => this.handlePageChange(page + 1)}
                        >
                          {page + 1}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  return null;
                })}
  
                <PaginationItem disabled={currentPage === totalPages}>
                  <PaginationLink
                    onClick={() => this.handlePageChange(currentPage + 1)}
                    next
                  />
                </PaginationItem>
              </Pagination>
              </div>
            </div>
          </div>
        </div>
  
        {/* FOOTER */}
        <footer className="shadow py-3">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col">
                <div className="text-sm-start text-center mx-md-2">
                  <p className="mb-0 text-muted">© <script>document.write(new Date().getFullYear())</script> Landrick. Design with <i className="mdi mdi-heart text-danger"></i> by <a href="https://shreethemes.in/" target="_blank" rel="noreferrer" className="text-reset">Shreethemes</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
      </div>
  
          
          {/* ???? - 중복코드 */}
          <div className="offcanvas offcanvas-end shadow" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header p-4 border-bottom">
              <h5 id="offcanvasLeftLabel" className="mb-0">
                <img src={logoDark} height="24" className="light-version" alt=""/>
                <img src={logoLight}height="24" className="dark-version" alt=""/>
              </h5>
              <button type="button" className="btn-close d-flex align-items-center text-dark" data-bs-dismiss="offcanvas" aria-label="Close"><i className="uil uil-times fs-4"></i></button>
            </div>
  
            <div className="offcanvas-body p-4">
              <div className="row">
                <div className="col-12">
                  <div className="text-center">
                    <h6 className="fw-bold">Theme Options</h6>
                      <ul className="text-center style-switcher list-unstyled mt-4">
                        <li className="d-grid"><a href="javascript:void(0)" className="rtl-version t-rtl-light" onClick="setTheme('style-rtl')"><img src={rtl} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">RTL Version</span></a></li>
                        <li className="d-grid"><a href="javascript:void(0)" className="ltr-version t-ltr-light" onClick="setTheme('style')"><img src={ltr} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">LTR Version</span></a></li>
                        <li className="d-grid"><a href="javascript:void(0)" className="dark-rtl-version t-rtl-dark" onClick="setTheme('style-dark-rtl')"><img src={darkrtl} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">RTL Version</span></a></li>
                        <li className="d-grid"><a href="javascript:void(0)" className="dark-ltr-version t-ltr-dark" onClick="setTheme('style-dark')"><img src={dark} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">LTR Version</span></a></li>
                        <li className="d-grid"><a href="javascript:void(0)" className="dark-ltr-version t-ltr-dark" onClick="setTheme('style-dark')"><img src={dark} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">LTR Version</span></a></li>
                        <li className="d-grid"><a href="javascript:void(0)" className="dark-version t-dark mt-4" onClick="setTheme('style-dark')"><img src={dark} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">Dark Version</span></a></li>
                        <li className="d-grid"><a href="javascript:void(0)" className="light-version t-light mt-4" onClick="setTheme('style')"><img src={ltr} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">Light Version</span></a></li>
                        <li className="d-grid"><a href="javascript:void(0)" target="_blank" rel="noreferrer" className="mt-4"><img src={landing} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">Landing</span></a></li>
                      </ul>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="offcanvas-footer p-4 border-top text-center">
              <ul className="list-unstyled social-icon social mb-0">
                <li className="list-inline-item mb-0"><a href="https://1.envato.market/landrick" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-shopping-cart align-middle" title="Buy Now"></i></a></li>
                <li className="list-inline-item mb-0"><a href="https://dribbble.com/shreethemes" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-dribbble align-middle" title="dribbble"></i></a></li>
                <li className="list-inline-item mb-0"><a href="https://www.behance.net/shreethemes" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-behance align-middle" title="behance"></i></a></li>
                <li className="list-inline-item mb-0"><a href="https://www.facebook.com/shreethemes" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-facebook-f align-middle" title="facebook"></i></a></li>
                <li className="list-inline-item mb-0"><a href="https://www.instagram.com/shreethemes/" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-instagram align-middle" title="instagram"></i></a></li>
                <li className="list-inline-item mb-0"><a href="https://twitter.com/shreethemes" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-twitter align-middle" title="twitter"></i></a></li>
                <li className="list-inline-item mb-0"><a href="mailto:support@shreethemes.in" className="rounded"><i className="uil uil-envelope align-middle" title="email"></i></a></li>
                <li className="list-inline-item mb-0"><a href="https://shreethemes.in" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-globe align-middle" title="website"></i></a></li>
              </ul>
            </div>
          </div> 
      </React.Fragment>
      );
    }
  }
  
  export default PagePayments;