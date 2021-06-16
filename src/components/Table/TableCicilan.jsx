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
} from "reactstrap";
import '../../views/examples/css/fixedcolumn.css'

const TableInsentif = ({ data, insentif, format }) => {
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
              {insentif.map((row, index) => {
                  return(
                    <th key={index} scope="col" rowSpan={3}>{row.insentif}</th>
                  )
              })}
              <th scope="col" rowSpan={3}>DQ Mart</th>
              <th scope="col" rowSpan={3}>Total</th>
            </tr>
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
                  elements.push(<td key={i}><strong>{format(post.insentif[i])}</strong></td>);
                }
                return (
                  <tr key={index}>
                    <td><strong>{post.nama}</strong></td>
                    {elements}
                    <td><strong>{format(post.totalinsentif)}</strong></td>
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