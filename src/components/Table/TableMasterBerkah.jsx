// import axios from "axios";

import React from "react";
import { useState } from "react";
import { Col, Form, FormGroup , Input,InputGroup, InputGroupAddon,InputGroupText, Row, Table,Button} from "reactstrap";


const TableBerkah = ({data,modal,remove}) => {
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
                      <th scope="col">Nama Potongan</th>
                      <th scope="col" className="text-center">Act</th>
                    </tr>
                  </thead>
                  <tbody >
                    {data.filter((val) => {
                        if(searchTerm === ""){
                            return val
                        }else if(val.potongan.toLowerCase().includes(searchTerm.toLowerCase())){
                            return val
                        }
                        return ""
                    }).map((post, index) => {
                      return (
                        <tr key={index} className="text-left">
                          <td><b>{post.potongan}</b></td>
                          <td>
                            <div className="btn-group">
                              <Button
                                color="info"
                                type="button"
                                size="sm"
                                onClick={() => modal("exampleModal", post)}
                              >
                                <i className="ni ni-ruler-pencil"></i> Update
                              </Button>
                              &nbsp;
                              <Button
                                color="danger"
                                type="button"
                                size="sm"
                                onClick={() => remove(post.id)}
                              >
                                <i className="fa fa-trash"></i> Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
        </div>
    )
}

export default TableBerkah;