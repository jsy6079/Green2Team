import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    FormGroup,
  Container,
  Row,
  Col,
  Progress,
  Card,
  CardBody,Pagination, PaginationItem, PaginationLink
} from "reactstrap";
import axios from 'axios';

//Import Images
import logoDark from "../../../assets/images/logo-dark.png";
import logoLight from "../../../assets/images/logo-light.png";
import logoIcon from "../../../assets/images/logo-icon.png";
import c01 from "../../../assets/images/client/01.jpg";
import c04 from "../../../assets/images/client/04.jpg";
import c05 from "../../../assets/images/client/05.jpg";
import c15 from "../../../assets/images/client/15.jpg";


class PageProfile extends Component {

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

    // 클래스의 생성자(초기 상태 설정)
    constructor(props) {
        super(props);
        this.state = {
        blogs: [],
        currentPage: 1,
        showDashboardSubMenu: false,
        showContentManagementSubMenu: false,
        showInformationManagementSubMenu: false,
        showAccountManagementSubMenu: true,
        showAlert: false, // 알림창을 표시할지 여부를 저장할 상태
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


    // 컴포넌트 마운트 된 후 호출되는 componentDidMount 메서드(초기 데이터 가져옴)
    componentDidMount() {

        axios.post('/api/user')
        .then(res => {
          const userdata = res.data;
          console.log(userdata.role);
          this.setState({ userRole: userdata.role });

          // 사용자의 role이 null이거나 "ROLE_USER"인 경우에만 페이지 이동
          if (userdata.role === "ROLE_USER" || userdata.role === "Anonymous") {
            window.location.href = "/index-blog"; // 페이지 이동
          } else {
            this.setState({ username: userdata.username }); // 사용자 이름 가져오기
          }
        })
        .catch(error => {
          // 사용자 데이터를 가져오는데 실패한 경우
          console.error("사용자 데이터를 가져오는데 실패하였습니다:", error);
          window.location.href = "/index-blog"; // 페이지 이동
        });     

        
        this.fetchDataWithoutSearch(this.state.currentPage);
    }

    // 페이지 변경 처리를 위한 handlePageChange 메서드
    handlePageChange = (page) => {
        const { searchText } = this.state;
        if (searchText) {
            this.fetchDataWithSearch(page, searchText);
        } else {
            this.fetchDataWithoutSearch(page);
        }
    };
    

    // 데이터 가져오는 fetchData 메서드
    // fetchData = (page, searchText) => {
    //     let url = `http://localhost:8080/page-profile/List?pageNum=${page}&amount=10`;
    //     if (searchText) {
    //         url = `http://localhost:8080/page-profile-search?searchText=${searchText}&pageNum=${page}&amount=10`;
    //     }
    //     fetch(url)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             const total = data.total;
    //             const totalPages = Math.ceil(data.page.total / 10);
    //             this.setState({
    //                 blogs: data.userLists,
    //                 pageSize: 10,
    //                 totalPages: totalPages,
    //                 currentPage: page,
    //             });
    //             console.log(total);
    //         })
    //         .catch((error) => {
    //             console.error('데이터 가져오기 오류:', error);
    //         });
    // };
    
    // 검색을 안했을 때의 데이터를 가져오는 fetchData
    fetchDataWithoutSearch = (page) => {
        const url = `http://localhost:8080/page-profile/List?pageNum=${page}&amount=10`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    blogs: data.userLists,
                    pageSize: 10,
                    totalPages: Math.ceil(data.page.total / 10),
                    currentPage: page,
                });
            })
            .catch((error) => {
                console.error('데이터 가져오기 오류:', error);
            });
    };

        // 검색을 했을 때의 데이터를 가져오는 fetchData
        fetchDataWithSearch = (page, searchText) => {
            const url = `http://localhost:8080/page-profile-search?searchText=${searchText}&pageNum=${page}&amount=10`;
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    this.setState({
                        blogs: data.userLists,
                        pageSize: 10,
                        totalPages: Math.ceil(data.page.total / 10),
                        currentPage: page,
                    });
                })
                .catch((error) => {
                    console.error('데이터 가져오기 오류:', error);
                });
        };
    


  // 사용자별 직급명
  getRoleBadge(role) {
    if (role === "ROLE_ADMIN") {
        return "최고 관리자";
    } else if (role === "ROLE_BOARD") {
        return "준 사용자";
    } else if (role === "ROLE_TRADER") {
        return "상인 사용자";
    } else if (role === "ROLE_USER") {
        return "일반 사용자";
    } else {
        return "";
    }
}

 // 사용자별 직급명 클래스네임
 getRoleBadgeClass(role) {
    if (role === "ROLE_ADMIN") {
        return "bg-soft-primary";
    } else if (role === "ROLE_BOARD") {
        return "bg-soft-success rounded";
    } else if (role === "ROLE_TRADER") {
        return "bg-soft-warning";
    } else if (role === "ROLE_USER") {
        return "bg-soft-danger";
    } else {
        return "";
    }
}



handleInputChange = (e) => {
    this.setState({ searchText: e.target.value });
};

handleSearch = () => {
    const { searchText } = this.state; // 현재 상태의 검색어 가져오기
    this.fetchDataWithSearch(1, searchText); 
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
                            <a href="javascript:void(0)" className="logo-icon me-3">
                                <img src={logoIcon} height="30" className="small" alt=""/>
                                <span className="big">
                                    <img src={logoDark}  height="24" className="logo-light-mode" alt=""/>
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
                                        <a className="dropdown-item d-flex align-items-center text-dark pb-3" >
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
                <div className="d-md-flex justify-content-between align-items-center">
                    <h5 className="mb-0">계정 권한 관리</h5>
                    
                    <div className="row align-items-center gx-2">
                    <div className="col">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="검색" 
                        style={{ width: '250px' }}
                        onChange={this.handleInputChange} // 입력이 변경될 때마다 호출되는 콜백 함수
                    />
                    </div>
                    <div className="col-auto">
                    <button type="submit" className="btn btn-primary" onClick={this.handleSearch}>검색</button>
                    </div>
                    </div>



                    
                    <nav aria-label="breadcrumb" className="d-inline-block">
 
                        <ul className="breadcrumb bg-transparent rounded mb-0 p-0">

                            <li className="breadcrumb-item text-capitalize">계정관리</li>
                            <li className="breadcrumb-item text-capitalize active" aria-current="page">계정 권한 관리</li>
                        </ul>
                    </nav>
                </div>

                <div className="row">
                    <div className="col-12 mt-4">
                        <div className="table-responsive shadow rounded">
                            <table className="table table-center bg-white mb-0">
                                <thead>
                                    <tr>
                                        <th className="border-bottom p-3">계정 번호</th>
                                        <th className="border-bottom p-3" style={{ minWidth: '220px' }}>ID</th>
                                        <th className="text-center border-bottom p-3" style={{ minWidth: '200px' }}>E-Mail</th>
                                        <th className="text-center border-bottom p-3"></th>
                                        <th className="text-center border-bottom p-3">가입날짜</th>
                                        <th className="text-end border-bottom p-3" style={{ minWidth: '200px' }}></th>
                                    </tr>
                                </thead>
                               
                               
                               
                                <tbody>
                                    {blogs.map((blog, index) => (
                                        <tr key={index}>
                                            <th className="p-3">{blog.id}</th>
                                            <td className="p-3">
                                                <div className="d-flex align-items-center">
                                                    <img src={c01} className="avatar avatar-ex-small rounded-circle shadow"/>
                                                    <span className="ms-2">{blog.username}</span>
                                                </div>
                                            </td>
                                            <td className="text-center p-3">{blog.email}</td>
                                            <td className="text-center p-3"></td>
                                            <td className="text-center p-3">{blog.join_date.slice(0, 10)}</td>
                                            <td className="text-center p-3">
                                                <div className={"badge "+ this.getRoleBadgeClass(blog.role) +" px-3 py-1"}>
                                                    {this.getRoleBadge(blog.role)}
                                                </div>
                                            </td>
                                            <td className="text-end p-3">
                                                <Link to={`/page-profile-edit/${blog.id}`} className="btn btn-sm btn-primary">권한 수정</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>



                            </table>
                        </div>
                    </div>
                </div>
    <div>
        <div className="row text-center">
          <div className="col-12 mt-4">
            <div className="d-md-flex align-items-center text-center justify-content-between">
              <span className="text-muted me-3">Showing 1 - 10 out of 50</span>

                    <ul className="pagination mb-0 justify-content-center mt-4 mt-sm-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={(e) => this.handlePageChange(currentPage - 1, e)} aria-label="Previous">
                        Prev
                    </button>
                </li>
                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                            <button className="page-link" onClick={(e) => this.handlePageChange(page, e)}>
                                {page}
                            </button>
                        </li>
                    );
                })}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={(e) => this.handlePageChange(currentPage + 1, e)} aria-label="Next">
                        Next
                    </button>
                </li>
        </ul>

            </div>
          </div>
        </div>
      </div>
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
   
      </main>

   </div>

      </React.Fragment>
    );
  }
}

export default PageProfile;