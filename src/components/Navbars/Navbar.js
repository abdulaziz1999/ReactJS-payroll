import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
// reactstrap components
import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
// Card,  
// CardBody,
//   TabContent,
//   TabPane
} from "reactstrap";

class Navbars extends React.Component {
    state = {
        circledNavPills: 8
      };
      toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
          [state]: index
        });
      };

      
  render() {
    return (
      <>
       <Navbar
          className="navbar-horizontal navbar-dark bg-gradient-info"
          expand="lg"
        >
          <Container>
            <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
              Brand
            </NavbarBrand>
            <button
              aria-controls="navbar-default"
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navbar-default"
              data-toggle="collapse"
              id="navbar-default"
              type="button"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-default">
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={require("assets/img/brand/blue.png").default}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      aria-controls="navbar-default"
                      aria-expanded={false}
                      aria-label="Toggle navigation"
                      className="navbar-toggler"
                      data-target="#navbar-default"
                      data-toggle="collapse"
                      id="navbar-default"
                      type="button"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-lg-auto" navbar>
              <Nav className="nav-pills-circle" id="tabs_2" pills role="tablist">
                <NavItem className="mr-5">
                    <NavLink
                    aria-selected={this.state.circledNavPills === 1}
                    className={classnames("rounded-circle", {
                        active: this.state.circledNavPills === 1
                    })}
                    onClick={e => this.toggleNavs(e, "circledNavPills", 1)}
                    href="#pablo"
                    role="tab"
                    >
                      <Link to="/dash">
                        <span className="nav-link-icon d-block">
                          <i className="ni ni-atom" />
                        </span>
                      </Link>
                    </NavLink>
                </NavItem>
                <NavItem className="mr-5">
                    <NavLink
                    aria-selected={this.state.circledNavPills === 2}
                    className={classnames("rounded-circle", {
                        active: this.state.circledNavPills === 2
                    })}
                    onClick={e => this.toggleNavs(e, "circledNavPills", 2)}
                    href="#pablo"
                    role="tab"
                    >
                    <Link to="/dash2">
                        <span className="nav-link-icon d-block">
                          <i className="ni ni-atom" />
                        </span>
                      </Link>
                    </NavLink>
                </NavItem>
                <NavItem className="mr-5">
                    <NavLink
                    aria-selected={this.state.circledNavPills === 3}
                    className={classnames("rounded-circle", {
                        active: this.state.circledNavPills === 3
                    })}
                    onClick={e => this.toggleNavs(e, "circledNavPills", 3)}
                    href="#pablo"
                    role="tab"
                    >
                    <span className="nav-link-icon d-block">
                        <i className="ni ni-cloud-download-95" />
                    </span>
                    </NavLink>
                </NavItem>
                <NavItem className="mr-5">
                    <NavLink
                    aria-selected={this.state.circledNavPills === 4}
                    className={classnames("rounded-circle", {
                        active: this.state.circledNavPills === 4
                    })}
                    onClick={e => this.toggleNavs(e, "circledNavPills", 4)}
                    href="#pablo"
                    role="tab"
                    >
                    <span className="nav-link-icon d-block">
                        <i className="ni ni-cloud-download-95" />
                    </span>
                    </NavLink>
                </NavItem>
                <NavItem className="mr-5">
                    <NavLink
                    aria-selected={this.state.circledNavPills === 5}
                    className={classnames("rounded-circle", {
                        active: this.state.circledNavPills === 5
                    })}
                    onClick={e => this.toggleNavs(e, "circledNavPills", 5)}
                    href="#pablo"
                    role="tab"
                    >
                    <span className="nav-link-icon d-block">
                        <i className="ni ni-cloud-download-95" />
                    </span>
                    </NavLink>
                </NavItem>
                <NavItem className="mr-5">
                    <NavLink
                    aria-selected={this.state.circledNavPills === 6}
                    className={classnames("rounded-circle", {
                        active: this.state.circledNavPills === 6
                    })}
                    onClick={e => this.toggleNavs(e, "circledNavPills", 6)}
                    href="#pablo"
                    role="tab"
                    >
                    <span className="nav-link-icon d-block">
                        <i className="ni ni-cloud-download-95" />
                    </span>
                    </NavLink>
                </NavItem>
                <NavItem className="mr-5">
                    <NavLink
                    aria-selected={this.state.circledNavPills === 7}
                    className={classnames("rounded-circle", {
                        active: this.state.circledNavPills === 7
                    })}
                    onClick={e => this.toggleNavs(e, "circledNavPills", 7)}
                    href="#pablo"
                    role="tab"
                    >
                    <span className="nav-link-icon d-block">
                        <i className="ni ni-cloud-download-95" />
                    </span>
                    </NavLink>
                </NavItem>
                <NavItem className="mr-5">
                    <NavLink
                    aria-selected={this.state.circledNavPills === 8}
                    className={classnames("rounded-circle", {
                        active: this.state.circledNavPills === 8
                    })}
                    onClick={e => this.toggleNavs(e, "circledNavPills", 8)}
                    href="#pablo"
                    role="tab"
                    >
                    <span className="nav-link-icon d-block">
                        <i className="ni ni-cloud-download-95" />
                    </span>
                    </NavLink>
                </NavItem>
            </Nav>
                <UncontrolledDropdown nav>
                  <DropdownMenu
                    aria-labelledby="navbar-default_dropdown_1"
                    right
                  >
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Something else here
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Navbars;