// import axios from "axios";

import React from "react";
import { useState } from "react";
import { Col, Form, FormGroup , Input,InputGroup, InputGroupAddon,InputGroupText, Row, Table, Button} from "reactstrap";


const TableUser = ({data,modal,remove,format,modalAdd}) => {
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div className="">
            {data.length > 0 ? 
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
            : "" }

            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr >
                    <th scope="col">Nama</th>
                    <th scope="col">Nama Lembaga</th>
                    <th scope="col">Jumlah</th>
                    <th scope="col" className="text-center">Act</th>
                    </tr>
                </thead>
                <tbody >
                    {data.length > 0 ? data.filter((val) => {
                        if(searchTerm === ""){
                            return val
                        }else if(val.nama.toLowerCase().includes(searchTerm.toLowerCase())){
                            return val
                        }else if(val.nama_lembaga.toLowerCase().includes(searchTerm.toLowerCase())){
                            return val
                        }
                        return ""
                    }).map((row,index) => {
                        return(
                            <tr className="text-left" key={index}>
                                <td><b>{row.nama}</b></td>
                                <td><b>{row.nama_lembaga}</b></td>
                                <td><b>{format(row.total)}</b></td>
                                <td>
                                    <div className="btn-group">
                                        <Button
                                            color="primary"
                                            type="button"
                                            size="sm"
                                            onClick={() => modalAdd("exampleModal", row)}
                                        >
                                            <i className="fa fa-plus"></i> Tambah
                                        </Button>
                                        &nbsp;
                                        {/* <Button
                                            color="danger"
                                            type="button"
                                            size="sm"
                                            onClick={() => remove(post.id)}
                                        >
                                            <i className="fa fa-trash"></i> Delete
                                        </Button> */}
                                    </div>
                                </td>
                            </tr>
                        )
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

export default TableUser;