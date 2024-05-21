import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import axios from 'axios';

import {
  Container,
  Form,
  Modal,
  ModalBody,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Offcanvas,
  OffcanvasBody,
} from 'reactstrap';

//Import Icons
import FeatherIcon from 'feather-icons-react';

//Import images
import logodark from '../../assets/images/logo-dark.png';
import logolight from '../../assets/images/logo-light.png';
import shop1 from '../../assets/images/shop/product/s-1.jpg';
import shop2 from '../../assets/images/shop/product/s-2.jpg';
import shop3 from '../../assets/images/shop/product/s-3.jpg';

import NavbarButtons from '../Shared/NavbarButtons';
import appStore from "../../assets/images/app/app-store.png";
import playStore from "../../assets/images/app/play-store.png";
import withRouter from '../../common/data/withRouter';

// menu
// import { navLinks } from './menu';
// import { MenuItem } from './NavBarComponents';

class Topbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedOut: false,
      userRole: null,
      isOpen: false,
      dropdownOpenShop: false,
      wishlistModal: false,
      dropdownIsOpen: false,
      open: false,
      position: 'end',
      dropdownOpen: false,
      landing: false,
      components: false,
      demo: false,
      doc: false,
      pages: false,
      company: false,
      account: false,
      email: false,
      blog: false,
      case: false,
      auth: false,
      login: false,
      signup: false,
      reset: false,
      utility: false,
      special: false,
      contact: false,
      multi: false,
      level2: false,
      isOffcanvasOpen: false
    };
    this.toggleLine = this.toggleLine.bind(this);
    this.toggleDropdownShop.bind(this);
    this.toggleWishlistModal.bind(this);
    this.toggleDropdownIsOpen.bind(this);
    this.toggleRightDrawer = this.toggleRightDrawer.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.toggleDropdown.bind(this);
    this.togglemodal.bind(this);
    this.removeActivation = this.removeActivation.bind(this);
  };



  // 로그아웃

  handleLogout = () => {
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




  // 사용자 역할 상태 업데이트
  componentDidMount() {
    axios.post('/api/user')
      .then(res => {
        const userdata = res.data;
        console.log(userdata.role);
        this.setState({ userRole: userdata.role }); 
      })
      .catch(error => {
        console.error("사용자 데이터를 가져오는데 실패하였습니다:", error);
      });
  }

  toggleOffcanvas = () => {
    this.setState((prevState) => ({
      isOffcanvasOpen: !prevState.isOffcanvasOpen,
    }));
  };

  closeOffcanvas = () => {
    this.setState({ isOffcanvasOpen: false });
  };

  toggleRightDrawer = () => {
    this.setState({ position: 'right' });
    this.setState({ open: !this.state.open });
  };
  onDrawerClose = () => {
    this.setState({ open: false });
  };

  toggleWishlistModal = () => {
    this.setState((prevState) => ({
      wishlistModal: !prevState.wishlistModal,
    }));
  };

  toggleDropdownShop = () => {
    this.setState({
      dropdownOpenShop: !this.state.dropdownOpenShop,
    });
  };
  toggleDropdownIsOpen = () => {
    this.setState({
      dropdownIsOpen: !this.state.dropdownIsOpen,
    });
  };

  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };
  togglemodal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  toggleLine() {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }

  // Topbar Page Activation

  activateParentDropdown() {
    var menuItems = document.getElementsByClassName("sub-menu-item");
    
    if (menuItems) {
      var matchingMenuItem = null;
      for (var idx = 0; idx < menuItems.length; idx++) {
        if (menuItems[idx].pathname === window.location.pathname) {
          matchingMenuItem = menuItems[idx];
        }
      }
      
      if (matchingMenuItem) {
        matchingMenuItem.classList.add('active');

        const immediateParent = matchingMenuItem.closest('li');
        if (immediateParent) {
          immediateParent.classList.add('active');
        }
        var parent = matchingMenuItem.closest(".parent-menu-item");

        if (parent) {
          parent.classList.add('active');

          var parentMenuitem = parent.querySelector('a');
          if (parentMenuitem) {
            parentMenuitem.classList.add('active');
          }
          var parentOfParent = parent.closest(".parent-parent-menu-item");
          if (parentOfParent) {
            parentOfParent.classList.add('active');
          }
        } else {
          parentOfParent = matchingMenuItem.closest(".parent-parent-menu-item");
          if (parentOfParent) {
            parentOfParent.classList.add('active');
          }
        }
      }
      return false;
    }
    return false;
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
    this.initializeNavigation();
  }

  initializeNavigation = () => {
    const pathName = window.location.pathname;
    var matchingMenuItem = null;
    var ul = document.getElementById("navigation");
    var items = ul.getElementsByTagName("a");
    this.removeActivation(items);
    for (var i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;
      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
        }
      }
    }
  }

  render() {

    const { userRole } = this.state;
    const currentPageURL = window.location.href;
    const { isOffcanvasOpen } = this.state;

    const topnavStyle = currentPageURL === "http://localhost:3000/page-invoice"
    ? { display: 'none' }  // 해당 페이지인 경우 스타일 변경
    : { position: 'relative', top: '0', width: '100%', zIndex: '1000', backgroundColor: '#ffffff' };  // 그 외의 페이지인 경우 기본 스타일 유지
    

    return (
      <React.Fragment>
        {this.props.tagline ? this.props.tagline : null}

        <header id="topnav" className="defaultscroll sticky" style={topnavStyle}>
          <Container>
            <div>
              {/* logo */}
              {this.props.hasDarkTopBar ? (
                <Link className="logo" to="/index-blog">
                  <img
                    src={logodark}
                    height="24"
                    className="logo-light-mode"
                    alt=""
                  />
                  <img
                    src={logolight}
                    height="24"
                    className="logo-dark-mode"
                    alt=""
                  />
                </Link>
              ) : (
                <Link className="logo" to="/">
                  {/* <span className="logo-light-mode">
                    <img src={logodark} className="l-dark" height="24" alt="" />
                    <img
                      src={logolight}
                      className="l-light"
                      height="24"
                      alt=""
                    />
                  </span> */}
                  {/* <img
                    src={logolight}
                    height="24"
                    className="logo-dark-mode"
                    alt=""
                  /> */}
                </Link>
              )}
            </div>

            <div className="menu-extras">
              <div className="menu-item">
                <Link
                  to="#"
                  onClick={this.toggleLine}
                  className={
                    this.state.isOpen ? 'navbar-toggle open' : 'navbar-toggle'
                  }
                >
                  <div className="lines">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </Link>
              </div>
            </div>
            {(() => {
              if (this.props.router.location.pathname === '/index-developer') {
                return <NavbarButtons />;
              }
              else if (this.props.router.location.pathname === '/page-chat') {
                return null; // PageChat 페이지인 경우 Topbar를 렌더링하지 않음
              }
              else if (this.props.router.location.pathname === '/page-profile') {
                return null; 
              }
              else if (this.props.router.location.pathname.startsWith ('/page-profile-edit/')){
                return null; 
              }
              else if (this.props.router.location.pathname === '/page-invoice') {
                return null; 
              }
              else if (this.props.router.location.pathname === '/page-members') {
                return null; 
              }
              else if (this.props.router.location.pathname === '/page-messages') {
                return null; 
              }
              else if (this.props.router.location.pathname === '/page-payments') {
                return null; 
              }else if (this.props.router.location.pathname.startsWith ('/page-works1/')) {
                return null; 
              }
              else if (this.props.router.location.pathname.startsWith ('/page-works2/')) {
                return null; 
              }
              else if (
                this.props.router.location.pathname === '/index-it-solution-two'
              ) {
                return (
                  <ul className="buy-button list-inline mb-0">
                    <li className="list-inline-item mb-0">
                      <Dropdown
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggleDropdown}
                      >
                        <DropdownToggle
                          color="none"
                          type="button"
                          className="btn-link text-decoration-none dropdown-toggle p-0 pe-2"
                        >
                          <i className="uil uil-search text-muted"></i>
                        </DropdownToggle>
                        <DropdownMenu
                          end
                          className="dd-menu dropdown-menu-end bg-white shadow rounded border-0 mt-3 py-0"
                          style={{ width: "300px" }}
                        >
                          <div className='search-bar'>
                            <Form className="searchform">
                              <input
                                type="text"
                                id="text"
                                name="name"
                                className="form-control border rounded"
                                placeholder="Search..."
                              />
                            </Form>
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                    </li>{" "}
                    <li className="list-inline-item mb-0">
                      <Link to="#" onClick={this.toggleOffcanvas}>
                        <div className="btn btn-icon btn-pills btn-primary settingbtn">
                          <FeatherIcon
                            icon="settings"
                            className="fea icon-sm"
                          />
                        </div>
                      </Link>
                    </li>{" "}
                    <li className="list-inline-item ps-1 mb-0">
                      <Link
                        to="//1.envato.market/landrickreactjs"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div id="buyButton" className="btn btn-icon btn-pills btn-primary shoppingbtn">
                          <FeatherIcon
                            icon="shopping-cart"
                            className="fea icon-sm"
                          />
                        </div>
                      </Link>
                    </li>
                  </ul>
                );
              }
              else if (
                this.props.router.location.pathname === '/shop-grids' ||
                this.props.router.location.pathname === '/shop-lists'
              ) {
                return (
                  <ul className="buy-button list-inline mb-0">
                    <li className="list-inline-item mb-0">
                      <Dropdown
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggleDropdown}
                      >
                        <DropdownToggle
                          direction="right"
                          color="none"
                          type="button"
                          className="btn btn-link text-decoration-none p-0 pe-2"
                        >
                          <i className="mdi mdi-magnify h4 text-muted"></i>
                        </DropdownToggle>
                        <DropdownMenu
                          end
                          className="dd-menu bg-white shadow rounded border-0 mt-3 py-0"
                          style={{ width: '300px' }}
                        >
                          <Form>
                            <input
                              type="text"
                              id="text"
                              name="name"
                              className="form-control border bg-white"
                              placeholder="Search..."
                            />
                          </Form>
                        </DropdownMenu>
                      </Dropdown>
                    </li>
                    <li className="list-inline-item mb-0 pe-1">
                      <Dropdown
                        isOpen={this.state.dropdownOpenShop}
                        toggle={this.toggleDropdownShop}
                      >
                        <DropdownToggle
                          type="button"
                          className="btn btn-icon btn-soft-primary "
                        >
                          <i className="uil uil-shopping-cart align-middle icons"></i>
                        </DropdownToggle>
                        <DropdownMenu
                          direction="left"
                          className="dd-menu bg-white shadow rounded border-0 mt-3 p-4"
                          style={{ width: '300px' }}
                        >
                          <div className="pb-4">
                            <Link to="#" className="media align-items-center">
                              <img
                                src={shop1}
                                className="shadow rounded"
                                style={{ maxWidth: '64px' }}
                                alt=""
                              />
                              <div className="flex-1 text-start ms-3">
                                <h6 className="text-dark mb-0">T-shirt (M)</h6>
                                <p className="text-muted mb-0">$320 X 2</p>
                              </div>
                              <h6 className="text-dark mb-0">$640</h6>
                            </Link>

                            <Link
                              to="#"
                              className="media align-items-center mt-4"
                            >
                              <img
                                src={shop2}
                                className="shadow rounded"
                                alt=""
                                style={{ maxWidth: '64px' }}
                              />
                              <div className="flex-1 text-start ms-3">
                                <h6 className="text-dark mb-0">Bag</h6>
                                <p className="text-muted mb-0">$50 X 5</p>
                              </div>
                              <h6 className="text-dark mb-0">$250</h6>
                            </Link>

                            <Link
                              to="#"
                              className="media align-items-center mt-4"
                            >
                              <img
                                src={shop3}
                                className="shadow rounded"
                                style={{ maxWidth: '64px' }}
                                alt=""
                              />
                              <div className="flex-1 text-start ms-3">
                                <h6 className="text-dark mb-0">Watch (Men)</h6>
                                <p className="text-muted mb-0">$800 X 1</p>
                              </div>
                              <h6 className="text-dark mb-0">$800</h6>
                            </Link>
                          </div>

                          <div className="media align-items-center justify-content-between pt-4 border-top">
                            <h6 className="text-dark mb-0">Total($):</h6>
                            <h6 className="text-dark mb-0">$1690</h6>
                          </div>

                          <div className="mt-3 text-center">
                            <Link to="#" className="btn btn-primary me-2">
                              View Cart
                            </Link>
                            <Link to="#" className="btn btn-primary">
                              Checkout
                            </Link>
                          </div>
                          <p className="text-muted text-start mt-1 mb-0">
                            *T&C Apply
                          </p>
                        </DropdownMenu>
                      </Dropdown>
                    </li>
                    <li className="list-inline-item mb-0 pe-1">
                      <Link
                        to="#"
                        className="btn btn-icon btn-soft-primary"
                        onClick={this.toggleWishlistModal}
                      >
                        <i className="uil uil-heart align-middle icons"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item mb-0">
                      <Dropdown
                        color="primary"
                        isOpen={this.state.dropdownIsOpen}
                        toggle={this.toggleDropdownIsOpen}
                      >
                        <DropdownToggle
                          type="button"
                          className="btn btn-icon btn-soft-primary"
                        >
                          <i className="uil uil-user align-middle icons"></i>
                        </DropdownToggle>
                        <DropdownMenu
                          direction="left"
                          className="dd-menu bg-white shadow rounded border-0 mt-3 py-3"
                          style={{ width: '200px' }}
                        >
                          <Link className="dropdown-item text-dark" to="#">
                            <i className="uil uil-user align-middle me-1"></i>{' '}
                            Account
                          </Link>
                          <Link className="dropdown-item text-dark" to="#">
                            <i className="uil uil-clipboard-notes align-middle me-1"></i>{' '}
                            Order History
                          </Link>
                          <Link className="dropdown-item text-dark" to="#">
                            <i className="uil uil-arrow-circle-down align-middle me-1"></i>{' '}
                            Download
                          </Link>
                          <div className="dropdown-divider my-3 border-top"></div>
                          <Link className="dropdown-item text-dark" to="#">
                            <i className="uil uil-sign-out-alt align-middle me-1"></i>{' '}
                            Logout
                          </Link>
                        </DropdownMenu>
                      </Dropdown>
                    </li>
                  </ul>
                );
              }
              else if (
                this.props.router.location.pathname === '/index-apps' ||
                this.props.router.location.pathname === '/index-classic-app' ||
                this.props.router.location.pathname === '/index-job'
              ) {
                return (
                  <ul className="buy-button list-inline mb-0">
                    <li className="list-inline-item mb-0">
                      <Link to="#" className="btn btn-icon btn-light">
                        <img src={appStore} className="avatar avatar-ex-small p-1" alt="" />
                      </Link>
                    </li>{" "}

                    <li className="list-inline-item mb-0">
                      <Link to="#" className="btn btn-icon btn-light">
                        <img src={playStore} className="avatar avatar-ex-small p-1" alt="" />
                      </Link>
                    </li>
                  </ul>
                );
              }
              else {
                return (
                  <ul className="buy-button list-inline mb-0">
                  <div id="navigation">
                  <ul className="navigation-menu">
                 

                  {userRole === "ROLE_USER" || userRole === "ROLE_ADMIN" || userRole === "ROLE_BOARD" || userRole === "ROLE_TRADER"  ? (
                <li>
                <Link to="#"  className="sub-menu-item" onClick={this.handleLogout}>
                  로그아웃
                </Link>
              </li>
              ) : (
                <>
                    <li>
                      <Link to="/auth-login" className="sub-menu-item">
                        로그인
                      </Link>
                    </li>
                    <li>
                    <Link to="/auth-signup" className="sub-menu-item">
                      회원가입
                    </Link>
                  </li>
                </>
              )}



                  </ul>
                </div>
                </ul>
                );
              }
            })()}

            <div id="navigation" style={{ display: this.state.isOpen ? 'block' : 'none' }}>

              <ul className="navigation-menu nav-dark" id="top-menu">
                <li className="has-submenu parent-parent-menu-item">
                </li>
                <li className="has-submenu parent-parent-menu-item">
                </li>
                <li className="has-submenu parent-parent-menu-item">
                </li>
              </ul>
            </div>
          </Container>
        </header>

        <Modal
          isOpen={this.state.wishlistModal}
          tabIndex="-1"
          centered
          contentClassName="rounded shadow-lg border-0 overflow-hidden"
          toggle={this.toggleWishlistModal}
        >
          <ModalBody className="py-5">
            <div className="text-center">
              <div
                className="icon d-flex align-items-center justify-content-center bg-soft-danger rounded-circle mx-auto"
                style={{ height: '95px', width: '95px' }}
              >
                <h1 className="mb-0">
                  <i className="uil uil-heart-break align-middle"></i>
                </h1>
              </div>
              <div className="mt-4">
                <h4>Your wishlist is empty.</h4>
                <p className="text-muted">
                  Create your first wishlist request...
                </p>
                <div className="mt-4">
                  <Link to="#" className="btn btn-outline-primary">
                    + Create new wishlist
                  </Link>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>

      </React.Fragment>
    );
  };
};

export default withRouter(Topbar);

