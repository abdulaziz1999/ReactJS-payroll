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
import TableUser from "components/Table/TableUser";
import API from '../../service';
import { RootOnline } from "service/Config";
// import ModalPop from "components/ModalPop";

class User extends Component {
  state = {
    post: [],
    formUser: {
      id: "",
      name: "",
      role: "",
      email: ""
    },
    isUpdate: false,
  };

  getUserAPI = () => {
    const config = {
      headers : {
        Authorization: `Bearer ` + localStorage.token 
      }
    }
    axios.get(RootOnline + '/user',config).then((result) => {
      this.setState({
        post: result.data
      });
    }).catch((err) => {
      console.log("ini eror :"+err)
  })
}

  postDataToAPI = () => {
    API.postPegawai(this.state.formPegawai).then((res) => {
        this.getPostAPI();
        this.hadleFromClear();
      });
  };

  putDataToAPI = () => {
    API.putPegawai(this.state.formPegawai,this.state.formPegawai.id).then((res) => {
        this.getPostAPI();
        this.hadleFromClear();
      });
  };

  handleRemove = (data) => {
    console.log(data);
    API.deletePegawai(data).then((res) => {
      this.getPostAPI();
    });
  };

  handleUpdate = (data) => {
    console.log(data);
    this.setState({
      formUser: data,
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
      this.putDataToAPI();
      this.toggleClose(modal);
    } else {
      this.postDataToAPI();
    }
  };

  hadleFromClear = () => {
    this.setState({
      isUpdate: false,
      formUser: {
        name: "",
        role: "",
        email: ""
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
      formUser: post,
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
    this.getUserAPI()
    
  }

  render() {
    const datapost = this.state.post
    const formdata = this.state.formUser
    let name
    let role
    let email
    if(formdata){
      name = formdata.name
      role = formdata.role
      email = formdata.email
    }else{
      name = ""
      role = ""
      email = ""
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
                  <Row>
                  <Col md="6" sm="6" className="text-left">
                    <h3 className="mb-0">Data User</h3>
                  </Col>
                  <Col md="6" sm="6" className="text-right">
                  <Button
                    color="success"
                    type="button"
                    size="sm"
                    // onClick={() => ()}
                    >
                    <i className="fa fa-plus"></i> Create
                    </Button>
                  </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <TableUser data={datapost} modal={this.toggleModal} remove={this.handleRemove}/>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>


        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal("exampleModal")}
          size="lg">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Update User
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
                    <label>Nama User :</label>
                    <Input
                      name="name"
                      id="exampleFormControlInput1"
                      placeholder="nama"
                      value={name}
                      onChange={this.hadleUbah}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                  <label>Role :</label>
                    <Input
                      placeholder="Regular"
                      name="role"
                      type="text"
                      onChange={this.hadleUbah}
                      value={role}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                  <label>Email :</label>
                    <Input
                      placeholder="Regular"
                      name="email"
                      type="text"
                      onChange={this.hadleUbah}
                      value={email}
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

export default User;
