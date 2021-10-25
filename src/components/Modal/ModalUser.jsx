import React, { Component, Fragment } from "react";
// reactstrap components
import API from '../../service'
import {
  Modal,
  Button,
  FormGroup,
  Form,
  Input,
  Col,
  Row,
} from "reactstrap";

class ModalUser extends Component {
  state = {
    post: [],
    unit:false,
    listUnit:[]
  }

  getUnit = async() => {
    await API.getUnit().then((res) =>{
      this.setState({
        listUnit : res
      })
    })
  }

  componentDidMount() {
    this.getUnit()
  }

  render() {
    const status = this.props.status
    const formdata = this.props.data
    const ubah = this.props.updateField
    const listunit = this.state.listUnit
    let nama, role, email, idlembaga, password
    if(formdata){
      nama = formdata.name
      role = formdata.role
      email = formdata.email
      idlembaga = formdata.idlembaga
      password = formdata.password
    }else{
      nama = ""
      role = ""
      email = ""
      password = ""
      idlembaga = ""
    }
    return (
      <>
        <Modal className="modal-dialog-centered" isOpen={this.props.stateExample} toggle={() => this.props.modalBuka("exampleModal")} size="lg">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {status === true ? 'Update Data User' : 'Tambah Data User'}
            </h5>
            <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.props.modalTutup("exampleModal")}            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label>Nama User :</label>
                    <Input placeholder="Nama" name="name" autoComplete="off" type="text" onChange={ubah} value={nama} required/>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                  <label>Role :</label>
                    <Input placeholder="Role" name="role" type="select" onChange={ubah} >
                    {!status ?
                      <Fragment>
                        <option selected disabled>Pilih Role</option>
                        <option value="admin" >Admin</option>
                        <option value="dqmart" >DQ Mart</option>
                        <option value="keuangan" >Keuangan</option>
                        <option value="unit">Unit</option>
                      </Fragment>
                      :
                      <Fragment>
                        <option value="" defaultValue="" disabled>Pilih Role {role}</option>
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
                    <Input placeholder="Email" name="email" autoComplete="off" type="email"  onChange={ubah}  value={email} required/>
                  </FormGroup>
                </Col>
                  <Col md="6">
                    <FormGroup>
                    <label>Password :</label>
                      <Input placeholder="Password" autoComplete="off" name="password" type="text" id="passwordUser" onChange={ubah} value={password} required/>
                    </FormGroup>
                  </Col>
                  {role === 'unit' ?
                <Col md={!status ? '12' : '12'}>
                  <FormGroup>
                  <label>Pilih Unit :</label>
                    <Input name="idlembaga" autoComplete="off" type="select"  onChange={ubah} value={idlembaga} required>
                    {listunit.map((row, index) => {
                        return (
                          <Fragment>
                            <option value={row.id}>{row.nama_lembaga}</option>
                          </Fragment>
                        )
                    })}
                    </Input>
                  </FormGroup>
                </Col>
                : ''}
              </Row>
            </Form>
          </div>
          <div className="modal-footer">
            <Button color="danger" data-dismiss="modal" type="button" size="sm" onClick={() => this.props.modalTutup("exampleModal")} >
              Close
            </Button>
            <Button color="info" type="button" size="sm" onClick={() => this.props.save("exampleModal")} >
              <i className="ni ni-air-baloon"></i> {status === true ? 'Update' : 'Save'}
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default ModalUser;
