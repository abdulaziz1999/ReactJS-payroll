import React, { Component } from "react"
// reactstrap components
import { Card, CardHeader, Container, Row, Col, Button, CardBody ,Badge} from "reactstrap"
// core components
import '../examples/css/Style.css'
import API from '../../service';
import Swal from 'sweetalert2'
import ReviewGapok from "components/Table/ReviewGapok"
import ModalTunjangan from "../../components/Modal/ModalTunjangan"
import Moment from 'moment'
// import Cookies from "js-cookie"

class Review extends Component {
  state = {
    post: [],
    listTunjangan:[],
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

  getTunjangan = async() => {
    await API.getDataTunjangan().then((res) => {
      this.setState({
        listTunjangan: res
      })
    }).catch((err) => {
      console.log("ini eror : "+err)
    })
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

  getReviewGapok = async(uri=false) => {
    this.getClearChache()
    let id = this.getUriSegment3()
    if(uri){
      await API.getDataGapok(uri).then((res) => {
        this.setState({
          post: res
        })
      },(err) => {
        console.log("ini eror :"+err)
      })
    }else{
      await API.getDataGapok(id).then((res) => {
        this.setState({
          post: res
        })
      },(err) => {
        console.log("ini eror :"+err)
      })
    }
  }

  simpanGapok = async() => {
    this.loadingData()
    let id = this.getUriSegment3()
    await API.postDataGapok(id).then((result) => {
      this.props.history.push('/admin/reviewtotal/'+id)
    }).catch((err) => {
      console.log("ini eror : "+err)
    })

    let data = {
      idmenu: 1,
      idcutoff: this.state.cutOffActive.id,
      idlembaga: this.getUriSegment3()
    }
    await API.postLogMenu(data).then((res) => {
    }).catch((err) => {
      console.log("ini eror : "+err)
    })
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
        html: 'Lembaga '+this.state.namaLembaga+'</br> I will close in <b></b> milliseconds.',
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
    let role = JSON.parse(localStorage.user).role
    this.props.history.push('/'+role+'/review/'+idl)
    this.getNamaLembaga(idl)
    this.getDataCutOff()
    this.getClearChache()
    this.getReviewGapok(idl)
    this.getTunjangan()
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
      this.getReviewGapok()
      this.getTunjangan()
    }
  }

  render() {
    let datapost =  this.state.post
    let role = JSON.parse(localStorage.user).role
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
                      <h3 className="mb-0">Review Gapok Lembaga - {this.state.namaLembaga}
                      <Badge className="ml-3" color="info">
                        <strong className="mr-2">{Moment(this.state.cutOffActive.start).format('DD MMMM YYYY')}</strong>
                        sampai 
                        <strong className="ml-2">{Moment(this.state.cutOffActive.end).format('DD MMMM YYYY')}</strong>
                      </Badge>
                      <Badge className="ml-3" color="success">
                          Read Only
                      </Badge>
                      </h3>
                    </Col>
                    <Col md="6" sm="6" className="text-right">
                      {role === 'admin' ? 
                      <Button color="success" type="button" size="sm" onClick={() =>   this.toggleModal("exampleModal") }>
                        <i className="fa fa-plus"></i> Tunjangan
                      </Button> 
                      : '' 
                    }
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <ReviewGapok data={datapost} save={this.simpanGapok} format={this.format} listTunjangan={this.state.listTunjangan}/>
                </CardBody>
                <Col className="modal-footer">
                  {role === 'admin' ? <Button color="success" className="mt-3" size="md" type="button" onClick={this.simpanGapok}>Simpan & Lanjutkan</Button>:''}
                </Col>
              </Card>
            </div>
          </Row>
        </Container>
        
        <ModalTunjangan
        stateExample={this.state.exampleModal}
        modalBuka={this.toggleModal}
        modalTutup={this.toggleClose}
        save={this.handleSimpan}
        updateField={this.handleUbah}
        uri={this.getUriSegment3()}
        />
      </>
    );
  }
}

export default Review;
