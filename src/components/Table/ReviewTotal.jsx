// import axios from "axios";

import React from "react";
import { useState } from "react";
import { Col, Form, FormGroup , Input,InputGroup, InputGroupAddon,InputGroupText, Row, Table} from "reactstrap";
import '../../views/examples/css/fixedcolumn.css'

const TableGapok = ({data,format,remove}) => {
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
              <Table className="align-items-center table-flush table-hover" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"><b>Nama Pegawai</b></th>
                      <th scope="col"><b>PT/PTT</b></th>
                      <th scope="col"><b>Jam Quran</b></th>
                      <th scope="col"><b>Jam Kelas</b></th>
                      <th scope="col"><b>Jam Asrama</b></th>
                      <th scope="col"><b>Total Transport</b></th>
                      <th scope="col"><b>Kelebihan Jam</b></th>
                      <th scope="col"><b>Transport</b></th>
                      <th scope="col" className="bg-success text-white text-center"><b>Total</b></th>
                    </tr>
                  </thead>
                  <tbody >
                    {data.length > 0 ? data.filter((val) => {
                        if(searchTerm === ""){
                            return val
                        }else if(val.nama.toLowerCase().includes(searchTerm.toLowerCase())){
                            return val
                        }else if(val.idstatus.toLowerCase().includes(searchTerm.toLowerCase())){
                            return val
                        }
                        return ""
                    }).map((post, index) => {
                      let no = index+1
                      return (
                        <tr key={index}>
                          <td><b>{no++}. | {post.nama}</b></td>
                          <td><b>{post.idstatus}</b></td>
                          <td><b>{post.quran}</b></td>
                          <td><b>{post.kelas}</b></td>
                          <td><b>{post.asrama}</b></td>
                          <td><b>{format(post.total_jam)}</b></td>
                          <td><b>{post.total_jam_tambahan}</b></td>
                          <td><b>{format(post.transport)}</b></td>
                          <td className="text-dark text-center" style={{backgroundColor:"#96E6C4"}}>
                            {/* <b>{format(post.total_jam+post.transport+post.total_jam_tambahan)}</b> */}
                            <strong>{post.total_akhir}</strong>
                          </td>
                        </tr>
                      );
                    })
                    :
                    <tr>
                        <td colSpan="8">
                            <div className="text-center">
                              <img alt="loading ..." width="200" height="120" src={require("assets/img/brand/loading.gif").default}/>
                            </div>
                        </td>
                    </tr>
                    }
                  </tbody>
                </Table>
            </div>
        </div>
    )
}

export default TableGapok;