import React, { Component } from "react";
// import axios from "axios";
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
import TableComp from "components/Table/TableKredit";
import API from '../../service';
import { RootOnline } from "../../service/Config"
// import Swal from 'sweetalert2'
import axios from "axios";

class Pinjaman extends Component {
  state = {
    post: [],
    formPegawai: {
      idpegawai: "",
      nominal: "",
      tenor: "",
      date: "",
    },
    dataPegawai:[],
    isUpdate: false,
  };
 
  getPostAPI = () => {
    API.getPegawai().then((result) => {
        this.setState({
          post: result
        });
      });
  };

  getPegawai = () => {
    API.getDataPegawai().then((res) => {
      this.setState({
        dataPegawai : res
      })
    })
  }

  getKreditAPI = () => {
    const config = {headers : {Authorization: `Bearer ` + localStorage.token}}
    axios.get(RootOnline + '/kredit',config)
    .then((result) => {
      this.setState({
        post: result.data
      });
      // console.log(result.data[2]['nama'])
    }).catch((err) => {
      console.log("ini eror :"+err)
  })
}

  postDataToAPI = async() => {
    await API.postDataKredit(this.state.formPegawai).then((result) => { 
        this.getPostAPI();
        this.hadleFromClear();
    }).catch((err) => {
        console.log("ini eror :"+err)
    })
  };

  putDataToAPI = () => {
    const postData = {
      idpegawai: this.state.formPegawai.idguru,
      total: this.state.formPegawai.total,
    };
    API.putPegawai(postData,this.state.formPegawai.idguru).then((res) => {
        this.getPostAPI();
        this.hadleFromClear();
      });
  };

  handleRemove = (data) => {
    API.deletePegawai(data).then((res) => {
      this.getPostAPI();
    });
  };

  handleUpdate = (data) => {
    console.log(data);
    this.setState({
      formPegawai: data,
      isUpdate: true,
    });
  };

  hadleUbah = (event) => {
    let formPegawaiNew = { ...this.state.formPegawai };
    formPegawaiNew[event.target.name] = event.target.value;
    this.setState(
      {
        formPegawai: formPegawaiNew,
      }
    );
  };

  handleSimpan = () => {
      this.postDataToAPI()
  };

  hadleFromClear = () => {
    this.setState({
      isUpdate: false,
      formPegawai: {
        idpegawai: "",
        nominal: "",
        tenor: "",
        date: "",
      },
    }); 
  };

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
    });
  
  };

  toggleClose = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  
  componentDidMount() {
    this.getKreditAPI()
    this.getPegawai()
  }

  render() {
    const datapost = this.state.post

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
                  <h3 className="mb-0">Data Pinjaman Pegawai</h3>
                </CardHeader>
                <CardBody>
                <div className="modal-body">
            <Form>
              <Row>
              <Col md="12">
                  <FormGroup>
                  <label>Pegawai :</label>
                    <Input name="idpegawai" type="select" onChange={this.hadleUbah} required>
                      <option disabled selected value={""}>Pilih Nama Pegawai</option>
                      {this.state.dataPegawai.map((row, index) => {
                          return (
                            <option key={index} value={row.idguru}>{row.nama}</option>
                          )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                  <label>Tanggal :</label>
                    <Input name="date" value={this.state.formPegawai.date} autoComplete="off" placeholder="Tenor" type="date" onChange={this.hadleUbah}  />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <label>Besaran Pinjaman :</label>
                    <Input name="nominal" value={this.state.formPegawai.nominal} autoComplete="off" placeholder="Besaran Pinjaman" type="number" onChange={this.hadleUbah} />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                  <label>Tenor :</label>
                    <Input name="tenor" value={this.state.formPegawai.tenor} autoComplete="off" placeholder="Tenor" type="number" onChange={this.hadleUbah}  />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="modal-footer mt--5 mb-2">
            <Button color="info" type="button" size="md" onClick={this.handleSimpan} > 
            <i className="ni ni-air-baloon"></i> Simpan
            </Button>
          </div>
                 <TableComp data={datapost} modal={this.toggleModal} />
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>

        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal("exampleModal")}
          size="lg"
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Update data Pinjaman
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleClose("exampleModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label>Besaran Pinjaman :</label>
                    <Input name="nama" id="exampleFormControlInput1" placeholder="nama" onChange={this.hadleUbah} type="text" />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                  <label>Tenor :</label>
                    <Input placeholder="Regular" name="nama_lembaga" type="text" onChange={this.hadleUbah}  />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                  <label>Pegawai :</label>
                    <Input placeholder="Kredit" autoComplete="off" name="total" type="text" onChange={this.hadleUbah} />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="modal-footer">
            <Button color="danger" data-dismiss="modal" type="button" size="sm" onClick={() => this.toggleClose("exampleModal")} >
              Close
            </Button>
            <Button color="info" type="button" size="sm" onClick={() => this.handleSimpan("exampleModal")} > <i className="ni ni-air-baloon"></i> Update
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default Pinjaman;
