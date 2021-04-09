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
} from "reactstrap";
// core components
import '../examples/css/Style.css';
import TableComp from "components/Table/TableInsentif";
// import API from '../../service';
import Swal from 'sweetalert2'
import { RootOnline } from "service/Config";

class Insentif extends Component {
  state = {
    post: [],
    insentif: [],
    insentifAll:[],
    namaLembaga: "",
    isUpdate: false,
    searchTerm: "",
    idinsentif: ['1','2','3']
  };

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
      console.log(this.state.post)
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

  getAddInsentif = async() => {
      let datapost = {
        insentif : 'PSB',
        nominal : '100000'
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
      const result = await axios.post(RootOnline +'/insentif',datapost)
      try{
        this.setState({
          insentif: result.data
        });
      }catch(err) {
        console.log("ini eror :"+err)
      }
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

  format = amount => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

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
                      <h3 className="mb-0">Data Insentif Pegawai Lembaga - {this.state.namaLembaga}</h3>
                    </Col>
                    <Col md="6" sm="6" className="text-right">
                      <Button
                        color="success"
                        type="button"
                        size="sm"
                        onClick={() =>
                          this.toggleModal("exampleModal")
                        }>
                        <i className="fa fa-plus"></i> Insentif
                        </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <TableComp data={this.state.post} insentif={this.state.insentif}/>
                </CardBody>
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
              <Row>
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
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                  <label>Nominal :</label>
                    <Input
                      placeholder="Nominal"
                      name="total"
                      type="text"
                      // onChange={this.hadleUbah}
                      // value={total}
                    />
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
              onClick={() => this.handleSimpan("exampleModal")}
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
