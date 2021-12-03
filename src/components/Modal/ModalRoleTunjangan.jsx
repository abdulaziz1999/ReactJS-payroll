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

class ModalTunjangan extends Component {
  state = {
    post: [],
  }

  componentDidMount() {
  }

  render() {
    const status = this.props.status
    const formdata = this.props.data
    const ubah = this.props.updateField
    const idtj = this.props.idtunjangan
    const datatj = this.props.datatj
    let idrole,idtunjangan,menikah,idstatus
    if(formdata){
      idrole        = formdata.id
      idtunjangan   = formdata.idtunjangan
      menikah       = formdata.menikah
      idstatus      = formdata.idstatus
    }else{
      idrole        = ""
      idtunjangan   = ""
      menikah       = ""
      idstatus      = ""
    }

    return (
      <>
        <Modal className="modal-dialog-centered" isOpen={this.props.stateExample} toggle={() => this.props.modalBuka("exampleModal")} size="lg">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {status === true ? 'Update Data Tunjangan' : 'Tambah Data Tunjangan'}
            </h5>
            <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.props.modalTutup("exampleModal")}            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Form>
              <Row>
                <Col md="12">
                  <FormGroup>
                  {!status ?
                      <Fragment> 
                        <label>Nama Tunjangan :</label>
                        <Input placeholder="Masukan Nama Tunjangan" name="tunjangan" disabled autoComplete="off" type="select" id="idtunjangan" value={idtj} required>
                        <option disabled >Pilih Nama Pegawai</option>
                            {datatj.map((row, index) => {
                                return (
                                <option key={index} value={row.id}>{row.tunjangan}</option>
                                )
                            })}
                        </Input>
                       </Fragment>
                      :
                      <Fragment> 
                        <input type="hidden" id="idrole" value={idrole} />
                        <label>Nama Tunjangan :</label>
                        <Input placeholder="Masukan Nama Tunjangan" name="tunjangan" disabled autoComplete="off" type="select" id="idtunjangan" value={idtunjangan} required>
                        <option disabled >Pilih Nama Pegawai</option>
                            {datatj.map((row, index) => {
                                return (
                                <option key={index} value={row.id}>{row.tunjangan}</option>
                                )
                            })}
                        </Input>
                       </Fragment>
                   }
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <label>Menikah :</label>
                    <Input placeholder="Masukan Nominal" name="nominal" autoComplete="off" type="select" onChange={ubah} id="menikah" required>
                    {!status ?
                      <Fragment> 
                        <option selected disabled>Pilihan</option>
                        <option value="0" >Single</option>
                        <option value="1" >Menikah</option>
                       </Fragment>
                      :
                      <Fragment>
                        <option disabled> Pilih Type</option>
                        {menikah === 0 ?
                        <Fragment>
                          <option value="0" selected>Single</option>
                          <option value="1" >Menikah</option>
                        </Fragment>
                        : ""}
                        {menikah === 1 ?
                          <Fragment>
                            <option value="0" >Single</option>
                            <option value="1" selected>Menikah</option>
                          </Fragment> 
                          : ""
                        }
                      </Fragment>
                      }
                      </Input>
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <label>Status :</label>
                    <Input name="type" autoComplete="off" type="select" onChange={ubah} id="idstatus" required>
                    {!status ?
                      <Fragment> 
                        <option selected disabled>Pilih status</option>
                        <option value="PT" >PT</option>
                        <option value="PTT" >PTT</option>
                       </Fragment>
                      :
                      <Fragment>
                        <option disabled> Pilih status</option>
                        {idstatus === 'PT' ?
                        <Fragment>
                          <option value="PT" selected>PT</option>
                          <option value="PTT" >PTT</option>
                        </Fragment>
                        : ""}
                        {idstatus === 'PTT' ?
                          <Fragment>
                            <option value="PT" >PT</option>
                            <option value="PTT" selected>PTT</option>
                          </Fragment> 
                          : ""
                        }
                      </Fragment>
                      }
                      </Input>
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

export default ModalTunjangan;
