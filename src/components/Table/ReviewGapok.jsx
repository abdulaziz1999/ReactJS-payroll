// import axios from "axios";

import React from "react";
import { useState } from "react";
import { Col, Form, FormGroup , Input,InputGroup, InputGroupAddon,InputGroupText, Row, Table} from "reactstrap";
import '../../views/examples/css/fixedcolumn.css'

const TableGapok = ({data,format,listTunjangan}) => {
    // console.log(save)
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
                      <th scope="col" className="zui-sticky-col" id="table-scroll-x"><b>Nama Pegawai</b></th>
                      <th scope="col"><b>Tahun Masuk</b></th>
                      <th scope="col"><b>Golongan</b></th>
                      <th scope="col"><b>Satuan Index</b></th>
                      <th scope="col"><b>Index Ruang</b></th>
                      <th scope="col"><b>PT/PTT</b></th>
                      <th scope="col"><b>Gaji Pokok</b></th>
                      {listTunjangan.map((row, index) => {
                            return(
                              <th key={index} scope="col" rowSpan={3}>{row.tunjangan}</th>
                            )
                        })}
                      <th scope="col" className="bg-success text-white text-center"><b>Gapok + Tunjangan</b></th>
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
                      var elements=[];
                      for(var i=0;i<post.tunjangan.length;i++){
                        elements.push(<td key={i}><strong>{format(post.tunjangan[i])}</strong></td>);
                      }
                      return (
                        <tr key={index}>
                          <td className="zui-sticky-col"><b>{post.nama}</b></td>
                          <td><b>{post.tahunmasuk}</b></td>
                          <td><b>{post.golongan}</b></td>
                          <td><b>{format(post.satuanindex)}</b></td>
                          <td><b>{post.indexruang}</b></td>
                          <td><b>{post.idstatus}</b></td>
                          <td><b>{format(post.gapok)}</b></td>
                          {elements}
                          <td className="text-dark text-center" style={{backgroundColor:"#96E6C4 !important"}}>
                            <b>{format(post.total_gapok_tunjangan)}</b>
                          </td>
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