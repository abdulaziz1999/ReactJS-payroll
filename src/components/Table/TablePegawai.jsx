// import axios from "axios";

import React from "react";
import { useState } from "react";
import { Col, Form, FormGroup , Input,InputGroup, InputGroupAddon,InputGroupText, Row, Table} from "reactstrap";


const TablPegawai = ({data}) => {
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
                            <Input className="form-control-alternative" placeholder="Search" type="text" onChange={(event) => {setSearchTerm(event.target.value) }}/>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
            <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr >
                      <th scope="col">Nama</th>
                      <th scope="col">Status</th>
                      <th scope="col">Golongan</th>
                      <th scope="col">Satuan Index</th>
                      <th scope="col">Tahun Masuk</th>
                      {/* <th scope="col">Lembaga</th> */}
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
                      let no = index+1
                      return (
                        <tr key={index} className="text-left">
                          <td><b>{no++}. | {post.nama}</b></td>
                          <td><b>{post.idstatus}</b></td>
                          <td><b>{post.golongan}</b></td>
                          <td><b>{post.satuanindex}</b></td>
                          <td><b>{post.tahunmasuk}</b></td>
                          {/* <td><b>{post.idlembaga}</b></td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
        </div>
    )
}

export default TablPegawai;