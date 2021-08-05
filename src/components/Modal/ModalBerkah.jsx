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
import API from '../../service';

class ModalBerkah extends Component {
  state = {
    post: [],
    dataPegawai:[]
  }

  getPegawai = async() => {
    await API.getDataPegawai().then((res) => {
      this.setState({
        dataPegawai : res
      })
    })
  }

  componentDidMount() {
      this.getPegawai()
  }

  render() {
    const status = this.props.status
    const formdata = this.props.data
    const ubah = this.props.updateField
    const lmg = parseInt(localStorage.lmg)
    let idguru, nominal, tanggal
    if(formdata){
      idguru = formdata.idguru
      nominal = formdata.nominal
      tanggal = formdata.tanggal
    }else{
      idguru = ""
      nominal = ""
      tanggal = ""
    }
    console.log(lmg)
    return (
      <>
        <Modal className="modal-dialog-centered" isOpen={this.props.stateExample} toggle={() => this.props.modalBuka("exampleModal")} size="lg">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {status === true ? 'Update Data Potongan' : 'Tambah Data Potongan'}
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
                    <label htmlFor="exampleFormControlSelect1" id={idguru}>Nama Pegawai :</label>
                    <Input name="idguru" id="guruId" type="select" onChange={ubah} required>
                      <option disabled selected value={""}>Pilih Nama Pegawai</option>
                      {this.state.dataPegawai.filter(row => row.idlembaga === lmg)
                        .map((row, index) => {
                            return (
                                <option key={index} value={row.idguru} >{row.nama}</option>
                            )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                  <label>Nominal :</label>
                    <Input autoComplete="off" placeholder="Nominal" id="nominalId" name="nominal" type="number" onChange={ubah} value={nominal} required/>
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                  <label>Tanggal :</label>
                    <Input autoComplete="off" id="tanggalId" name="tanggal" type="date" onChange={ubah} value={tanggal} required/>
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

export default ModalBerkah;
