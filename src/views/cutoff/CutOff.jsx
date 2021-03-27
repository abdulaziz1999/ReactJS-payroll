import React, { Component } from "react";
// import ReactDatetime from "react-datetime";
// import axios from "axios";
// reactstrap components
import {
  Card,
  CardHeader,
    // Modal,
    Button,
  Container,
  FormGroup,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
  Col,
  Input,
  Row,
  CardBody,
} from "reactstrap";
// core components
import "../examples/css/Style.css";
import Calendar from "../../components/Calendar/Calendar";
// import Cal from "components/Calendar/Cal";

class CutOff extends Component {
  componentDidMount() {}
  state = {
    startDate : "",
    endDate : ""
  };
  render() {
      console.log(this.state.startDate._d);
      console.log(this.state.endDate._d);
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Cut Off Payroll</h3>
                </CardHeader>
                <CardBody>
              
                    <CardBody>
                    <Row>
                        <Col sm={6}>
                            <Card>
                            <CardBody className="bg-secondary">
                                <Calendar />
                            </CardBody>
                            </Card>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <label>Hari Efektif :</label>
                                <Input
                                name="efektif"
                                id="exampleFormControlInput1"
                                placeholder="Hari Efektif"
                                type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                            <label>Hari Libur :</label>
                                <Input
                                placeholder="Hari Libur"
                                name="holiday"
                                type="text"
                                />
                            </FormGroup>
                        </Col>
                        <Col className="modal-footer">
                        <Button  color="success" size="md"  type="button">
                        Simpan & Lanjutkan
                        </Button>
                        </Col>
                    </Row>
                    </CardBody>
               
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default CutOff;
