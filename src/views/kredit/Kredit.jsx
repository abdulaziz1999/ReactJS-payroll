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

class Kredit extends Component {
  state = {
    post: [],
    formPegawai: {
      id: "",
      idpegawai: "",
      nama: "",
      nama_lembaga: "",
      total: "",
      idstatus: "",
    },
    formupdate:{
      idpegawai: "",
      total: ""
    },
    isUpdate: false,
  };
 
  getPostAPI = () => {
    API.getPegawai().then((result) => {
        this.setState({
          post: result
        });
      });
  };

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

  postDataToAPI = () => {
    const postData = {
      idpegawai: this.state.formPegawai.idguru,
      total: this.state.formPegawai.total,
    };
    const config = {headers : {Authorization: `Bearer ` + localStorage.token}}
    axios.post(RootOnline + '/kredit',postData, config).then((res) =>{
          this.getKreditAPI();
          this.hadleFromClear();
        //   Swal.fire(
        //     'Success!',
        //     'User '+res.data['nama']+' <br> Tes.',
        //     'success'
        // )
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

  handleSimpan = (modal) => {
    if (this.state.isUpdate) {
      this.postDataToAPI()
      console.log(this.state.formPegawai)
      this.toggleClose(modal);
    } else {
      this.putDataToAPI()
    }
  };

  hadleFromClear = () => {
    this.setState({
      isUpdate: false,
      formPegawai: {
        nama: "",
        nama_lembaga: "",
        total: "",
        idstatus: "",
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
    this.getKreditAPI();

  }

  render() {
    const datapost = this.state.post
    const formdata = this.state.formPegawai
    let nama
    let nama_lembaga
    // let total
    if(formdata){
      nama = formdata.nama
      nama_lembaga = formdata.nama_lembaga
      // total = formdata.total
    }else{
      nama = ""
      nama_lembaga = ""
      // total = ""
    }

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
                  <h3 className="mb-0">Data Kredit Pegawai</h3>
                </CardHeader>
                <CardBody>
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
              Update data kredit
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
                    <label>Nama Pegawai :</label>
                    <Input disabled name="nama" id="exampleFormControlInput1" placeholder="nama" value={nama} onChange={this.hadleUbah} type="text" />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                  <label>Nama Lembaga :</label>
                    <Input disabled placeholder="Regular" name="nama_lembaga" type="text" onChange={this.hadleUbah} value={nama_lembaga} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                  <label>Jumlah Kredit :</label>
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

export default Kredit;
