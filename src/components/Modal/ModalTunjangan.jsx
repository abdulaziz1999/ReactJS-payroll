import React, { Component , Fragment} from "react";
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
    jenisTunjangan : [],
    idt:"",
    nominal : ""
  }

  onFormSubmit = (e) => {
    e.preventDefault()
  }

  getPegawai = async() => {
    await API.getDataPegawai().then((res) => {
      this.setState({
        dataPegawai : res,
        nominal : ""
      })
    })
  }

  getJenisTunjangan = async(event) => {
    let id = event.target.value
    await API.getDetailTunjangan(id).then((res) => {
      this.setState({
        jenisTunjangan: res
      })
    })
  }

  getNominal = (event) => {
    let dataNom = event.target.value
    let arr = dataNom.split('_')
    let id = arr[0]
    let nom = arr[1]
    this.setState({
        idt: id,
        nominal: nom
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
                    <Input name="idtunjangan" id="tunjanganid" type="select" onChange={this.getNominal} required>
                      <option value="">Pilih Jenis Tunjangan</option>
                      {this.state.jenisTunjangan.map((row, index) => {
                          return (
                            <option key={index} value={row.idtunjangan+'_'+row.nominal}>{row.tunjangan}</option>
                          )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    {/* <Input autoComplete="off" placeholder="Nominal" id="nomtunjangan" name="nominal" type="number" required/> */}
                    {this.state.idt ? this.state.jenisTunjangan.filter(row => row.id === parseInt(this.state.idt)).map((row, index) => {
                          return (
                            <Fragment key={index}>
                              <label>Nominal :</label>
                              <Input autoComplete="off" placeholder="Nominal" id="nomtunjangan" name="nominal" type="number" value={this.state.nominal} onChange={(e) => {this.setState({ nominal : e.target.value})}}/>
                            </Fragment>
                          )
                      }) : ""}
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
