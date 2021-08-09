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
    let tunjangan,nominal,type
    if(formdata){
      tunjangan = formdata.tunjangan
      nominal   = formdata.nominal
      type      = formdata.type
    }else{
      tunjangan = ""
      nominal   = ""
      type      = ""
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
                    <label>Nama Tunjangan :</label>
                    <Input placeholder="Masukan Nama Tunjangan" name="tunjangan" autoComplete="off" type="text" onChange={ubah} value={tunjangan} required/>
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <label>Nominal :</label>
                    <Input placeholder="Masukan Nominal" name="nominal" autoComplete="off" type="number" onChange={ubah} value={nominal} required/>
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <label>Type :</label>
                    <Input name="type" autoComplete="off" type="select" onChange={ubah} required>
                    {!status ?
                      <Fragment> 
                        <option selected disabled>Pilih Type</option>
                        <option value="1" >Cash</option>
                        <option value="2" >Non-Cash</option>
                       </Fragment>
                      :
                      <Fragment>
                        <option disabled> Pilih Type</option>
                        {parseInt(type) === 1 ?
                        <Fragment>
                          <option value="1" selected>Cash</option>
                          <option value="2" >Non-Cash</option>
                        </Fragment>
                        : ""}
                        {parseInt(type) === 2 ?
                          <Fragment>
                            <option value="1" >Cash</option>
                            <option value="2" selected>Non-Cash</option>
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
