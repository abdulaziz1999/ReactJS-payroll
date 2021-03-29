/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Progress,
    Table,
    UncontrolledTooltip,
    CardBody,
    Card,
    CardHeader,
    Container,
    Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header_dash";

const Icons = () => {
 
  return (
    <>
        <Header/>
      
        <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Dash2</h3>
              </CardHeader>
              <CardBody>
              <Table className="align-items-center" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Project</th>
              <th scope="col">Budget</th>
              <th scope="col">Status</th>
              <th scope="col">Users</th>
              <th scope="col">Completion</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <a
                    className="avatar rounded-circle mr-3"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <img
                      alt="..."
                      src={require("assets/img/theme/bootstrap.jpg").default}
                    />
                  </a>
                  <Media>
                    <span className="mb-0 text-sm">
                      Argon Design System
                    </span>
                  </Media>
                </Media>
              </th>
              <td>$2,500 USD</td>
              <td>
                <Badge color="" className="badge-dot mr-4">
                  <i className="bg-warning" />
                  pending
                </Badge>
              </td>
              <td>
                <div className="avatar-group">
                  <a
                    className="avatar avatar-sm"
                    href="#pablo"
                    id="tooltip742438047"
                    onClick={e => e.preventDefault()}
                  >
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={require("assets/img/theme/team-1-800x800.jpg").default}
                    />
                  </a>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip742438047"
                  >
                    Ryan Tompson
                  </UncontrolledTooltip>
                  <a
                    className="avatar avatar-sm"
                    href="#pablo"
                    id="tooltip941738690"
                    onClick={e => e.preventDefault()}
                  >
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={require("assets/img/theme/team-2-800x800.jpg").default}
                    />
                  </a>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip941738690"
                  >
                    Romina Hadid
                  </UncontrolledTooltip>
                  <a
                    className="avatar avatar-sm"
                    href="#pablo"
                    id="tooltip804044742"
                    onClick={e => e.preventDefault()}
                  >
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={require("assets/img/theme/team-3-800x800.jpg").default}
                    />
                  </a>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip804044742"
                  >
                    Alexander Smith
                  </UncontrolledTooltip>
                  <a
                    className="avatar avatar-sm"
                    href="#pablo"
                    id="tooltip996637554"
                    onClick={e => e.preventDefault()}
                  >
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={require("assets/img/theme/team-4-800x800.jpg").default}
                    />
                  </a>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip996637554"
                  >
                    Jessica Doe
                  </UncontrolledTooltip>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="mr-2">60%</span>
                  <div>
                    <Progress
                      max="100"
                      value="60"
                      barClassName="bg-danger"
                    />
                  </div>
                </div>
              </td>
              <td className="text-right">
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-icon-only text-light"
                    href="#pablo"
                    role="button"
                    size="sm"
                    color=""
                    onClick={e => e.preventDefault()}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
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
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Something else here
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          </tbody>
        </Table>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Icons;
