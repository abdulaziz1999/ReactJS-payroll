import React, { Component } from "react";
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

import API from '../../service'
class ModalTunjangan extends Component {
  state = {
    dataPegawai: [],
    jenisTunjangan : []
  }

  onFormSubmit = (e) => {
    e.preventDefault()
  }

  getPegawai = () => {
    API.getDataPegawai().then((res) => {
      this.setState({
        dataPegawai : res
      })
    })
  }

  getJenisTunjangan = (event) => {
    let id = event.target.value
    API.getDetailTunjangan(id).then((res) => {
      this.setState({
        jenisTunjangan: res
      })
    })
  }

  componentDidMount() {
    this.getPegawai()
    console.log()
  }

  render() {
    const uri = parseInt(this.props.uri)
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={this.props.stateExample}
          toggle={() => this.props.modalBuka("exampleModal")}
          size="lg"
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Tambah Tunjangan
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.props.modalTutup("exampleModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Form>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label htmlFor="exampleFormControlSelect1">Nama Pegawai :</label>
                    <Input name="idguru" id="guruid" type="select" onChange={this.getJenisTunjangan} required>
                      <option disabled selected value={""}>Pilih Nama Pegawai</option>
                      {this.state.dataPegawai.filter(row => row.idlembaga === uri)
                      .map((row, index) => {
                          return (
                            <option key={index} value={row.idguru}>{row.nama}</option>
                          )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                  <label htmlFor="exampleFormControlSelect2">Jenis Tunjangan:</label>
                    <Input name="idtunjangan" id="tunjanganid" type="select" required>
                      <option value="">Pilih Jenis Tunjangan</option>
                      {this.state.jenisTunjangan.map((row, index) => {
                          return (
                            <option key={index} value={row.idtunjangan}>{row.tunjangan}</option>
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
                    <Input autoComplete="off" placeholder="Nominal" id="nomtunjangan" name="nominal" type="number" required/>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="modal-footer">
            <Button color="danger" data-dismiss="modal" type="button" size="sm" onClick={() => this.props.modalTutup("exampleModal")} >
              <i className="ni ni-fat-remove"></i>Close
            </Button>
            <Button color="info" type="submit" size="sm" onClick={() => this.props.save("exampleModal")} >
              <i className="ni ni-fat-add"></i> Tambah
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default ModalTunjangan;
