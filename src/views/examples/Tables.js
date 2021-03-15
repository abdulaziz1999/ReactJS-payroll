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
import './css/Style.css';
import TableComp from "components/TableComp";
import API from '../../service';
import Swal from 'sweetalert2'
import axios from "axios";

class Kredit extends Component {
  state = {
    post: [],
    formPegawai: {
      id: "",
      idguru: "",
      nama: "",
      nama_lembaga: "",
      total: "",
      idstatus: "",
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
    // API.kreditPegawai(config)
    axios.get('http://127.0.0.1:8000/api/kredit',config)
    .then((result) => {
      this.setState({
        post: result.data
      });
      // console.log(result.data)
    }).catch((err) => {
      console.log("ini eror :"+err)
  })
}

  postDataToAPI = () => {
    API.postPegawai(this.state.formPegawai).then((res) => {
        this.getPostAPI();
        this.hadleFromClear();
      });
    // const config = {headers : {Authorization: `Bearer ` + localStorage.token}}
    // API.postKredit(config,this.state.formPegawai).then((res) =>{
    //     console.log(res)
    // })
  };

  putDataToAPI = () => {
    API.putPegawai(this.state.formPegawai,this.state.formPegawai.id).then((res) => {
        this.getPostAPI();
        this.hadleFromClear();
      });
  };

  handleRemove = (data) => {
    console.log(data);
    // API.deletePegawai(data).then((res) => {
    //   this.getPostAPI();
    // });
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
    let timestamp = new Date().getTime();
    if (!this.state.isUpdate) {
      formPegawaiNew["id"] = timestamp;
    }
    formPegawaiNew[event.target.name] = event.target.value;
    this.setState(
      {
        formPegawai: formPegawaiNew,
      }
    );
  };

  handleSimpan = (modal) => {
    if (this.state.isUpdate) {
      // this.putDataToAPI();
      this.postDataToAPI()
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

  hadleFromClear = () => {
    this.setState({
      isUpdate: false,
      formPegawai: {
        nama: "",
        nama_lembaga: "",
        kredit: "",
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
    console.log(post)
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
    this.getKreditAPI();

  }

  render() {
    const datapost = this.state.post
    const formdata = this.state.formPegawai
    let nama
    let nama_lembaga
    let total
    if(formdata){
      nama = formdata.nama
      nama_lembaga = formdata.nama_lembaga
      total = formdata.total
    }else{
      nama = ""
      nama_lembaga = ""
      total = ""
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
                 <TableComp data={datapost} modal={this.toggleModal} remove={this.handleRemove}/>
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
                    <Input
                      disabled
                      name="nama"
                      id="exampleFormControlInput1"
                      placeholder="nama"
                      value={nama}
                      onChange={this.hadleUbah}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                  <label>Nama Lembaga :</label>
                    <Input
                      disabled        
                      placeholder="Regular"
                      name="nama_lembaga"
                      type="text"
                      onChange={this.hadleUbah}
                      value={nama_lembaga}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                  <label>Jumlah Kredit :</label>
                    <Input
                      placeholder="Kredit"
                      name="total"
                      type="text"
                      onChange={this.hadleUbah}
                      value={total}
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
              <i className="ni ni-air-baloon"></i> Update
            </Button>
          </div>
        </Modal>
        {/* <ModalPop
        modalClouse={this.toggleClose()}
        modal={this.toggleModal()}
        save={this.handleSimpan()}
        ubah={this.hadleUbah()}
        formPegawai={this.state.formPegawai}
        /> */}
      </>
    );
  }
}

export default Kredit;
