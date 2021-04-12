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
  }

  componentDidMount() {
  }

  render() {
    const status = this.props.status
    const formdata = this.props.data
    const ubah = this.props.updateField
    let insentif, nominal
    if(formdata){
      insentif = formdata.insentif
      nominal = formdata.nominal
    }else{
      insentif = ""
      nominal = ""
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
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label>Nama Insentif :</label>
                    <Input placeholder="Insentif" name="insentif" type="text" onChange={ubah} value={insentif}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label>Nominal :</label>
                    <Input placeholder="Nominal" name="nominal" type="text" onChange={ubah} value={nominal}
                    />
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
              <i className="ni ni-air-baloon"></i> {status === true ? 'Update' : 'Tambah'}
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default ModalUser;
