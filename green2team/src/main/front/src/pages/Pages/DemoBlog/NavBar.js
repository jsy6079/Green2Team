import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Form,
  Offcanvas,
} from 'reactstrap';

//import images
import logoDark from '../../../assets/images/logo-dark.png';
import logoLight from '../../../assets/images/logo-light.png';
import FeatherIcon from 'feather-icons-react';

import RightSidebar from '../../../components/Layout/RightSidebar';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState('right');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  // 사용자에 따라 로그인/로그아웃 상태창 변화
  const [userRole, setUserRole] = useState(null);


  // vr 아카이빙 페럴렉스
  const handleScroll = () => {
    const archivingSection = document.getElementById('archiving-section');
    archivingSection.scrollIntoView({ behavior: 'smooth' });
  };


  // 영상 게시판 페럴렉스
  const handleScrollVideo = () => {
    const archivingSection = document.getElementById('video-section');
    archivingSection.scrollIntoView({ behavior: 'smooth' });
  };


  // 디지털 조감도 페럴렉스
  const handleScrollDigital = () => {
    const archivingSection = document.getElementById('digital-section');
    archivingSection.scrollIntoView({ behavior: 'smooth' });
  };


  // 로그아웃
  const handleLogout = () => {
    // CSRF 토큰 가져오기

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


  useEffect(() => {
    axios.post('/api/user')
      .then(res => {
        const userdata = res.data;
        console.log(userdata.role);
        setUserRole(userdata.role); // 사용자 역할 상태 업데이트
      })
      .catch(error => {
        console.error("사용자 데이터를 가져오는데 실패하였습니다:", error);
      });
  }, []);


  const toggleRightDrawer = () => {
    setPosition('right');
    setOpen(!open);
  };

  const onDrawerClose = () => {
    setOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const initMenu = () => {
    activateMenu();
  };

  const activateMenu = () => {
    var menuItems = document.getElementsByClassName('sub-menu-item');
    if (menuItems) {
      var matchingMenuItem = null;
      for (var idx = 0; idx < menuItems.length; idx++) {
        if (menuItems[idx].href === window.location.href) {
          matchingMenuItem = menuItems[idx];
        }
      }
      if (matchingMenuItem) {
        matchingMenuItem.classList.add('active');
        const immediateParent = matchingMenuItem.closest('li');
        if (immediateParent) {
          immediateParent.classList.add('active');
        }
        const parent = matchingMenuItem.closest('.parent-menu-item');
        if (parent) {
          parent.classList.add('active');
        }
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    initMenu();
    document.body.classList = '';
    window.addEventListener('scroll', scrollNavigation, true);

    return () => {
      window.removeEventListener('scroll', scrollNavigation, true);
    };
  }, []);

  const scrollNavigation = () => {
    var doc = document.documentElement;
    const navBar = document.getElementById('topnav');
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (navBar != null) {
      if (top > 80) {
        navBar.classList.add('nav-sticky');
      } else {
        navBar.classList.remove('nav-sticky');
        document.querySelector('.shoppingbtn')?.classList.add('btn-primary');
        document.querySelector('.shoppingbtn')?.classList.remove('btn-light');
        document
          .querySelector('.settingbtn')
          ?.classList.add('btn-soft-primary');
      }
    }
  };

  const isToogleMenu = () => {
    const isToggle = document.getElementById('isToggle');
    isToggle.classList.toggle('open');
    var isOpen = document.getElementById('navigation');
    if (isOpen.style.display === 'block') {
      isOpen.style.display = 'none';
    } else {
      isOpen.style.display = 'block';
    }
  };

  return (
    <React.Fragment>
      <header id="topnav" className="defaultscroll sticky bg-white">
        <Container>
          <Link className="logo" to="/index-blog">
            <img
              src={logoDark}
              height="24"
              className="logo-light-mode"
              alt=""
            />
            <img
              src={logoLight}
              height="24"
              className="logo-dark-mode"
              alt=""
            />
          </Link>
          <div className="menu-extras">
            <div className="menu-item">
              <Link
                to="#"
                className="navbar-toggle"
                id="isToggle"
                onClick={isToogleMenu}
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Link>
            </div>
          </div>

          <ul className="buy-button list-inline mb-0">
            <div id="navigation">
            <ul className="navigation-menu">


            {userRole === "ROLE_ADMIN" || userRole === "ROLE_BOARD" || userRole === "ROLE_TRADER"  ? (
              <li>
                <Link to="/page-chat" >
                  대시보드
                </Link>
              </li>
              ) : (<></>
              )}


              

              {userRole === "ROLE_USER" || userRole === "ROLE_ADMIN" || userRole === "ROLE_BOARD" || userRole === "ROLE_TRADER"  ? (
                <li>
                <Link to="#"   onClick={handleLogout}>
                  로그아웃
                </Link>
              </li>
              ) : (
                <>
                    <li>
                      <Link to="/auth-login" >
                        로그인
                      </Link>
                    </li>
                    <li>
                    <Link to="/auth-signup" >
                      회원가입
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          </ul>

          <div id="navigation">
            <ul className="navigation-menu">

              <li>
                <Link to="/index-blog" >
                  Home
                </Link>
              </li>
              <li>
                <Link to="/index-blog"  onClick={handleScroll}>
                  vr 아카이빙
                </Link>
              </li>
              <li>
                <Link to="/index-blog"  onClick={handleScrollVideo}>
                  영상 게시판
                </Link>
              </li>
              <li>
                <Link to="/index-blog"  onClick={handleScrollDigital}>
                  디지털 조감도
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </header>
      <Offcanvas
        isOpen={open}
        position={position}
        toggle={toggleRightDrawer}
        direction="end"
      >
        <RightSidebar onClose={onDrawerClose} />
      </Offcanvas>
    </React.Fragment>
  );
};

export default NavBar;
