// import axios from "axios";

import React from "react";
import { useState } from "react";
import { Col, Form, FormGroup , Input,InputGroup, InputGroupAddon,InputGroupText, Row, Table,Button} from "reactstrap";


const TableTunjangan = ({data,modal,remove,add}) => {
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
                      <th scope="col">Nama Tunjangan</th>
                      <th scope="col">Menikah</th>
                      <th scope="col">Status</th>
                      <th scope="col" className="text-center">Act</th>
                    </tr>
                  </thead>
                  <tbody >
                    {data.filter((val) => {
                        if(searchTerm === ""){
                            return val
                        }else if(val.tunjangan.toLowerCase().includes(searchTerm.toLowerCase())){
                            return val
                        }
                        return ""
                    }).map((post, index) => {
                      return (
                        <tr key={index} className="text-left">
                          <td><b>{post.tunjangan}</b></td>
                          <td>
                          <b>{post.role.map((row, index) => {
                              return(
                                <li key={index}>
                                    {row.menikah === 1 ? 'menikah' : 'single'} &nbsp; 
                                </li>
                              )
                          })}</b>
                          </td>
                          <td>
                          <b>{post.role.map((row, index) => {
                              return(
                                <li key={index}>
                                  {row.idstatus} &nbsp; 
                                   <i className="ni ni-ruler-pencil text-info" id="cursor" title="edit" onClick={() => modal("exampleModal", row)}></i>&nbsp; - &nbsp;
                                   <i className="fa fa-trash text-red" id="cursor" title="delete" onClick={() => remove(row.id)}></i>
                                </li>
                              )
                          })}</b>
                          </td>
                          <td>
                            <div className="btn-group">
                              <Button
                                color="success"
                                type="button"
                                size="sm"
                                onClick={() => add("exampleModal",post.id)}
                              >
                                <i className="fa fa-plus"></i> Tambah
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

export default TableTunjangan;