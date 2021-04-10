import React, { Component } from "react";
import axios from "axios";
// reactstrap components
import {
  Card,
  CardHeader,
  Modal,
  Button,
  Container,
  FormGroup,
  Form,
  Input,
  Col,
  Row,
  CardBody,
  Badge
} from "reactstrap";
// core components
import '../examples/css/Style.css';
import TableComp from "components/Table/TableInsentif";
import API from '../../service';
import Swal from 'sweetalert2'
import { RootOnline } from "service/Config";

class Insentif extends Component {
  state = {
    post: [],
    insentif: [],
    insentifAll:[],
    namaLembaga: "",
    addInsentif: {
      insentif : "",
      nominal : ""
    },
    isUpdate: false,
    searchTerm: "",
    idinsentif: ["1","2"],
    cutOffActiv: []
  };

  getDataCutOff = () => {
    API.getDataCutOff().then((res) => {
      this.setState({
        cutOffActiv: res
      })
    })
  }

  getNamaLembaga = () => {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[3];
    delete axios.defaults.headers.common["Authorization"]
    axios.get('https://kepegawaian.dqakses.id/api/lembagaById/'+id).then((result) => {
      this.setState({
        namaLembaga : result.data[0]['nama_lembaga']
      })
    }).catch((err) => {
      console.log("ini eror : "+err + this.state)
    })
  }

  getDataInsentif = async() => {
    let URL= this.props.location.pathname;
    let arr=URL.split('/');
    let id = arr[3];
    axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
    const result = await axios.get(RootOnline +'/insentifCutoff/'+id )
    try{
      this.setState({
        post: result.data
      });
      // console.log(this.state.post)
    }catch(err) {
      console.log("ini eror :"+err)
    }
  }


  handleSimpan = (modal) => {
    if (this.state.isUpdate) {
      this.toggleClose(modal);
      Swal.fire({
        icon: 'success',
        title: 'Kredit Berhasil Di Simpan',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      this.postDataToAPI();
    }
  };

  getAllInsentif = async() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
    const result = await axios.get(RootOnline +'/insentif')
    try{
      this.setState({
        insentifAll: result.data
      });
    }catch(err) {
      console.log("ini eror :"+err)
    }
  }

  //add master data insentif
  getAddInsentif = async(modal) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
      const result = await axios.post(RootOnline +'/insentif',this.state.addInsentif)
      try{
        this.toggleClose(modal)
        this.getDataInsentif()
      }catch(err) {
        console.log("ini eror :"+err+result)
      }
  }

  getAddInsentifPerCutOff = () => {
    API.postDataInsentifCutoff(this.state.idinsentif).then((res) => {
      console.log(res)
    })
  }

  getInsentif = async() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
    const result = await axios.get(RootOnline +'/insentif/cutoff' )
    // const result = await axios.post(RootOnline +'/insentifCutoff',this.state.idinsentif) 
    try{
      this.setState({
        insentif: result.data
      });
    }catch(err) {
      console.log("ini eror :"+err)
    }
  }  

  getSimpan = () => {
    Swal.fire(
      'Success!',
      'Data Insetif <br> Berhasil Disimpan.',
      'success'
  )
    this.props.history.push('/admin/unit')
  }

  format = amount => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  handleUbah = (event) => {
    let formInsentif = { ...this.state.addInsentif };
    formInsentif[event.target.name] = event.target.value;
    this.setState(
      {
        addInsentif: formInsentif,
      }
    )
    console.log(this.state.addInsentif)
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


  componentDidMount() {
    this.getDataCutOff()
    this.getNamaLembaga()
    this.getInsentif()
    this.getDataInsentif()
    let tableHeaderTop = document.querySelector('.sticky-table thead').getBoundingClientRect().top;
    let ths = document.querySelectorAll('.sticky-table thead th')

    for(let i = 0; i < ths.length; i++) {
      let th = ths[i];
      th.style.top = th.getBoundingClientRect().top - tableHeaderTop + "px";
    }
  }

  render() {
    
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
                      <h3 className="mb-0">Data Insentif Pegawai Lembaga - {this.state.namaLembaga}
                      <Badge 
                    className="ml-3" color="info"><strong>{this.state.cutOffActiv.start} sampai {this.state.cutOffActiv.start}</strong>
                    </Badge>
                     <i className="ni ni-check-bold text-green ml-1"></i>
                      </h3>
                    </Col>
                    <Col md="6" sm="6" className="text-right">
                      <Button color="success" type="button" size="sm" onClick={() => this.toggleModal("exampleModal") }>
                        <i className="fa fa-plus"></i> Insentif
                      </Button>
                      {/* <Button color="success" type="button" size="sm" onClick={this.getAddInsentifPerCutOff}>
                        <i className="fa fa-plus"></i> Add Insentif
                      </Button> */}
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <TableComp data={this.state.post} insentif={this.state.insentif}/>
                </CardBody>
                <Col className="modal-footer">
                  <Button color="success" className="mt-3" size="md" type="button" onClick={this.getSimpan}>Simpan & Lanjutkan</Button>
                </Col>
              </Card>
            </div>
          </Row>
        </Container>

        {/* Modal Insentif */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal("exampleModal")}
          size="lg">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Tambah Insentif
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleClose("exampleModal")}>
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Form>
              {/* <Row>
                <Col md="12">
                  <FormGroup>
                    <label htmlFor="exampleFormControlSelect1">Nama Pegawai :</label>
                    <Input name="nama"id="exampleFormControlSelect1" type="select">
                      <option value="">Pilih Nama Pegawai</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                  <label htmlFor="exampleFormControlSelect2">Jenis Tunjangan:</label>
                  <Input name="nama"id="exampleFormControlSelect2" type="select">
                      <option value="">Pilih Jenis Tunjangan</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row> */}
              <Row>
                <Col md="12">
                  <FormGroup>
                  <label>Nama Insentif :</label>
                    <Input autoComplete="off" placeholder="Nama Insentif" name="insentif" type="text" onChange={this.handleUbah} />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                  <label>Nominal :</label>
                    <Input autoComplete="off" placeholder="Nominal" name="nominal" type="number" onChange={this.handleUbah} />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="modal-footer">
            <Button
              color="danger"
              data-dismiss="modal"
              type="button"
              size="sm"
              onClick={() => this.toggleClose("exampleModal")}
            >
              Close
            </Button>
            <Button
              color="info"
              type="button"
              size="sm"
              onClick={() => this.getAddInsentif("exampleModal")}
            >
              <i className="ni ni-air-baloon"></i> Tambah
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default Insentif;
