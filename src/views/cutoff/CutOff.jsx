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
} from "reactstrap"
// core components
import Swal from 'sweetalert2'
import API from '../../service'
import Calendar from "../../components/Calendar/Calendar"
import TableCutoff from "../../components/Table/CutOff"
import ModalCutOff from "components/Modal/ModalCutoff"
import Moment from 'moment'
class CutOff extends Component {
  
  state = {
    post:[],
    DataRange : [],
    formDate: {
      id : "",
      start : "",
      end : "",
      status:""
    },
    isUpdate: false
  };

  postDataToAPI = async() => {
    let startValue = document.getElementById("starTgl").value
    let endValue = document.getElementById("endTgl").value
    const postData = {
      start: startValue,
      end: endValue,
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

  getDataCutOff = async() => {
    await API.getDataCutOff().then((res) => {
      this.setState({
        post: res
      })
    })
  }

  getDataRangeTgl = async() => {
    await API.getRangeTgl().then((res) => {
      this.setState({DataRange : res})
    })
  }

  putDataCutoff = async() => {
    let id = this.state.formDate.id
    await API.putDataCutOff(this.state.formDate,id).then((res) => {
      this.getDataRangeTgl()
      this.getDataCutOff()
    })
  }

  handleUpdate = (event) => {
    let formDateNew = { ...this.state.formDate };
    formDateNew[event.target.name] = event.target.value;
    this.setState(
      {formDate : formDateNew}, 
      () => {this.handleDiff()});
  };

  handleRemove = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        API.deleteCutOff(id).then(() => {
          this.getDataRangeTgl()
          Swal.fire(
            'Deleted!',
            'Your id '+ id +' been deleted.',
            'success'
          )
        })
      }
    })
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

  toggleModal = (state, post,e) => {
    this.setState({
      exampleModal: !this.state[state],
    });
    this.setState({
      formDate: post,
      isUpdate: true,
    })
}

toggleClose = (state) => {
  this.setState({ [state]: !this.state[state]})
}

handleSimpan = (modal) => {
    this.putDataCutoff()
    this.toggleClose(modal)
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
                  <Badge className="ml-3" color="info">
                    <strong className="mr-2">{Moment(this.state.post.start).format('DD MMMM YYYY')}</strong>
                    sampai 
                    <strong className="ml-2">{Moment(this.state.post.end).format('DD MMMM YYYY')}</strong>
                  </Badge>
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
                            <TableCutoff data={this.state.DataRange} remove={this.handleRemove} modal={this.toggleModal}/>
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

        <ModalCutOff
        data={this.state.formDate} 
        stateExample={this.state.exampleModal} 
        modalBuka={this.toggleModal} 
        modalTutup={this.toggleClose} 
        updateField={this.handleUpdate} 
        save={this.handleSimpan} 
        status={this.state.isUpdate}
        />

      </>
    );
  }
}

export default CutOff;
