import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { Link } from "react-router-dom";

//Import Images
import logoDark from "../../../assets/images/logo-dark.png";
import logoLight from "../../../assets/images/logo-light.png";
import logoIcon from "../../../assets/images/logo-icon.png";
import c04 from "../../../assets/images/client/04.jpg";
import c05 from "../../../assets/images/client/05.jpg";
import c15 from "../../../assets/images/client/15.jpg";

function PageWorks2() {
    const { videoBoardNo } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [viewerUrl, setViewerUrl] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState(""); 
    const [showImageInput, setShowImageInput] = useState(false);
    const navigate = useNavigate();
    const [thumbnailBlob, setThumbnailBlob] = useState(null);
    const [thumbnailName, setThumbnailName] = useState("");
    const [username, setUsername] = useState(''); // username 상태 추가
    // 아코디언 메뉴
    const [showDashboardSubMenu, setShowDashboardSubMenu] = useState(false);
    const [showShowContentManagementSubMenu, setShowContentManagementSubMenu] = useState(true);
    const [showInformationManagementSubMenu, setInformationManagementSubMenu] = useState(false);
    const [showAccountManagementSubMenu, setAccountManagementSubMenu] = useState(false);
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

    // 파일 선택 시 처리 함수    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const blob = new Blob([file], { type: file.type });
            const thumbnailUrl = URL.createObjectURL(blob);
            setThumbnailUrl(thumbnailUrl);
            setThumbnailBlob(blob);
            setThumbnailName(file.name);
        }
    };

    // 내용과 URL 분리
    const extractContentAndViewer = (data) => {
        const parser = new DOMParser();
        const parsedHtml = parser.parseFromString(data, 'text/html');
        const oembedElement = parsedHtml.querySelector('figure.media oembed');
        let content = data;
        let viewerUrl = '';
    
        if (oembedElement) {
            viewerUrl = `<figure class="media">${oembedElement.outerHTML}</figure>`;
            const parentNode = oembedElement.parentNode;
            if (parentNode) {
                const grandparentNode = parentNode.parentNode;
                if (grandparentNode) {
                    grandparentNode.removeChild(parentNode);
                }
            }
            content = parsedHtml.body.innerHTML;
        }
    
        return { content, viewerUrl };
    };

    // 수정 버튼 클릭 시 수정 데이터를 전달
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        const editorData = document.querySelector('#editor').value; 
        const { content, viewerUrl } = extractContentAndViewer(editorData);
        
        formData.append("title", title);
        formData.append("contents", content);
        formData.append("url", viewerUrl);
        formData.append("username", username); // 사용자 이름 추가
        if (thumbnailBlob) {
            formData.append("file", thumbnailBlob, thumbnailName);
            formData.append("thumbnail", null);
        }else{
            let thumbnail = thumbnailUrl;
            console.log(thumbnailUrl+'1')
            console.log(thumbnail+'2')
            formData.append("file", null);
            console.log( formData.get("file"))
                formData.append("thumbnail", thumbnail);
                console.log( formData.get("thumbnail")+'3');   
        }
        axios.put(`/api/modifyVideoBoard/${videoBoardNo}`, formData)
            .then(response => {
                alert("수정되었습니다.");
                navigate("/page-payments");
            });
            // .catch(error => {
            //     console.error("수정 에러 :", error);
            // });
    };

    useEffect(() => {
        axios.get(`/page-case-detail/modify/${videoBoardNo}`)
          .then(response => {
            const { videoBoardTitle, videoBoardContent, videoThumbnailImgUrl , videoViewerUrl } = response.data;
            setTitle(videoBoardTitle);
            setContent(videoBoardContent);
            setViewerUrl(videoViewerUrl);
            setThumbnailUrl(videoThumbnailImgUrl);

            // CKEditor 초기화
            ClassicEditor
            .create(document.querySelector('#editor'), {height: '300px', shouldNotToolbar: true})
            .then(editor => {
                editor.setData(videoViewerUrl + videoBoardContent);

                // CKEditor에서 변경된 내용을 textarea에 반영
                editor.model.document.on('change:data', () => {
                    const data = editor.getData();
                    document.querySelector('#editor').value = data;
                });              
            })
            .catch(error => {
                console.error(error);
            });
        })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    
        // 정리 함수
        return () => {
            const editorElement = document.querySelector('#editor');
            if (editorElement && editorElement.editor) {
                    editorElement.editor.destroy().then(() => {
                    editorElement.editor = null;
                });
            }
        };
    }, [videoBoardNo], [thumbnailUrl]);


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
    
    {/* SIDBAR */}
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
        {/* HEADER */}
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
                    <div className="search-bar p-0 d-none d-md-block ms-2"/>
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
{/* CONTAINER */}
<div className="container-fluid">
            <div className="layout-specing">
                <div className="d-md-flex justify-content-between align-items-center">
                    <h5 className="mb-0">영상 콘텐츠 수정</h5>
                    
                    <nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
                        <ul className="breadcrumb bg-transparent rounded mb-0 p-0">
                            <li className="breadcrumb-item text-capitalize">콘텐츠 관리</li>
                            <li className="breadcrumb-item text-capitalize"><a href="/page-invoice">영상 콘텐츠</a></li>
                            <li className="breadcrumb-item text-capitalize active" aria-current="page">수정</li>
                        </ul>
                    </nav>
                </div>
                
                <div className="row" >
                    <div className="col-lg-6 mt-4">
                        <div className="card border-0 rounded shadow">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row mt-4">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">제목</label>
                                                <div className="form-icon position-relative">
                                                    <i data-feather="user" className="fea icon-sm icons"></i>
                                                    <input name="name" id="first" type="text" className="form-control ps-4" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                    <br/>
                                                </div>

                                                <label className="form-label">썸네일 이미지</label>
                                                <div className="form-icon position-relative">
                                                {thumbnailUrl && <img src={thumbnailUrl} alt="Thumbnail" style={{ height: '150px', width: '170px' }} />} <br /><br />
                                                    <button type="button" className="btn btn-primary" onClick={() => setShowImageInput(prevState => !prevState)}>썸네일 이미지 수정</button>
                                                    {showImageInput && (
                                                        <div>
                                                            <br/>
                                                            <input type="file" id="input-file" name="input-file" accept="image/*" onChange={handleFileChange} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="form-label">내용</label>
                                                <div className="form-icon position-relative">
                                                    <i data-feather="message-circle" className="fea icon-sm icons"></i>
                                                    <textarea id="editor" name="contents" rows="4" className="form-control ps-5"/>
                                                </div>
                                            </div>
                                        </div>
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
                </div>
            </div>
        </div>

        {/* FOOTER */}
        <footer className="footer __web-instpector-hide-shortcut__">
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
);}

export default PageWorks2;
