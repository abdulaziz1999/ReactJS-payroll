import React, { Component } from "react"
// reactstrap components
import { Card, CardHeader, Container, Row, Col, Button, CardBody ,Badge} from "reactstrap"
// core components
import '../examples/css/Style.css'
import API from '../../service';
import TablePegawai from "../../components/Table/TablePegawai"
import Swal from 'sweetalert2'

class Review extends Component {
  state = {
    dataPegawai: [],
    namaLembaga:[]
  };

  getPegawai = () => {
    API.getDataPegawai().then((res) => {
      this.setState({
        dataPegawai : res
      })
    })
  }

  getSycnPegawai = () => {
    API.getSycnPegawai().then((res) => {
      this.loadingData()
    })
  }

  getDataCutOff = async() => {
    await API.getDataCutOff().then((res) => {
      this.setState({
        cutOffActiv: res
      })
    })
  }

  format = (amount) => {
    return Number(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')
  };

  toggleModal = (state) => {
    this.setState({
      exampleModal: !this.state[state],
    })
  
  };

  toggleClose = (state) => {
    this.setState({
      [state]: !this.state[state],
    })
  }

  loadingData = () => {
    let timerInterval
    Swal.fire(
      {
        title: 'Sedang Sycn Data Pegawai',
        html: 'I will close in <b></b> milliseconds.',
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getContent()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = Swal.getTimerLeft()
              }
            }
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }
  
  componentDidMount() {
      this.getPegawai()

  }

  render() {
    let datapost =  this.state.dataPegawai
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">   
        </div>
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row>
                    <Col md="6" sm="6" className="text-left">
                      <h3 className="mb-0">Data Pegawai
                      <Badge 
                        className="ml-3" color="info">
                      </Badge>
                        <i className="ni ni-check-bold text-green ml-1"></i>
                      </h3>
                    </Col>
                    <Col md="6" sm="6" className="text-right">
                      <Button color="success" type="button" size="sm" onClick={this.getSycnPegawai}>
                        <i className="ni ni-cloud-upload-96"></i> &nbsp; Sycn Pegawai
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                    <TablePegawai data={datapost} />
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
        
        {/* <ModalTunjangan
        stateExample={this.state.exampleModal}
        modalBuka={this.toggleModal}
        modalTutup={this.toggleClose}
        save={this.handleSimpan}
        uri={this.getUriSegment3()}
        /> */}
      </>
    );
  }
}

export default Review;
