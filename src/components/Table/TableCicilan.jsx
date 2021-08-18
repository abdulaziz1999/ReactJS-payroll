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

const TableInsentif = ({ data,  format }) => {
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
              <th scope="col" rowSpan={3}>Kredit - Angsuran/Total</th>
              <th scope="col" rowSpan={3}>Laundry</th>
              <th scope="col" className="bg-success text-white text-center" rowSpan={3}>Total</th>
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
                return (
                  <tr key={index}>
                    <td><strong>{post.nama}</strong></td>
                    <td><strong>{post.kredit}</strong></td>
                    <td><strong>{format(post.laundry)}</strong></td>
                    <td className="text-dark text-center" style={{backgroundColor:"#96E6C4"}}>
                      <strong>{format(post.total)}</strong>
                    </td>
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
