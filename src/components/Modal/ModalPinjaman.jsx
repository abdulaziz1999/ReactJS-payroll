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
  Table,
} from "reactstrap";

import API from '../../service'
import Moment from 'moment'
class ModalPinjaman extends Component {
  state = {
    dataPegawai: [],
    detail : []
  }

  onFormSubmit = (e) => {
    e.preventDefault()
  }

  getPegawai = () => {
    API.getDataPegawai().then((res) => {
      this.setState({
        dataPegawai : res,
      })
    })
  }

  componentDidMount() {
    this.getPegawai()
  }

  render() {
    const formdata = this.props.namaPegawai
    let nama,kredit
    if(formdata){
      nama = formdata
    }else{
      nama = ""
    }

    const dataKredit = this.props.dataDetail
    if(dataKredit){
      kredit = dataKredit
    }else{
      kredit = 0
    }
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={this.props.stateExample}
          toggle={() => this.props.modalBuka("exampleModal")}
          size="xl"
        >
          <div className="modal-header mb--3">
            <h5 className="modal-title" id="exampleModalLabel">
               {this.props.status === true ? 'Detail Pinjaman ' : 'Tambah Pinjaman'}
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
              {!this.props.status ? 
              <Form>
                <Row>
                <Col md="12">
                    <FormGroup>
                    <label>Pegawai :</label>
                      <Input disabled name="idpegawai" type="select" id="idpegawai" value={this.props.dataKredit.idguru} required>
                        <option disabled >Pilih Nama Pegawai</option>
                        {this.state.dataPegawai.map((row, index) => {
                            return (
                              <option key={index} value={row.idguru}>{row.nama}</option>
                            )
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                    <label>Tanggal :</label>
                      <Input name="date" autoComplete="off" placeholder="Tenor" type="date" id="tanggal"  />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label>Besaran Pinjaman :</label>
                      <Input name="nominal" autoComplete="off" placeholder="Besaran Pinjaman" type="number" id="nom_pinjaman" />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                    <label>Tenor :</label>
                      <Input name="tenor" autoComplete="off" placeholder="Tenor" type="number" id="tenor"  />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                    <label>Type :</label>
                      <Input name="type" autoComplete="off" placeholder="type" type="select" id="typeP" >
                        <option selected disabled>Pilih Type</option>
                        <option value="1">Konsumtif</option>
                        <option value="2">Non-Konsumtif</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                    <label>Keterangan :</label>
                      <Input name="ket" autoComplete="off" placeholder="Keterangan" type="text" id="ket"  />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              : 
              <Fragment>
                <h3 style={{ color: 'white',backgroundColor: '#1c345d',borderRadius: '0.25em' , fontSize:"20pt"}} className="text-center mt--3">{nama}</h3>
                <Table className="align-items-center" responsive>
                  <thead className="thead-dark">
                    <tr>
                      <th className="text-white">Type</th>
                      <th className="text-white">Nominal Pinjaman</th>
                      <th className="text-white">Tenor</th>
                      <th className="text-white">Angsuran</th>
                      <th className="text-white">Sisa Bayar</th>
                      <th className="text-white">Tanggal</th>
                      <th className="text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kredit.length >= 1 ? kredit.map((row,index) => {
                      return (
                      <tr key={index}>
                        <td><b>{row.type}</b></td>
                        <td><b>{this.props.format(row.nominal)}</b></td>
                        <td><b>{row.tenor}</b></td>
                        <td><b>{this.props.format(row.angsuran)}</b></td>
                        <td><b>{this.props.format(row.sisa_bayar)}</b></td>
                        <td><b>{Moment(row.date).format('DD MMMM YYYY')}</b></td>
                        <td>
                          <Button color={row.status === 'Belum Lunas' ? 'danger' : 'success'} size="sm" type="button">
                            <b>{row.status}</b>
                          </Button>
                        </td>
                      </tr>
                      )
                    })
                  : ""}
                  </tbody>
                </Table> 
              </Fragment>
              }
          </div>
          <div className="modal-footer mt--3">
            <Button color="danger" data-dismiss="modal" type="button" size="sm" onClick={() => this.props.modalTutup("exampleModal")} >
              <i className="ni ni-fat-remove"></i>Close
            </Button>
            {!this.props.status ?
            <Button color="info" type="submit" size="sm" onClick={() => this.props.save("exampleModal")} >
              <i className="ni ni-fat-add"></i> Tambah
            </Button>
            :""}
          </div>
        </Modal>
      </>
    );
  }
}

export default ModalPinjaman;
