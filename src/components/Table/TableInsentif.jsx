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

const TableInsentif = ({ data, insentif, format ,remove}) => {
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
                    <th key={index} scope="col" rowSpan={3}>{row.nama_kegiatan}</th>
                  )
              })}
              <th scope="col" className="bg-success text-white text-center" rowSpan={3}>Total</th>
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
                  if(post.insentif[i] !== 0){
                    let split = post.insentif[i]
                    let arr   = split.split('_')
                    let detailIns = 'Kegiatan : '+arr[1]+', Jabatan : '+arr[2] 
                    elements.push(
                    <td key={i} >
                    <strong title={detailIns}>{format(arr[0])}</strong>
                    </td>);
                  }else{
                    elements.push(<td key={i} ><strong>{post.insentif[i]}</strong></td>);
                  }
                }
                return (
                  <tr key={index}>
                    <td><strong>{post.nama}</strong></td>
                    {/* <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td> */}
                    {elements}
                    <td className="text-dark text-center" style={{backgroundColor:"#96E6C4 !important"}}>
                      <strong>{format(post.totalinsentif)}</strong>
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
