import React, { Component } from "react"
// reactstrap components
import {
  Card,
  CardHeader,
  Button,
  Container,
  Col,
  Row,
  CardBody,
  Badge,
  // Alert
} from "reactstrap"
// core components
// import "../examples/css/Style.css";
import Calendar from "../../components/Calendar/Calendar"
import TableCutoff from "../../components/Table/CutOff"
import Swal from 'sweetalert2'
import API from '../../service'
class CutOff extends Component {
  
  state = {
      post: [],
      formDate: {
        startDate : "",
        endDate : "",
      },
      DataRange : []
  };

  postDataToAPI = async() => {
    let startValue = document.getElementById("starTgl").value
    let endValue = document.getElementById("endTgl").value
    const postData = {
      start: startValue,
      end: endValue,
      holidays: this.state.holiday,
      status: 1
    }
    await API.postDataCutOff(postData).then((res) =>{
          console.log(res)
          Swal.fire(
                'Success!',
                'Data Cut Off <br> Berhasil Diinput.',
                'success'
            )
          this.props.history.push('/admin/unit')
    })
  };

  getDataCutOff = () => {
    API.getDataCutOff().then((res) => {
      this.setState({
        post: res
      })
    })
  }

  getDataRangeTgl = () => {
    API.getRangeTgl().then((res) => {
      this.setState({DataRange : res})
      console.log(this.state.DataRange)
    })
  }

  handleUpdate = (event) => {
    let formDateNew = { ...this.state.formDate };
    formDateNew[event.target.name] = event.target.value;
    this.setState(
      {formDate : formDateNew}, 
      () => {this.handleDiff()});
  };

  handleConsole = () => {
    console.log(this.postDataToAPI);
  }

  handleStartDate = (value) => {
    this.setState({ startDate: value });
  }

  handleDiff = () => {
     let dateI1 = this.state.formDate.startDate
     let dateI2 = this.state.formDate.endDate
     let date1 = new Date(dateI1);
     let date2 = new Date(dateI2);
     let time_difference = date2.getTime() - date1.getTime();
     let result = time_difference / (1000 * 60 * 60 * 24);
     this.setState({
       dayEfektif : result
     })
                
  }

  Datenow = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }

  componentDidMount() {
    this.getDataCutOff()
    this.getDataRangeTgl()
  }
  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Cut Off Payroll  
                  <Badge className="ml-3" color="info"><strong>{this.state.post.start}</strong> sampai <strong>{this.state.post.end}</strong></Badge>
                  <i className="ni ni-check-bold text-green ml-1"></i>
                  </h3>
                </CardHeader>
                <CardBody>
                    <CardBody>
                    <Row>
                        <Col sm={6}>
                            <Card>
                            <CardBody className="bg-secondary">
                                <Calendar ubah={this.handleUpdate} tglnow={this.Datenow()} />
                            </CardBody>
                            </Card>
                        </Col>
                        <Col sm={6}>
                            <TableCutoff data={this.state.DataRange}/>
                        </Col>
                        <Col className="modal-footer">
                        <Button  color="success" size="md" onClick={this.postDataToAPI}  type="button">
                        Simpan & Lanjutkan
                        </Button>
                        </Col>
                    </Row>
                    </CardBody>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default CutOff;
