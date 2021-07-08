import React, { Component } from "react"
// reactstrap components
import { Card, CardHeader, Container, Button, Row, Col, CardBody ,Badge} from "reactstrap"
// core components
import '../examples/css/Style.css'
import API from '../../service';
import Swal from 'sweetalert2'
import TableLedger from "components/Table/TableLedger"
import Moment from 'moment'
// import Cookies from "js-cookie"

class ReviewLedger extends Component {
  state = {
    post: [],
    cutOffActive: [],
    namaLembaga : "",
  };

  getUriSegment3 = () => {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[3]
    return id
  }

  getUriSegment4 = () => {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[4]
    return id
  }

  getClearChache = async() => {
    await API.hapusChache().then((res) => {
    })
  }

  getDataCutOff = async() => {
    await API.getDataCutOff().then((res) => {
      this.setState({
        cutOffActive: res
      })
    })
    this.getLedger()
  }

  getNamaLembaga = async(uri=false) => {
    let id = this.getUriSegment3()
    if(uri){
      await API.getUnitById(uri).then((result) => {
        this.setState({
          namaLembaga : result[0]['nama_lembaga']
        })
      }).catch((err) => {
        console.log("ini eror : "+err)
      })
    }else{
      await API.getUnitById(id).then((result) => {
        this.setState({
          namaLembaga : result[0]['nama_lembaga']
        })
      }).catch((err) => {
        console.log("ini eror : "+err)
      })
    }
  }

  simpanLedger = async() => {
    let id = this.getUriSegment3()
    let idc = this.state.cutOffActive.id
    let data = {
      idmenu: 5,
      idcutoff: idc,
      idlembaga: id
    }
    await API.postLogMenu(data).then((res) => {
    }).catch((err) => {
      console.log("ini eror : "+err)
    })
    Swal.fire(
      'Success!',
      'Data Ledger <br> Berhasil Disimpan.',
      'success'
    )
    this.props.history.push('/admin/unit')
  }

  loadingData = () => {
    let timerInterval
    Swal.fire(
      {
        title: 'Sedang Mengambil Data Kehadiran',
        html: 'I will close in <b></b> milliseconds.',
        timer: 45000,
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


  getLedger = async(uri=false) => {
    let id = this.getUriSegment3()
    let idcut = this.state.cutOffActive.id
    if(uri){
      await API.getReviewLedger(uri,idcut).then((res) => {
        this.setState({
          post : res
        })
        console.log(this.state.post)
      })
    }else{
      await API.getReviewLedger(id,idcut).then((res) => {
        this.setState({
          post : res
        })
        console.log(this.state.post)
      })
    }
  }
  
  format = (amount) => {
    return Number(amount).toFixed().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  toggleModal = (state) => {
    this.setState({
      exampleModal: !this.state[state],
    })
  }

  toggleClose = (state) => {
    this.setState({
      [state]: !this.state[state],
    })
  }

  handleLocalStorage = () => {
    let idl = localStorage.idl
    this.props.history.push('/admin/reviewledger/'+idl)
    this.getNamaLembaga(idl)
    this.getDataCutOff()
    this.getClearChache()
    this.getLedger(idl)
  }

  setLocalStorage = () => {
    let id = this.getUriSegment3()
    localStorage.setItem('idl', id)
  }
  
  componentDidMount() {  
      let id = this.getUriSegment3()
      if(!id){
        this.handleLocalStorage()
      }else{
        this.setLocalStorage()
        this.getNamaLembaga()
        this.getDataCutOff()
        this.getClearChache()
      }
  }

  render() {
    let datapost =  this.state.post
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
                    <Col md="12" sm="6" className="text-left">
                      <h3 className="mb-0">Review Ledger Lembaga - {this.state.namaLembaga}
                      <Badge className="ml-3" color="info">
                        <strong className="mr-2">{Moment(this.state.cutOffActive.start).format('DD MMMM YYYY')}</strong>
                        sampai 
                        <strong className="ml-2">{Moment(this.state.cutOffActive.end).format('DD MMMM YYYY')}</strong>
                      </Badge>
                        <i className="ni ni-check-bold text-green ml-1"></i>
                      </h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <TableLedger data={datapost} format={this.format} />
                </CardBody>
                <Col className="modal-footer">
                  <Button color="success" className="mt-3" size="md" type="button" onClick={this.simpanLedger}>Simpan</Button>
                </Col>
              </Card>
            </div>
          </Row>
        </Container>
        
      </>
    );
  }
}

export default ReviewLedger;
