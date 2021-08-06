// import axios from "axios";

import React from "react";
import { useState } from "react";
import { Col, Form, FormGroup , Input,InputGroup, InputGroupAddon,InputGroupText, Row, Table, Alert} from "reactstrap";


const TableUser = ({data,modal,remove,format}) => {
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
                        }
                        return ""
                    }).map((row,index) => {
                        return(
                            <tr className="text-left" key={index}>
                                <td><b>{row.nama}</b></td>
                                <td><b>{format(row.total)}</b></td>
                                <td>
                                    <div className="btn-group">
                                        {/* <Button
                                            color="info"
                                            type="button"
                                            size="sm"
                                            onClick={() => modal("exampleModal", post)}
                                        >
                                            <i className="ni ni-ruler-pencil"></i> Update
                                        </Button>
                                        &nbsp; */}
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
                            <Alert color="warning" className="text-center mr-6 ml-3">
                                <strong>Warning!</strong> Silahkan Filter Range Tanggal dan Nama Lembaga nya terlebih Dahulu
                            </Alert>
                        </td>
                    </tr>
                }
                </tbody>
            </Table>
        </div>
    )
}

export default TableUser;