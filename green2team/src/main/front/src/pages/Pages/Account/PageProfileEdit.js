import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useParams } from 'react-router-dom';

import FeatherIcon from 'feather-icons-react';


//Import Images
import logoDark from "../../../assets/images/logo-dark.png";
import logoLight from "../../../assets/images/logo-light.png";
import logoIcon from "../../../assets/images/logo-icon.png";
import c04 from "../../../assets/images/client/04.jpg";
import c05 from "../../../assets/images/client/05.jpg";
import c15 from "../../../assets/images/client/15.jpg";

const PageProfileEdit = () => {
    const [blog, setBlog] = useState({});
    const { id } = useParams();
    const [userRole, setUserRole] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [username, setUsername] = useState(''); // username 상태 추가
    // 아코디언 메뉴
    const [showDashboardSubMenu, setShowDashboardSubMenu] = useState(false);
    const [showShowContentManagementSubMenu, setShowContentManagementSubMenu] = useState(false);
    const [showInformationManagementSubMenu, setInformationManagementSubMenu] = useState(false);
    const [showAccountManagementSubMenu, setAccountManagementSubMenu] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

 



    useEffect(() => {
        axios.get(`/page-profile-edit/${id}`)
            .then(response => {
                setBlog(response.data);
                setUserRole(response.data.role);
            })
            .catch(error => {
                console.error('Error fetching blog:', error);
            });
    }, [id]);


    useEffect(() => {
        axios.post('/api/user')
            .then(res => {
                const userdata = res.data;
                console.log(userdata.role);
    
                // 사용자의 role이 null이거나 "ROLE_USER"인 경우에만 페이지 이동

                    setUsername(userdata.username); // 사용자 이름 설정
                
            })
            .catch(error => {
                // 사용자 데이터를 가져오는데 실패한 경우
                console.error("사용자 데이터를 가져오는데 실패하였습니다:", error);

            });
    }, []);
    
    // 로그아웃 함수 정의
    const handleLogout = () => {
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
    
// 수정 버튼 클릭 시 실행되는 함수
    function handleFormSubmit(event) {
        event.preventDefault(); // 폼의 기본 동작을 방지합니다.
    
        // 폼 데이터를 가져옵니다.
        const formData = new FormData(event.target);
    
        // 권한 설정 라디오 버튼의 값을 가져와서 FormData에 추가합니다.
        const selectedRole = document.querySelector('input[name="role"]:checked').value;
        console.log(selectedRole);
        formData.append('role', selectedRole);
    
        // FormData를 JSON 형식으로 변환합니다.
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        // if (jsonData.role === "ROLE_ADMIN") {
        //     // 여기에서 경고 메시지를 표시하거나 원하는 처리를 수행할 수 있습니다.
        //     alert("이미 최고 관리자가 존재합니다.");
        //     return; // 요청 중지
        // }
    
        // axios를 사용하여 서버에 데이터를 전송합니다.

        if(selectedRole==='ROLE_ADMIN'){
            axios.put('/api/updateRoleAdmin', jsonData)
            .then(response => {
                if(response.data.userRole !== "1"){
                    alert('수정 완료!');
                    window.location.href = '/page-profile';
                }
                else{
                    alert("이미 최고 관리자가 존재합니다.");
                    return;
                }
            })
            .catch(error => {
                console.error('수정 실패:', error);
            });
        }else{
            axios.put('/api/updateRole', jsonData)
                .then(response => {
                    alert('수정 완료!');
                    window.location.href = '/page-profile';
                })
                .catch(error => {
                    console.error('수정 실패:', error);
                });
            }
    }


    // 삭제하기 구현
    const handleDeleteUser = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            // 사용자 삭제 요청 보내기
            axios.delete(`/api/deleteUser/${id}`)
                .then(response => {
                    window.location.href = '/page-profile';
                })
                .catch(error => {
                    console.error('삭제 실패:', error);
                });
        } else {
         
        }
    };

    // 아코디언 메뉴
    const toggleDashboardSubMenu = () => {
        setShowDashboardSubMenu(prevState => !prevState);
    };
    const toggleContentManagementSubMenu = () => {
        setShowContentManagementSubMenu(prevState => !prevState);
    };
    const toggleInformationManagementSubMenu = () => {
        setInformationManagementSubMenu(prevState => !prevState);
    };
    const toggleAccountManagementSubMenu = () => {
        setAccountManagementSubMenu(prevState => !prevState);
    };
    const handleSidebarToggle = () => {
        setIsSidebarOpen(prevState => !prevState);
    };



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
                    <a href="javascript:void(0)" onClick={toggleDashboardSubMenu}><i className="ti ti-home me-2"></i>대시보드</a>
                    {showDashboardSubMenu && (
                        <div>
                            <ul>
                                <li><Link to="/page-chat">통계데이터</Link></li>
                            </ul>
                        </div>
                        )}
                    </li>
        
                
                    <li className="sidebar-dropdown">
                        <a href="javascript:void(0)" onClick={toggleContentManagementSubMenu}><i className="ti ti-home me-2"></i>콘텐츠 관리</a>
                        {showShowContentManagementSubMenu && (
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
                    <a href="javascript:void(0)" onClick={toggleInformationManagementSubMenu}><i className="ti ti-home me-2"></i>기준정보 관리</a>
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
                    <a href="javascript:void(0)" onClick={toggleAccountManagementSubMenu}><i className="ti ti-home me-2"></i>계정 관리</a>
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
                <img src={logoDark}  height="24" className="logo-light-mode" alt=""/>
                <img src={logoLight} height="24" className="logo-dark-mode" alt=""/>
            </span>
        </a>
        <a id="close-sidebar" className="btn btn-icon btn-soft-light" style={rotateStyle} onClick={handleSidebarToggle}>
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
                    <a className="dropdown-item d-flex align-items-center text-dark pb-3" href="javascript:void(0)">
                        <img src={c05} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                        <div className="flex-1 ms-2">
                            {/* 관리자 해당 이름 */}
                            <span className="d-block">{username}</span>
                        </div>
                    </a>
                        {/* 로그아웃 버튼 */}
                        <a className="dropdown-item text-dark" onClick={handleLogout} href="javascript:void(0)"><span className="mb-0 d-inline-block me-1"><i className="ti ti-logout"></i></span> Logout</a>

                </div>
            </div>
        </li>
    </ul>
</div>
</div>


     
<div className="container-fluid">
                    <div className="layout-specing">
                        <div className="d-md-flex justify-content-between align-items-center">
                            <h5 className="mb-0">프로필 설정</h5>

                            <nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
                                <ul className="breadcrumb bg-transparent rounded mb-0 p-0">
                                    <li className="breadcrumb-item text-capitalize">계정 관리</li>
                                    <li className="breadcrumb-item text-capitalize"><a href="#">계정 권한 관리</a></li>
                                    <li className="breadcrumb-item text-capitalize active" aria-current="page">프로필 설정</li>
                                </ul>
                            </nav>
                        </div>
                    
                        <div className="row">
                            <div className="col-lg-4 mt-4">
                                <div className="card border-0 rounded shadow">
                                    <div className="card-body">
                                        <h5 className="text-md-start text-center mb-0">프로필</h5>

        
                                        <form onSubmit={handleFormSubmit}>
                                            <div className="row mt-4">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">계정 번호</label>
                                                        <div className="form-icon position-relative">
                                                        <FeatherIcon icon="user" className="fea icon-sm icons" />
                                                            <input name="id" id="id" type="number" className="form-control ps-5" value={blog.id}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">ID</label>
                                                        <div className="form-icon position-relative">
                                                        <FeatherIcon icon="user-check" className="fea icon-sm icons" />
                                                            <input name="username" id="username" type="text" className="form-control ps-5" value={blog.username}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">E-Mail</label>
                                                        <div className="form-icon position-relative">
                                                        <FeatherIcon icon="mail" className="fea icon-sm icons" /> 
                                                            <input name="email" id="email" type="email" className="form-control ps-5" value={blog.email}/>
                                                        </div>
                                                    </div> 
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">가입 날짜</label>
                                                        <div className="form-icon position-relative">
                                                        <FeatherIcon icon="bookmark" className="fea icon-sm icons" /> 
                                                            <input name="join_date" id="join_date" type="text" className="form-control ps-5" value={blog.join_date ? blog.join_date.slice(0, 10) : ''}/>
                                                        </div>
                                                    </div> 
                                                </div>
                                                {/* <div className="col-lg-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Description</label>
                                                        <div className="form-icon position-relative">
                                                            <i data-feather="message-circle" className="fea icon-sm icons"></i>
                                                            <textarea name="comments" id="comments" rows="4" className="form-control ps-5" placeholder="Description :"></textarea>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <input type="submit" id="submit" name="send" className="btn btn-primary" value="수정"/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                               
                            </div>

                            
                            <div className="col-lg-4 mt-4">        
                            <div className="card border-0 rounded shadow p-4">
                        <h5 className="mb-0">권한 설정</h5>

                        <div className="mt-4">
                            <div className="d-flex justify-content-between pb-4">
                                <h6 className="mb-0">일반 사용자</h6>
                                <p>게시글 조회 가능 (대시보드 접근 불가)</p>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="ROLE_USER" id="ROLE_USER" name="role" />
                                    <label className="form-check-label" ></label>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between py-4 border-top">
                                <h6 className="mb-0">상인 사용자</h6>
                                <p>상인 게시판 및 쿠폰 발급 관리</p>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="ROLE_TRADER" id="ROLE_TRADER" name="role" />
                                    <label className="form-check-label" ></label>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between py-4 border-top">
                                <h6 className="mb-0">준 관리자</h6>
                                <p>모든 게시판 관리</p>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="ROLE_BOARD" id="ROLE_BOARD" name="role" />
                                    <label className="form-check-label" ></label>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between py-4 border-top">
                                <h6 className="mb-0">최고 관리자</h6>
                                <p>모든 게시물 및 계정 권한 관리</p>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="ROLE_ADMIN" id="ROLE_ADMIN" name="role"/>
                                    <label className="form-check-label" ></label>
                                </div>
                            </div>
                        </div>
                    </div>
                                {/* <div className="card border-0 rounded shadow p-4">
                                    <h5 className="mb-0">권한 설정</h5>
        
                                    <div className="mt-4">
                                        <div className="d-flex justify-content-between pb-4">
                                            <h6 className="mb-0">일반 사용자</h6>
                                            <p>게시글 조회 가능 (대시보드 접근 불가)</p>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="noti5"/>
                                                <label className="form-check-label" htmlFor="noti5"></label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between py-4 border-top">
                                            <h6 className="mb-0">상인 사용자</h6>
                                            <p>상인 게시판 및 쿠폰 발급 관리</p>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="noti6"/>
                                                <label className="form-check-label" htmlFor="noti6"></label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between py-4 border-top">
                                            <h6 className="mb-0">준 관리자</h6>
                                            <p>모든 게시판 관리</p>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value=""  id="noti7"/>
                                                <label className="form-check-label" htmlFor="noti7"></label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between py-4 border-top">
                                            <h6 className="mb-0">최고 관리자</h6>
                                            <p>모든 게시물 및 계정 권한 관리</p>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" checked id="noti8"/>
                                                <label className="form-check-label" htmlFor="noti8"></label>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
        
                                <div className="card border-0 rounded shadow p-4 mt-4">
                                    <h5 className="mb-0 text-danger">계정 삭제하기</h5>
        
                                    <div className="mt-4">
                                        <h6 className="mb-0">계정을 삭제하려면 Delete 버튼을 눌러주세요, 이전 정보는 복구되지 않습니다</h6>
                                        <div className="mt-4">
                                            <button type="button" onClick={handleDeleteUser} className="btn btn-danger">Delete</button>
                                        </div>
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

export default PageProfileEdit;
