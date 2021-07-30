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
import TableComp from "components/Table/TableCicilan";
import API from '../../service';
import Swal from 'sweetalert2'
import Moment from 'moment'

class ReviewCicilan extends Component {
  state = {
    post: [],
    namaLembaga: "",
    isUpdate: false,
    searchTerm: "",
    idinsentif: [],
    cutOffActive: [],
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
    this.getPotonganAll()
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

  getPotonganAll = async(uri=false) => {
    let id = this.getUriSegment3()
    let idc = this.state.cutOffActive.id
    if(uri){
      await API.getPotonganAll(uri,idc).then((res) => {
        this.setState({
          post: res
        })
      })
    }else{
      await API.getPotonganAll(id,idc).then((res) => {
        this.setState({
          post: res
        })
      })
    }
  }


  handleSimpan = async(modal) => {
    await API.postInsentifPegawai(this.state.postInsentif).then((result) => {
        this.toggleClose(modal);
        // this.getPotonganAll()
      }).catch((err) => {
          console.log("ini eror :"+err)
      })
  }

  getSimpan = async() => {
    let id = this.getUriSegment3()
    let idc = this.state.cutOffActive.id
    let data = {
      idmenu: 4,
      idcutoff: idc,
      idlembaga: id
    }
    await API.postLogMenu(data).then((res) => {
    }).catch((err) => {
      console.log("ini eror : "+err)
    })
    Swal.fire(
      'Success!',
      'Data Cicilan <br> Berhasil Disimpan.',
      'success'
    )
    this.props.history.push('/admin/rev_ledger/'+id)
  }

  format = (amount) => {
    return Number(amount).toFixed().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  handleUbah = (event) => {
    let formInsentif = { ...this.state.postInsentif };
    formInsentif[event.target.name] = event.target.value;
    this.setState(
      {
        postInsentif: formInsentif,
      }
    )
    console.log(this.state.postInsentif)
  }

  toggleModal = (state, post,e) => {
    this.setState({
      exampleModal: !this.state[state],
    });
    
    this.setState({
      formPegawai: post,
      isUpdate: true,
    },
    (err) => {
      console.log('error : ', err)
  });
  
  };

  toggleClose = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  handleLocalStorage = () => {
    let idl = localStorage.idl
    let role = JSON.parse(localStorage.user).role
    this.props.history.push('/'+role+'/rev_cicilan/'+idl)
    this.getNamaLembaga(idl)
    this.getDataCutOff()
    this.getClearChache()
    this.getPotonganAll(idl)
  }

  setLocalStorage = () => {
    let id = this.getUriSegment3()
    localStorage.setItem('idl', id)
  }

  componentDidMount() {
    let id= this.getUriSegment3()
    if(!id){
      this.handleLocalStorage()
    }else{
      this.setLocalStorage()
      this.getDataCutOff()
      this.getNamaLembaga()
      this.getClearChache()
    }
  }

  render() {
    const awal  = Moment(this.state.cutOffActive.start).format('DD MMMM YYYY')
    const akhir = Moment(this.state.cutOffActive.end).format('DD MMMM YYYY')
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
                      <h3 className="mb-0">Review Cicicilan Pegawai Lembaga - {this.state.namaLembaga}
                      <Badge className="ml-3" color="info">
                        <strong className="mr-2">{awal}</strong>
                        sampai 
                        <strong className="ml-2">{akhir}</strong>
                      </Badge>
                      {role === 'keuangan' ?
                      <Badge className="ml-3" color="success">
                          Read Only
                      </Badge>
                      : ''} 
                      </h3>
                    </Col>
                    <Col md="6" sm="6" className="text-right">
                      {/* <Button color="success" type="button" size="sm" onClick={() => this.toggleModal("exampleModal") }>
                        <i className="fa fa-plus"></i> Insentif
                      </Button> */}
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <TableComp data={this.state.post} insentif={this.state.insentif} format={this.format}/>
                </CardBody>
                <Col className="modal-footer">
                  {role === 'admin' ? <Button color="success" className="mt-3" size="md" type="button" onClick={this.getSimpan}>Simpan & Lanjutkan</Button> : ''}
                </Col>
              </Card>
            </div>
          </Row>
        </Container>

      </>
    );
  }
}

export default ReviewCicilan;
