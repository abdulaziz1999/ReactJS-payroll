import React, { Component, Fragment } from "react";
// reactstrap components
import {
  Modal,
  Button,
  FormGroup,
  Form,
  Input,
  Col,
  Row,
} from "reactstrap";
import API from "service";

class ModalJamWajib extends Component {
  state = {
    post: [],
    lembaga: []
  }

  getLembaga = async() => {
    await API.getUnit().then((res) =>{
      this.setState({
        lembaga : res
      })
    })
  }

  componentDidMount() {
      this.getLembaga()
  }

  render() {
    const status = this.props.status
    const formdata = this.props.data
    const ubah = this.props.updateField
    let idlembaga, idstatus, jamwajib, jammax
    if(formdata){
      idlembaga = formdata.idlembaga
      idstatus = formdata.idstatus
      jamwajib = formdata.jamwajib
      jammax = formdata.jammax
    }else{
      idlembaga = ""
      idstatus = ""
      jamwajib = ""
      jammax = ""
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
                    <label>Nama Lembaga :</label>
                    <Input name="idlembaga" type="select" onChange={ubah} value={idlembaga} required>
                      <option disabled selected value={""}>Pilih Nama Lembaga</option>
                      {this.state.lembaga.map((row, index) => {
                          return (
                            <option key={index} value={row.id}>{row.nama_lembaga}</option>
                          )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                  <label>Status :</label>
                    <Input placeholder="Role" name="idstatus" type="select" onChange={ubah} >
                    {!status ?
                      <Fragment>
                        <option selected disabled>Pilih Status</option>
                        <option value="PT" >PT</option>
                        <option value="PTT" >PTT</option>
                        <option value="HON" >HON</option>
                        <option value="MHS" >MHS</option>
                      </Fragment>
                      :
                      <Fragment>
                        <option value="" defaultValue="" disabled>Pilih Sttaus </option>
                        {idstatus === 'PT' ?
                        <Fragment>
                            <option value="PT" selected>PT</option>
                            <option value="PTT" >PTT</option>
                            <option value="HON" >HON</option>
                            <option value="MHS" >MHS</option>  
                        </Fragment>
                        : ""}
                        {idstatus === 'PTT' ?
                          <Fragment>
                            <option value="PT" >PT</option>
                            <option value="PTT" selected>PTT</option>
                            <option value="HON" >HON</option>
                            <option value="MHS" >MHS</option>
                          </Fragment> 
                          : ""
                        }
                        {idstatus === 'HON' ?
                          <Fragment>
                            <option value="PT" >PT</option>
                            <option value="PTT" >PTT</option>
                            <option value="HON" selected>HON</option>
                            <option value="MHS" >MHS</option>
                          </Fragment> 
                          : ""
                        }
                        {idstatus === 'MHS' ?
                          <Fragment>
                            <option value="PT" >PT</option>
                            <option value="PTT" >PTT</option>
                            <option value="HON" >HON</option>
                            <option value="MHS" selected>MHS</option>
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
                        <label>Jam Wajib :</label>
                        <Input placeholder="Masukan Jam Wajib" name="jamwajib" type="number"  onChange={ubah} value={jamwajib} autoComplete="off" required/>
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                        <label>Jam Maximal :</label>
                        <Input placeholder="Masukan Jam Maximal" name="jammax" type="number" onChange={ubah} value={jammax} autoComplete="off" required/>
                        </FormGroup>
                    </Col>
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

export default ModalJamWajib;
