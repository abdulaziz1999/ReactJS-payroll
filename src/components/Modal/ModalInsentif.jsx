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
    insentifAll: [],
  }

  onFormSubmit = (e) => {
    e.preventDefault()
  }

  getPegawai = async() => {
    await API.getDataPegawai().then((res) => {
      this.setState({
        dataPegawai : res
      })
    })
  }

  getAllInsentif = async() => {
    await API.getAllInsentif().then((result) => {
        this.setState({
            insentifAll: result
          });
    }).catch((err) => {
        console.log("ini eror :"+err)
    })
  }
 
  getKegiatanId = async(event) => {
    let id = event.target.value;
    await API.getKegiatanId(id).then((result) => {
      this.setState({
          kegiatanId: result.detail
        });
    }).catch((err) => {
      console.log("ini eror :"+err)
    })
  }

  componentDidMount() {
    this.getPegawai()
    this.getAllInsentif()
    
  }

  render() {
    const uri = parseInt(this.props.uri)
    const ubah = this.props.ubah
    const save = this.props.save
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
              Tambah Insentif Pegawai
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
                    <Input name="idguru" id="idguru" type="select" onChange={ubah} required>
                      <option disabled selected defaultValue={''}>Pilih Nama Pegawai</option>
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
                  <label htmlFor="exampleFormControlSelect2">Kegiatan - Skala:</label>
                    <Input name="idinsentif" id="exampleFormControlSelect2" type="select" onChange={ubah} required>
                      <option value="1">Pilih Kegiatan</option>
                      {this.state.insentifAll.map((row, index) => {
                          return (
                            <option key={index} value={row.id}>{row.nama_kegiatan} - {row.jenis}</option>
                          )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                  <label>Jabatan :</label>
                    <Input name="nominal" id="nominal" type="select" onChange={ubah} required>
                      <option value="">Pilih Jabatan</option>
                      {this.props.kegiatanId.map((row, index) => {
                          return (
                            <option key={index} value={row.id+'_'+row.nominal}>{row.jabatan}</option>
                          )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                  <label>Frekuensi :</label>
                    <Input name="frekuensi" id="frekuensi" type="number" autocomplete="off" onChange={ubah} required/>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="modal-footer">
            <Button color="danger" data-dismiss="modal" type="button" size="sm" onClick={() => this.props.modalTutup("exampleModal")} >
              <i className="ni ni-fat-remove"></i>Close
            </Button>
            <Button color="info" type="submit" size="sm" onClick={() => save("exampleModal")} >
              <i className="ni ni-fat-add"></i> Tambah
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default ModalTunjangan;
