// import axios from "axios";

import React from "react";
// import { useState } from "react";
import { Col, Form, FormGroup , Input,InputGroup, InputGroupAddon,InputGroupText, Row, Table} from "reactstrap";
import '../../views/examples/css/fixedcolumn.css'

const TableLedger = () => {
    // console.log(save)
    // const [searchTerm, setSearchTerm] = useState("")
  
    return (
        <div className="">
            <Form>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <InputGroup className="input-group-alternative mb-4">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                <i className="ni ni-zoom-split-in" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                className="form-control-alternative"
                                placeholder="Search Name Pegawai"
                                type="text"
                                // onChange={(event) => {
                                //     setSearchTerm(event.target.value)
                                // }}
                            />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
            <div className="table-responsive">
              <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" className="zui-sticky-col" id="table-scroll-x"><b>Nama Pegawai</b></th>
                      <th scope="col"><b>Gapok + Tunjangan</b></th>
                      <th scope="col"><b>Jam</b></th>
                      <th scope="col"><b>Insentif</b></th>
                      <th scope="col"><b>Kredit/Cicilan</b></th>
                      <th scope="col"><b>Total Gaji</b></th>
                      <th scope="col"><b>No Rek</b></th>
                    </tr>
                  </thead>
                  <tbody >
                        <tr >
                          <td className="zui-sticky-col"><b>Abdul</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                        </tr>
                        <tr >
                          <td className="zui-sticky-col"><b>Abdul</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                        </tr>
                        <tr >
                          <td className="zui-sticky-col"><b>Abdul</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                        </tr>
                        <tr >
                          <td className="zui-sticky-col"><b>Abdul</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                          <td className="zui-sticky-col"><b>99</b></td>
                        </tr>
                  </tbody>
                </Table>
            </div>
        </div>
    )
}

export default TableLedger;