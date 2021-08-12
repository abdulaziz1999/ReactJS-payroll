// import axios from "axios";

import React from "react";
import { useState } from "react";
import { 
  Col, 
  Form, 
  FormGroup , 
  Input,
  InputGroup, 
  InputGroupAddon,
  InputGroupText, 
  Row, 
  Table, 
  Badge,
  Button} from "reactstrap";
  import '../../views/examples/css/fixedcolumn.css'

const TableKredit = ({data,modal,format,remove}) => {
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
            <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr >
                      <th scope="col"><b>Nama Pegawai</b></th>
                      <th scope="col"><b>Pinjaman</b></th>
                      <th scope="col"><b>Act</b></th>
                    </tr>
                  </thead>
                  <tbody >
                    {data.length > 0 ? data.filter((val) => {
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
                          <td>
                            <Badge color="" className="badge-dot">
                              <i className="bg-danger" />
                               <b>{post.total_kredit != null ? 'Rp. '+format(post.total_kredit) : '-'}</b>
                            </Badge>
                          </td>
                          <td>
                            <div className="btn-group">
                              <Button
                                color="success"
                                type="button"
                                size="sm"
                                onClick={() =>
                                  modal("exampleModal", post, post.kredit, post.nama)
                                }
                              >
                                <i className="fa fa-eye"></i> Detail
                              </Button>
                              &nbsp;
                              {/* <Button
                                color="danger"
                                type="button"
                                size="sm"
                                onClick={() => remove(post.idguru)}
                              >
                                <i className="fa fa-trash"></i> Delete
                              </Button> */}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                    :
                    <tr>
                        <td colSpan="3">
                            <div className="text-center">
                              <img alt="loading ..." width="200" height="120" src={require("assets/img/brand/loading.gif").default}/>
                            </div>
                        </td>
                    </tr>
                    }
                  </tbody>
                </Table>
        </div>
    )
}

export default TableKredit;