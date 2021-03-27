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
  Badge,
  Button,
} from "reactstrap";

const TableInsentif = ({ data, modal, remove }) => {
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
        <Table
          className="align-items-center scroll table-fixed"
          responsive
        >
          <thead className="thead-light">
            <tr>
              <th scope="col">Nama Pegawai</th>
              <th scope="col">Kredit</th>
              <th scope="col">Act</th>
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
                    <td>{post.nama}</td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                        <b>
                          {post.kredit != null ? "Rp. " + post.kredit : "-"}
                        </b>
                      </Badge>
                    </td>
                    <td>
                      <div className="btn-group">
                        <Button
                          color="info"
                          type="button"
                          size="sm"
                          onClick={() => modal("exampleModal", post)}
                        >
                          <i className="fa fa-plus"></i> Update
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
    </div>
  );
};

export default TableInsentif;
