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
    // Badge,
    // DropdownMenu,
    // DropdownItem,
    // UncontrolledDropdown,
    // DropdownToggle,
    // Media,
    // Progress,
    Table,
    // UncontrolledTooltip,
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
                <h3 className="mb-0">Dash1</h3>
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
