import React, { Component } from "react"
// reactstrap components
import { Card, CardHeader, Container, Row, Col, Button, CardBody ,Badge} from "reactstrap"
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
    dataTunjangan : {
      idtunjangan: "",
      idguru: "",
      noiminal:""
    }
  };

  getUriSegment3 = () => {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[3]
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
  }

  getNamaLembaga = async() => {
    let id = this.getUriSegment3()
    await API.getUnitById(id).then((result) => {
      this.setState({
        namaLembaga : result[0]['nama_lembaga']
      })
    }).catch((err) => {
      console.log("ini eror : "+err)
    })
  }

  simpanGapok = async() => {
    // this.loadingData()
    // let id = this.getUriSegment3()
    // await API.postDataGapok(id).then((result) => {
    //   // this.props.history.push('/admin/reviewtotal/'+id)
    // }).catch((err) => {
      Swal.fire(
        'Success!',
        'Data Ledger <br> Berhasil Disimpan.',
        'success'
      )
      console.log("oke")
    // })
  }

  handleUbah = (event) => {
    let formTunjangan = { ...this.state.dataTunjangan };
    formTunjangan[event.target.name] = event.target.value;
    this.setState({
        dataTunjangan: formTunjangan,
      })
    console.log(this.state.dataTunjangan)
  }

  handleSimpan = async(modal) => {
    let data = {
      idtunjangan: document.getElementById("tunjanganid").value,
      idguru: document.getElementById("guruid").value,
      nominal:document.getElementById("nomtunjangan").value
    }
    await API.postTunjanganPegawai(data).then((res) => {
      this.toggleClose(modal);
      this.getReviewGapok()
    })
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

  handleLocalStorage = () => {
    localStorage.setItem('lastRev', '/admin/review/5')
    let url = localStorage.lastRev
    this.props.history.push(url)
    // this.getNamaLembaga()
    this.getReviewGapok()
  }
  
  format = (amount) => {
    return Number(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
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
  
  componentDidMount() {   
      this.getNamaLembaga()
      this.getDataCutOff()
      this.getClearChache()
  }

  render() {
    // let datapost =  this.state.post
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
                 <TableLedger />
                </CardBody>
                <Col className="modal-footer">
                  <Button color="success" className="mt-3" size="md" type="button" onClick={this.simpanGapok}>Simpan & Lanjutkan</Button>
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
