import React, { Component } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  Button,
  Container,
  Col,
  Row,
  CardBody,
  Badge
} from "reactstrap";
// core components
import '../examples/css/Style.css';
import ReviewGapok from "components/Table/ReviewTotal";
import API from '../../service';
import Swal from 'sweetalert2'
import Moment from 'moment'
import {removeUserSession} from '../../Utils/Common';

class ReviewTotal extends Component {
  state = {
    post: [],
    cutOffActive: [],
    namaLembaga: "",
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
    }).catch((res) => {
      if(res.response.status === 401){
        removeUserSession()
        this.props.history.push('/auth/login');
      }
    })
  }

  getPostAPI = () => {
    API.getPegawai().then((result) => {
        this.setState({
          post: result
        })
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

  getDataSummary = async(uri=false) => {
    this.getClearChache()
    let id = this.getUriSegment3()
    if(uri){
      await API.getDataSummary(uri).then((result) => {
        this.setState({
          post: result
        })
      }).catch((err) => {
        console.log("ini eror : "+err)
      })
    }else{
      await API.getDataSummary(id).then((result) => {
        this.setState({
          post: result
        })
      }).catch((err) => {
        console.log("ini eror : "+err)
      })
    }
  }

  getSyncronJam = async() => {
    let id = this.getUriSegment3()
    await API.getSyncSummary(id).then((result) => {
      this.setState({
        post: result
      })
    }).catch((err) => {
      console.log("ini eror : "+err)
    })
    this.getDataSummary()
  }

  getStepInsentif = async() => {
    let id = this.getUriSegment3()
    let data = {
      idmenu: 2,
      idcutoff: this.state.cutOffActive.id,
      idlembaga: id
    }
    await API.postLogMenu(data).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log("ini eror : "+err)
    })
    Swal.fire(
      'Success!',
      'Data Jam Tambahan<br> Berhasil Disimpan.',
      'success'
    )
    this.props.history.push('/admin/rev_insentif/'+id)
  }

  format = (amount) => {
    return Number(amount).toFixed().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  handleLocalStorage = () => {
    let idl = localStorage.idl
    let role = JSON.parse(localStorage.user).role
    this.props.history.push('/'+role+'/rev_jam/'+idl)
    this.getNamaLembaga(idl)
    this.getDataCutOff()
    this.getClearChache()
    this.getDataSummary(idl)
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
      this.getDataSummary()
    }

  }

  render() {
    const datapost = this.state.post
    const role  = JSON.parse(localStorage.user).role
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
                      <h3 className="mb-0">Data Total Jam Tambahan Lembaga - {this.state.namaLembaga}
                          <Badge className="ml-3" color="info">
                            <strong className="mr-2">{Moment(this.state.cutOffActive.start).format('DD MMMM YYYY')}</strong>
                            sampai 
                            <strong className="ml-2">{Moment(this.state.cutOffActive.end).format('DD MMMM YYYY')}</strong>
                          </Badge>
                          {role === 'keuangan' ? 
                          <Badge className="ml-3" color="success">
                              Read Only
                          </Badge>
                          :''}
                      </h3>
                    </Col>
                    <Col md="6" sm="6" className="text-right">
                      <Button color="success" type="button" size="sm" onClick={this.getSyncronJam}>
                        <i className="ni ni-cloud-upload-96"></i> Sikronisasi Data
                      </Button> 
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <ReviewGapok data={datapost} modal={this.toggleModal} format={this.format} />
                </CardBody>
                <Col className="modal-footer">
                  {role === 'admin' ? <Button color="success" className="mt-3" size="md" type="button" onClick={this.getStepInsentif}>Simpan & Lanjutkan</Button> : ''}
                </Col>
              </Card>
            </div>
          </Row>
        </Container>

      </>
    );
  }
}

export default ReviewTotal;
