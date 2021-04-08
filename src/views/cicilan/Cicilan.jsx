import React, { Component, Fragment } from "react";
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
// import ModalPop from "components/ModalPop";

class User extends Component {
  state = {
    post: [],
    formUser: {
      id: "",
      name: "",
      role: "",
      email: "",
    },
    isUpdate: false,
  }

  getDataUser = () => {
      API.getDataUser().then((res) => {
        this.setState({
          post: res
        })
      })
  }

  putDataUser = () => {
    API.putDataUser(this.state.formUser).then((res) => {
        this.getDataUser()
        this.handleFromClear()
      })
  }

  postDataUser = () => {
    let data = {
      role: this.state.formUser.role,
      email: this.state.formUser.email,
      password: document.getElementById("passwordUser").value
    }
    API.postDataUser(data).then((res) => {
      this.getDataUser()
    })
  }

  handleRemove = (data) => {
    console.log(data)
    API.deleteUser(data).then((res) => {
      this.getDataUser()
    })
  }

  handleUpdate = (data) => {
    console.log(data)
    this.setState({
      formUser: data,
      isUpdate: true,
    })
  }

  handleUbah = (event) => {
    let formUserNew = { ...this.state.formUser }
    formUserNew[event.target.name] = event.target.value
    this.setState(
      {
        formUser: formUserNew,
      })
      console.log(this.state.formUser)
  }

  handleSimpan = (modal) => {
    if (this.state.isUpdate) {
      this.putDataUser()
      this.toggleClose(modal)
    } else {
      this.postDataUser()
      this.toggleClose(modal)
    }
  }

  handleFromClear = () => {
    this.setState({
      isUpdate: false,
      formUser: {
        name: "",
        role: "",
        email: ""
      },
    })
  }

  toggleModal = (state, post,e) => {
      this.setState({
        exampleModal: !this.state[state],
      });
      this.setState({
        formUser: post,
        isUpdate: true,
      },(err) => {
        console.log('error : ', err)
    })
  }

  toggleModalAdd = (state, e) => {
    this.setState({
      exampleModal: !this.state[state],
    });
    this.handleFromClear()
    this.setState({
      isUpdate: false,
    },(err) => {
      console.log('error : ', err)
    })
  }

  toggleClose = (state) => {
    this.setState({ [state]: !this.state[state]})
  }

  format = amount => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  componentDidMount() {
    this.getDataUser()
  }

  render() {
    const datapost = this.state.post
    const formdata = this.state.formUser
    const status = this.state.isUpdate
    let nama 
    let role 
    let email
    if(formdata){
      nama = formdata.name
      role = formdata.role
      email = formdata.email
    }else{
      nama = ""
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
                  <Button color="success" type="button" size="sm" onClick={() => this.toggleModalAdd("exampleModal")} >
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


        <Modal className="modal-dialog-centered" isOpen={this.state.exampleModal} toggle={() => this.toggleModal("exampleModal")} size="lg">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {status === true ? 'Update Data User' : 'Tambah Data User'}
            </h5>
            <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.toggleClose("exampleModal")}            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label>Nama User :</label>
                    <Input readOnly placeholder="Nama" name="name" type="text" onChange={this.handleUbah} value={nama}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                  <label>Role :</label>
                    <Input placeholder="Role" name="role" type="select" onChange={this.handleUbah} >
                    {!status ?
                      <Fragment>
                        <option selected disabled>Pilih Role</option>
                        <option value="admin" >Admin</option>
                        <option value="dqmart" >DQ Mart</option>
                        <option value="keuangan" >Keuangan</option>
                        <option value="unit" >Unit</option>
                      </Fragment>
                      :
                      <Fragment>
                        <option value="" disabled>Pilih Role {role}</option>
                        {role === 'admin' ?
                        <Fragment>
                          <option value="admin" selected>Admin</option>
                          <option value="dqmart" >DQ Mart</option>
                          <option value="keuangan" >Keuangan</option>
                          <option value="unit" >Unit</option>  
                        </Fragment>
                        : ""}
                        {role === 'dqmart' ?
                          <Fragment>
                            <option value="admin">Admin</option>
                            <option value="dqmart" selected>DQ Mart</option>
                            <option value="keuangan" >Keuangan</option>
                            <option value="unit" >Unit</option>
                          </Fragment> 
                          : ""
                        }
                        {role === 'keuangan' ?
                          <Fragment>
                            <option value="admin">Admin</option>
                            <option value="dqmart">DQ Mart</option>
                            <option value="keuangan" selected>Keuangan</option>
                            <option value="unit" >Unit</option>
                          </Fragment> 
                          : ""
                        }
                        {role === 'unit' ?
                          <Fragment>
                            <option value="admin">Admin</option>
                            <option value="dqmart">DQ Mart</option>
                            <option value="keuangan">Keuangan</option>
                            <option value="unit" selected>Unit</option>
                          </Fragment> 
                          : ""
                        }
                      </Fragment>
                      }
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                  <label>Email :</label>
                    <Input placeholder="Email" name="email" type="text" onChange={this.handleUbah} value={email}/>
                  </FormGroup>
                </Col>
                {!status ?
                  <Col md="6">
                  <FormGroup>
                  <label>Password :</label>
                    <Input placeholder="Password" name="password" type="text" id="passwordUser" />
                  </FormGroup>
                </Col>
                :""
                }
              </Row>
            </Form>
          </div>
          <div className="modal-footer">
            <Button color="danger" data-dismiss="modal" type="button" size="sm" onClick={() => this.toggleClose("exampleModal")} >
              Close
            </Button>
            <Button color="info" type="button" size="sm" onClick={() => this.handleSimpan("exampleModal")} >
              <i className="ni ni-air-baloon"></i> Update
            </Button>
          </div>
        </Modal>
        {/* <ModalPop
        modalClouse={this.toggleClose()}
        modal={this.toggleModal()}
        save={this.handleSimpan()}
        ubah={this.handleUbah()}
        formPegawai={this.state.formPegawai}
        /> */}
      </>
    );
  }
}

export default User;
