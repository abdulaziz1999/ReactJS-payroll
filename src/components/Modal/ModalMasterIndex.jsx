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
    let type, idstatus, nominal, golongan
    if(formdata){
      type = formdata.type
      idstatus = formdata.idstatus
      nominal = formdata.nominal
      golongan = formdata.golongan
    }else{
      type = ""
      idstatus = ""
      nominal = ""
      golongan = ""
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
                    <label>Type :</label>
                    <Input name="type" type="text" onChange={ubah} value={type} required/>
                  </FormGroup>
                </Col>
                <Col md="6">
                    <FormGroup>
                    <label>Nominal :</label>
                    <Input placeholder="Masukan Nominal" name="nominal" type="number"  onChange={ubah} value={nominal} autoComplete="off" required/>
                    </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                  <label>Status :</label>
                    {!status ?
                    <Input placeholder="Role" name="idstatus" type="select" onChange={ubah} >
                        <option selected disabled>Pilih Status</option>
                        <option value="PT" >PT</option>
                        <option value="PTT" >PTT</option>
                        <option value="HON" >HON</option>
                        <option value="MHS" >MHS</option>
                    </Input>
                      :
                    <Input placeholder="Role" name="idstatus" type="select" onChange={ubah} value={idstatus}>
                        <option selected disabled>Pilih Status</option>
                        <option value="PT" >PT</option>
                        <option value="PTT" >PTT</option>
                        <option value="HON" >HON</option>
                        <option value="MHS" >MHS</option>  
                    </Input>
                    }
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                  <label>Golongan :</label>
                    {!status ?
                    <Input placeholder="Role" name="golongan" type="select" onChange={ubah} >
                        <option selected disabled>Pilih Golongan</option>
                        <option value="IIA" >IIA</option>
                        <option value="IIB" >IIB</option>
                        <option value="IIC" >IIC</option>
                        <option value="IID" >IID</option>
                        <option value="IIIA" >IIIA</option>
                        <option value="IIIB" >IIIB</option>
                        <option value="IIIC" >IIIC</option>
                        <option value="IIID" >IIID</option>
                        <option value="IVA" >IVA</option>
                        <option value="IVB" >IVB</option>
                        <option value="IVC" >IVC</option>
                        <option value="IVD" >IVD</option>
                    </Input>
                      :
                    <Input placeholder="Role" name="golongan" type="select" onChange={ubah} value={golongan}>
                            <option selected disabled>Pilih Golongan</option>
                            <option value="IIA" >IIA</option>
                            <option value="IIB" >IIB</option>
                            <option value="IIC" >IIC</option>
                            <option value="IID" >IID</option>
                            <option value="IIIA" >IIIA</option>
                            <option value="IIIB" >IIIB</option>
                            <option value="IIIC" >IIIC</option>
                            <option value="IIID" >IIID</option>
                            <option value="IVA" >IVA</option>
                            <option value="IVB" >IVB</option>
                            <option value="IVC" >IVC</option>
                            <option value="IVD" >IVD</option>  
                    </Input>
                    }
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
