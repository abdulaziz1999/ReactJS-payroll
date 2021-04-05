// import axios from "axios";

import React from "react";
import { useState } from "react";
import { Col, Form, FormGroup , Input,InputGroup, InputGroupAddon,InputGroupText, Row, Table} from "reactstrap";


const TableGapok = ({data,modal,remove}) => {
    // console.log(data)
    const [searchTerm, setSearchTerm] = useState("")
    
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
                                onChange={(event) => {
                                    setSearchTerm(event.target.value)
                                }}
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
                      <th scope="col"><b>Nama Pegawai</b></th>
                      <th scope="col"><b>Total Keseluruhan</b></th>
                      <th scope="col"><b>Total Quran</b></th>
                      <th scope="col"><b>Total Kelas</b></th>
                      <th scope="col"><b>Total Asrama</b></th>
                      <th scope="col"><b>Total Transport</b></th>
                      <th scope="col"><b>Lainnya</b></th>
                    </tr>
                  </thead>
                  <tbody >
                    {data.filter((val) => {
                        if(searchTerm === ""){
                            return val
                        }else if(val.nama.toLowerCase().includes(searchTerm.toLowerCase())){
                            return val
                        }
                        return ""
                    }).map((post, index) => {
                      return (
                        <tr key={index}>
                          <td><b>{post.nama}</b></td>
                          <td><b>99</b></td>
                          <td><b>99</b></td>
                          <td><b>99</b></td>
                          <td><b>99</b></td>
                          <td><b>99</b></td>
                          <td><b>Rp. 8000.000</b></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
            </div>
        </div>
    )
}

export default TableGapok;