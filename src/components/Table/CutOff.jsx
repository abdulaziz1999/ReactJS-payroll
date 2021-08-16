import React, { Component } from "react"
// reactstrap components
import {
    Table,
    CardBody,
    Card,
    CardHeader,
    Button,
    Badge
} from "reactstrap"
// core components
import Moment from 'moment'


class TableCutoff extends Component {
  render(){
    return (
      <>  
      <Card className="shadow">
        <CardHeader className="bg-transparent">
          <h3 className="mb-0">Data Cut Off</h3>
        </CardHeader>
        <CardBody>
          <Table className="align-items-center" responsive> 
            <thead className="thead-light">
              <tr>
                <th scope="col">Range Tanggal</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.length > 0 ? this.props.data.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>{Moment(row.start).format('DD MMMM YYYY')} - {Moment(row.end).format('DD MMMM YYYY')}</td>
                    <td>
                      {row.status === 1 ? <Badge className="p-2" color="success">active</Badge> : <Badge className="p-2" color="danger">non active</Badge>}
                    </td>
                    <td>
                    <Button color="success" size="sm"  type="button" onClick={() => this.props.modal("exampleModal",row)} >
                        <i className="fa fa-pen"></i>
                      </Button>
                      <Button color="danger" size="sm" type="button" onClick={() => this.props.remove(row.id)} >
                        <i className="fa fa-trash"></i>
                      </Button>
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
        </CardBody>
      </Card>
      </>
    )
  }
  
};

export default TableCutoff;
