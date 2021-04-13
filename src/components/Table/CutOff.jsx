import React, { Component } from "react";
// reactstrap components
import {
    Table,
    CardBody,
    Card,
    CardHeader,
    Button,
    Badge
} from "reactstrap";
// core components
// import Header from "components/Headers/Header_dash";

class TableCutoff extends Component {
  render(){
    return (
      <>  
      <Card className="shadow">
        <CardHeader className="bg-transparent">
          <h3 className="mb-0">Data Range Tanggal</h3>
        </CardHeader>
        <CardBody>
          <Table className="align-items-center" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Range Tanggal</th>
                <th scope="col">Status</th>
                <th scope="col">Act</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>{row.start} - {row.end}</td>
                    <td>
                      <Badge className="p-2" color="success">status</Badge>
                    </td>
                    <td>
                    <Button color="success" size="sm" type="button">
                        <i className="fa fa-pen"></i>
                      </Button>
                      <Button color="danger" size="sm" type="button">
                        <i className="fa fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      </>
    )
  }
  
};

export default TableCutoff;
