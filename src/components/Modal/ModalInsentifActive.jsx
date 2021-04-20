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
    

    return (
      <>
        <Modal className="modal-dialog-centered" isOpen={this.props.stateModal} toggle={() => this.props.modalBuka("exampleModal1")} size="lg">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
           Tambah Data Insentif
            </h5>
            <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.props.modalTutup("exampleModal1")}            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label>Nama Insentif Active :</label>
                    <Input placeholder="Insentif" name="insentif" autoComplete="off" type="text" 
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  {/* <FormGroup>
                    <label>Nominal :</label>
                    <Input placeholder="Nominal" name="nominal" autoComplete="off" type="text" onChange={ubah} value={nominal}
                    />
                  </FormGroup> */}
                </Col>
              </Row>
            </Form>
          </div>
          <div className="modal-footer">
            <Button color="danger" data-dismiss="modal" type="button" size="sm" onClick={() => this.props.modalTutup("exampleModal1")} >
              Close
            </Button>
            <Button color="info" type="button" size="sm" onClick={() => this.props.save("exampleModal1")} >
              <i className="ni ni-air-baloon"></i> Tambah
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default ModalUser;
