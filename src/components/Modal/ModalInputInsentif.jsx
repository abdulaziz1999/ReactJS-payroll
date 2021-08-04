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
class ModalUser extends Component {
  state = {
    post: [],
    insentifAll: [],
  }

  componentDidMount() {
  }

  render() {
    const status    = this.props.status
    const formdata  = this.props.data
    const formdata2 = this.props.data2
    const ubah      = this.props.updateField
    const uri       = this.props.uri

    let nama_kegiatan, jenis, nominal, jabatan
    if(formdata){
      nama_kegiatan = formdata.nama_kegiatan
      jenis = formdata.jenis
    }else{
      nama_kegiatan = ""
      jenis = ""
    }
    
    if(formdata2){
      nominal = formdata2.nominal
      jabatan = formdata2.jabatan
    }else{
      nominal = ""
      jabatan = ""
    }

    return (
      <>
        <Modal className="modal-dialog-centered" isOpen={this.props.stateExample} toggle={() => this.props.modalBuka("exampleModal")} size="lg">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {status === true ? 'Update Data Insentif ' : 'Tambah Data Insentif'}
            </h5>
            <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.props.modalTutup("exampleModal")}            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            {!uri ?
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label>Nama Kegiatan :</label>
                    <Input placeholder="Nama Kegiatan" name="nama_kegiatan" autoComplete="off" type="text" onChange={ubah} value={nama_kegiatan}/>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label>Jenis :</label>
                    <Input placeholder="Skala Kegiatan" name="jenis" autoComplete="off" type="select" onChange={ubah}>
                    {!status ?
                      <Fragment>
                        <option selected disabled>Pilih Skala</option>
                        <option value="kecil" >Kecil</option>
                        <option value="sedang" >Sedang</option>
                        <option value="besar" >Besar</option>
                      </Fragment>
                      :
                      <Fragment>
                        <option selected disabled> Pilih Skala</option>
                        {jenis === 'kecil' ?
                        <Fragment>
                          <option value="kecil" selected>Kecil</option>
                          <option value="sedang" >Sedang</option>
                          <option value="besar" >Besar</option> 
                        </Fragment>
                        : ""}
                        {jenis === 'sedang' ?
                          <Fragment>
                            <option value="kecil" >Kecil</option>
                            <option value="sedang" selected>Sedang</option>
                            <option value="besar" >Besar</option> 
                          </Fragment> 
                          : ""
                        }
                        {jenis === 'besar' ?
                          <Fragment>
                            <option value="kecil">Kecil</option>
                            <option value="sedang" >Sedang</option>
                            <option value="besar" selected>Besar</option> 
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
            :
            <Form>
              <Row>
                <input type="hidden" id="kegiatanId" value={uri} />
                <Col md="6">
                  <FormGroup>
                    <label>Jabatan :</label>
                    <Input placeholder="Masukan Jabatan" name="jabatan" autoComplete="off" type="text" onChange={ubah} value={jabatan}/>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label>Nominal :</label>
                    <Input placeholder="Masukan Nominal" name="nominal" autoComplete="off" type="text" onChange={ubah} value={nominal}/>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
            } 
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
