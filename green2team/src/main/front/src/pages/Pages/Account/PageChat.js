import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';


// import 'simplebar/dist/simplebar.min.css';
import logoDark from "../../../assets/images/logo-dark.png";
import logoLight from "../../../assets/images/logo-light.png";
import logoIcon from "../../../assets/images/logo-icon.png";
import c04 from "../../../assets/images/client/04.jpg";
import c05 from "../../../assets/images/client/05.jpg";
import c15 from "../../../assets/images/client/15.jpg";
import rtl from "../../../assets/images/demos/rtl.png";
import ltr from "../../../assets/images/demos/ltr.png";
import dark from "../../../assets/images/demos/dark.png";
import landing from "../../../assets/images/demos/landing.png";
import blog101 from "../../../assets/images/blog/101.png";

class PageChat extends Component {

     // 로그아웃 

     handleLogout = () => {
        axios.post('/api/logout', null, {
        withCredentials: true
        })
        .then(response => {
        window.location.href = '/index-blog'; // 홈페이지로 이동
        })
        .catch(error => {
        console.error('로그아웃 중 오류 발생:', error);
        });
    };

    constructor(props) {
        super(props);
        this.state = {
          blogs: [],
          showDashboardSubMenu: true,
          showContentManagementSubMenu: false,
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
    

    componentDidMount() {

        axios.post('/api/user')
        .then(res => {
          const userdata = res.data;
          console.log(userdata.role);
        
          
            this.setState({ username: userdata.username }); // 사용자 이름 가져오기
          
        })
        .catch(error => {
          // 사용자 데이터를 가져오는데 실패한 경우
          console.error("사용자 데이터를 가져오는데 실패하였습니다:", error);
        });  
    }

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

        const { showDashboardSubMenu, showContentManagementSubMenu,showInformationManagementSubMenu,showAccountManagementSubMenu,isSidebarOpen  } = this.state;



        return (
    <React.Fragment>
         <div className={`page-wrapper ${isSidebarOpen ? "" : "toggled"}`}>

            <nav id="sidebar" className="sidebar-wrapper sidebar-dark" style={isSidebarOpen ? sidebarStyle : toggledSidebarStyle}>
                    <div className="sidebar-content" data-simplebar style={{ height: 'calc(100% - 60px)' }}>
                        <div className="sidebar-brand">
                            <Link to="/index-blog">
                                <img src={logoDark} height="24" className="logo-light-mode" alt=""/>
                                <img src={logoLight} height="24" className="logo-dark-mode" alt=""/>
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
                            <a href="javascript:void(0)" className="logo-icon me-3">
                                <img src={logoIcon} height="30" className="small" alt=""/>
                                <span className="big">
                                    <img src={logoDark}  height="24" className="logo-light-mode" alt=""/>
                                    <img src={logoLight} height="24" className="logo-dark-mode" alt=""/>
                                </span>
                            </a>
                            <a id="close-sidebar" className="btn btn-icon btn-soft-light" style={rotateStyle} onClick={this.handleSidebarToggle}>
                                <i className={`ti ti-menu-2 ${isSidebarOpen ? "" : "rotate"}`}></i>
                            </a>
                            <div className="search-bar p-0 d-none d-md-block ms-2">
                         
                            </div>
                        </div>

                        <ul className="list-unstyled mb-0">
                      
                            <li className="list-inline-item mb-0 ms-1">
                                <div className="dropdown dropdown-primary">
                                    
                         
                    
                                    <div className="dropdown-menu dd-menu shadow rounded border-0 mt-3 p-0" data-simplebar style={{ height: "320px", width: "290px" }}>
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
                                    <div className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3" style={{minWidth: "200px"}}>
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


                <div className="container-fluid">
                    <div className="layout-specing">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="text-muted mb-1">안녕하세요 {this.state.username}님!</h6>
                                <h5 className="mb-0">Dashboard</h5>
                            </div>

                            <div className="mb-0 position-relative">
                             
                            </div>
                        </div>
                    
                        <div className="row row-cols-xl-5 row-cols-md-2 row-cols-1">
                                <div className="col mt-4">
                                    <a href="javascript:void(0)" className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3">
                                        <div className="d-flex align-items-center">
                                            <div className="icon text-center rounded-pill">
                                                <i className="uil uil-user-circle fs-4 mb-0"></i>
                                            </div>
                                            <div className="flex-1 ms-3">
                                                <h6 className="mb-0 text-muted">전체 사용자수</h6>
                                                <p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="4589">2100</span></p>
                                            </div>
                                        </div>

                                    </a>
                                </div> 
                            
                            <div className="col mt-4">
                                <a href="javascript:void(0)" className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3">
                                    <div className="d-flex align-items-center">
                                        <div className="icon text-center rounded-pill">
                                            <i className="uil uil-usd-circle fs-4 mb-0"></i>
                                        </div>
                                        <div className="flex-1 ms-3">
                                            <h6 className="mb-0 text-muted">VR 콘텐츠 수</h6>
                                            <p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="100">14</span></p>
                                        </div>
                                    </div>


                                </a>
                            </div>
                            
                            <div className="col mt-4">
                                <a href="javascript:void(0)" className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3">
                                    <div className="d-flex align-items-center">
                                        <div className="icon text-center rounded-pill">
                                            <i className="uil uil-shopping-bag fs-4 mb-0"></i>
                                        </div>
                                        <div className="flex-1 ms-3">
                                            <h6 className="mb-0 text-muted">동영상 콘텐츠 수</h6>
                                            <p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="100">02</span></p>
                                        </div>
                                    </div>

        
                                </a>
                            </div> 
                            
                            <div className="col mt-4">
                                <a href="javascript:void(0)" className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3">
                                    <div className="d-flex align-items-center">
                                        <div className="icon text-center rounded-pill">
                                            <i className="uil uil-store fs-4 mb-0"></i>
                                        </div>
                                        <div className="flex-1 ms-3">
                                            <h6 className="mb-0 text-muted">가입자 수</h6>
                                            <p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="145">23</span></p>
                                        </div>
                                    </div>


                                </a>
                            </div>
                            
                            <div className="col mt-4">
                                <a href="javascript:void(0)" className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3">
                                    <div className="d-flex align-items-center">
                                        <div className="icon text-center rounded-pill">
                                            <i className="uil uil-users-alt fs-4 mb-0"></i>
                                        </div>
                                        <div className="flex-1 ms-3">
                                            <h6 className="mb-0 text-muted">어플 활성화 횟수</h6>
                                            <p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="145">23</span></p>
                                        </div>
                                    </div>


                                </a>
                            </div>
                        </div>

                        <div className="row">
                           <div className="col-xl-8 col-lg-7 mt-4" style={{ width: '100%' }}>
                                <div className="card shadow border-0 p-4 pb-0 rounded">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="mb-0 fw-bold">Sales Analytics</h6>
                                            
                                            <div className="mb-0 position-relative">
                                               
                                                <select className="form-select form-control" id="yearchart">
                                                    <option value="2021">2021</option>
                                                    <option value="2020">2020</option>
                                                    <option value="2019">2019</option>
                                                </select>
                                                
                                            </div>
                                            
                                        </div>
                                        <img
                                        src={blog101}
                                        className="img-fluid rounded-md shadow-md"
                                        alt=""
                                    />
                                        {/* <div style={{ backgroundColor: 'black', width: '1450px', height: '500px' }}></div> */}
                                <div id="dashboard" className="apex-chart"></div>
                            </div>
                        </div> 
                         
                        

                           

                      

                                               
                
                        <footer className="shadow py-3">
                            <div className="container-fluid">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <div className="text-sm-start text-center mx-md-2">
                                        <p className="mb-0 text-muted">© {new Date().getFullYear()} Landrick. Design with <i className="mdi mdi-heart text-danger"></i> by <a href="https://shreethemes.in/" target="_blank" rel="noreferrer" className="text-reset">Shreethemes</a>.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>
                        </div>
                        </div>
                        </div>
            </main>
        </div>
   
    


    
        <div className="offcanvas offcanvas-end shadow" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header p-4 border-bottom">
                <h5 id="offcanvasLeftLabel" className="mb-0">
                    <img src={logoDark} height="24" className="light-version" alt=""/>
                    <img src={logoLight} height="24" className="dark-version" alt=""/>
                </h5>
                <button type="button" className="btn-close d-flex align-items-center text-dark" data-bs-dismiss="offcanvas" aria-label="Close"><i className="uil uil-times fs-4"></i></button>
            </div>
            <div className="offcanvas-body p-4">
                    <div className="row">
                        <div className="col-12">
                            <div className="text-center">
                                <h6 className="fw-bold">Theme Options</h6>

                                <ul className="text-center style-switcher list-unstyled mt-4">
                                    <li className="d-grid"><a href="#" className="rtl-version t-rtl-light" onClick={() => setTheme('style-rtl')}><img src={rtl} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">RTL Version</span></a></li>
                                    <li className="d-grid"><a href="#" className="ltr-version t-ltr-light" onClick={() => setTheme('style')}><img src={ltr} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">LTR Version</span></a></li>
                                    <li className="d-grid"><a href="#" className="dark-rtl-version t-rtl-dark" onClick={() => setTheme('style-dark-rtl')}><img src={rtl} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">RTL Version</span></a></li>
                                    <li className="d-grid"><a href="#" className="dark-ltr-version t-ltr-dark" onClick={() => setTheme('style-dark')}><img src={dark} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">LTR Version</span></a></li>
                                    <li className="d-grid"><a href="#" className="dark-version t-dark mt-4" onClick={() => setTheme('style-dark')}><img src={dark} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">Dark Version</span></a></li>
                                    <li className="d-grid"><a href="#" className="light-version t-light mt-4" onClick={() => setTheme('style')}><img src={ltr} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">Light Version</span></a></li>
                                    <li className="d-grid"><a href="#" target="_blank" className="mt-4"><img src={landing} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '230px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">Landing</span></a></li>
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

PageChat.contextTypes = {
    history: PropTypes.object.isRequired
  };

export default PageChat;
