import React, { Component } from "react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';

import { Link } from "react-router-dom";

import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

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
import axios from 'axios';


class PageInvoice extends Component {

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

      // 글 삭제 
    handleDeleteVr = (vrBoardNo) => {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        axios.delete(`/api/deleteVr/${vrBoardNo}`)
          .then(response => {
            console.log('삭제 성공:', response);
            window.location.reload()
          })
          .catch(error => {
            console.error('삭제 실패:', error);
            console.log(vrBoardNo);
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

        this.fetchData(this.state.currentPage);

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
        fetch(`http://localhost:8080/board/vrBoard?pageNum=${page}&amount=8`)
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              blogs: data.vrLists, // 전체 데이터
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
          formData.append('file', this.state.file);
          formData.append('title', this.state.title);
          // formData.append('contents', this.editor.getData());

        const { content, url } = this.extractContentAndURL(this.editor.getData());
        formData.append('contents', content);
        formData.append('url', url);
        formData.append('username', this.state.username);

      try {
        const response = await axios.post('/api/post',formData);
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

            <main className="page-content bg-light">
            
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
                  <h5 className="mb-0">아카이브 콘텐츠</h5>
                    <nav aria-label="breadcrumb" className="d-inline-block mt-1">
                        <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                          <li className="breadcrumb-item text-capitalize">콘텐츠 관리</li>
                          <li className="breadcrumb-item text-capitalize active" aria-current="page">아카이브 콘텐츠</li>
                        </ul>
                    </nav>
                </div>

                {/* MODAL_글 쓰기 */}
                <div className="modal fade" id="newblogadd" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header border-bottom p-3">
                        <h5 className="modal-title" id="exampleModalLabel">아카이브 게시판 등록</h5>
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
                        <img src={blog.vrThumbnailImgUrl} className="card-img-top" alt="..." style={{ width: '100%', height: '235px'}}/>
                        <div className="overlay rounded-top"></div>
                      </div>

                      <div className="card-body content">
                        <h5><a href="javascript:void(0)" className="card-title title text-dark">{blog.vrBoardTitle}</a></h5>

                        {/* <div className="post-meta d-flex justify-content-between mt-3"> */}
                        <div className="post-meta d-flex justify-content-between mt-3" style={{ width: '300px' }}>
                        <Link to={`/page-works1/${blog.vrBoardNo}`} className="btn btn-primary" style={{ width: '90px', height: '40px', fontSize: '12px' }}> 수정</Link>
                        <button 
                              className="btn btn-primary" 
                              style={{ width: '90px', height: '40px', fontSize: '12px' }}
                              onClick={() => this.handleDeleteVr(blog.vrBoardNo)} // 해당 게시물의 번호를 전달
                            >
                              삭제
                        </button>
                        </div>
                        
                      </div>

                      <div className="author">
                        <small className="text-white user d-block"><i className="uil uil-user"></i>{blog.vrWriter}</small>
                        <small className="text-white date"><i className="uil uil-calendar-alt"></i>{blog.vrRegdate.slice(0, 10)}</small>
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

export default PageInvoice;