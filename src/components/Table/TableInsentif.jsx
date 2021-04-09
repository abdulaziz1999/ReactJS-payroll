// import axios from "axios";

import React from "react";
import { useState } from "react";
import {
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Table,
  // Badge,
  // Button,
} from "reactstrap";

const TableInsentif = ({ data, insentif, remove }) => {
  // console.log(data)
  const [searchTerm, setSearchTerm] = useState("");

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
                    setSearchTerm(event.target.value);
                  }}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <div className="table-responsive">
        <Table className="align-items-center table-fixed sticky-table" responsive >
          <thead className="thead-light">
            <tr>
              <th scope="col" rowSpan={3}>Nama Pegawai</th>
              {/* <th className="text-center" scope="col" colSpan={5} >Insentif Rutin</th> */}
              {insentif.map((row, index) => {
                  return(
                    <th key={index} scope="col" rowSpan={3}>{row.insentif}</th>
                  )
              })}
              <th scope="col" rowSpan={3}>Total</th>
            </tr>
            {/* <tr>
              <th className="text-center" scope="col" colSpan={5} >Nominal</th>
            </tr>
            <tr>
              <th scope="col" >Eskul</th>
              <th scope="col" >Bimbel</th>
              <th scope="col" >Pramuka</th>
              <th scope="col" >Pendampingan</th>
              <th scope="col" >Ujian Tahsin</th>
            </tr> */}
          </thead>
          <tbody>
            {data
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.nama.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
                return "";
              })
              .map((post, index) => {
                var elements=[];
                for(var i=0;i<post.insentif.length;i++){
                  elements.push(<td>{post.insentif[i]}</td>);
                }
                return (
                  <tr key={index}>
                    <td>{post.nama}</td>
                    {/* <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td> */}
                    {elements}
                    <td>{post.totalinsentif}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TableInsentif;
