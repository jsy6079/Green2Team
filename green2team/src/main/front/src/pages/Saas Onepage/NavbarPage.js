import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Offcanvas, OffcanvasBody } from "reactstrap";
import ScrollspyNav from "./scrollSpy";

//Import Images
import logodark from "../../assets/images/logo-dark.png";

import RightSidebar from '../../components/Layout/RightSidebar';

//Import Icons
import FeatherIcon from "feather-icons-react";

class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [
        { id: 1, idnm: "home", navheading: "Home" },
        { id: 3, idnm: "service", navheading: "Feature" },
        { id: 3, idnm: "testimonial", navheading: "Review" },
        { id: 4, idnm: "pricing", navheading: "Price" },
        { id: 6, idnm: "contact", navheading: "Contact" },
      ],
      open: false,
      position: 'end',
      isOffcanvasOpen: false
    };
    this.toggleLine = this.toggleLine.bind(this);
    this.toggleRightDrawer = this.toggleRightDrawer.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
  }

  toggleOffcanvas = () => {
    this.setState((prevState) => ({
      isOffcanvasOpen: !prevState.isOffcanvasOpen,
    }));
  };

  closeOffcanvas = () => {
      this.setState({ isOffcanvasOpen: false });
  };

  toggleLine() {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }
  toggleRightDrawer = () => {
    this.setState({ position: 'right' });
    this.setState({ open: !this.state.open });
  };
  onDrawerClose = () => {
    this.setState({ open: false });
  };

  initMenu() {
    this.activateMenu();
  }

  render() {
    //Store all Navigationbar Id into TargetID variable(Used for Scrollspy)
    let targetId = this.state.navItems.map((item) => {
      return item.idnm;
    });

    const { isOffcanvasOpen } = this.state;

    return (
      <React.Fragment>
        <header id="topnav" className="defaultscroll sticky">
          <Container>
            <div>
              <Link className="logo" to="#">
                <img src={logodark} height="24" alt="" />
              </Link>
            </div>
            <ul className="buy-button list-inline mb-0">
              <li className="list-inline-item mb-0 me-1 settingbtn">
                <Link to="#" onClick={this.toggleOffcanvas} disabled={this.state.open}>
                  <div className="btn btn-icon btn-pills btn-soft-primary">
                    <FeatherIcon
                      icon="settings"
                      className="fea icon-sm"
                    />
                  </div>
                </Link>
              </li>
              <li className="list-inline-item button mb-0 ps-1 shoppingbtn">
                <Link to="//1.envato.market/landrickreactjs" className="btn btn-icon btn-pills btn-primary">
                  <FeatherIcon
                    icon="shopping-cart"
                    className="fea icon-sm"
                  />
                </Link>
              </li>
            </ul>
            <div className="menu-extras">
              <div className="menu-item">
                <Link
                  to="#"
                  onClick={this.toggleLine}
                  className={
                    this.state.isOpen ? "navbar-toggle open" : "navbar-toggle"
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
            <ScrollspyNav
              scrollTargetIds={targetId}
              scrollDuration="800"
              headerBackground="false"
              activeNavClass="active"
            >
              <div
                id="navigation"
                style={{ display: this.state.isOpen ? "block" : "none" }}
              >
                <ul className="navigation-menu">
                  {this.state.navItems.map((item, key) => (
                    <li
                      key={key}
                      className={
                        item.navheading === "Home"
                          ? "has-submenu active"
                          : "has-submenu"
                      }
                    >
                      <a href={"#" + item.idnm}> {item.navheading}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollspyNav>
          </Container>
        </header>
        <Offcanvas isOpen={isOffcanvasOpen} direction={this.state.position} toggle={this.toggleOffcanvas}>
            <OffcanvasBody>
                <RightSidebar onClose={this.closeOffcanvas} />
            </OffcanvasBody>
        </Offcanvas>
      </React.Fragment>
    );
  }
}

export default NavbarPage;
