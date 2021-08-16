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
class ModalImport extends Component {
  state = {
    post: [],
    insentifAll: [],
  }

  // file upload is complete
  fileData = () => {
  
    if (this.state.selectedFile) {
       
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      )
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      )
    }
  }


  componentDidMount() {
  }

  render() {

    return (
      <>
        <Modal className="modal-dialog-centered" isOpen={this.props.stateExample} toggle={() => this.props.modalBuka("exampleModal2")} size="lg">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Upload File Excel
            </h5>
            <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.props.modalTutup("exampleModal2")}            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
                <Form>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Input name="file" type="file" onChange={this.props.updateField} required/>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                    <Button color="success" data-dismiss="modal" type="button" size="sm" onClick={() => this.props.save("exampleModal2")} >
                        <i className="fa fa-download"></i> Upload
                    </Button>
                    </Col>
                  </Row>
                </Form>
                {/* {this.fileData()} */}
          </div>
          <div className="modal-footer">
            <Button color="danger" data-dismiss="modal" type="button" size="sm" onClick={() => this.props.modalTutup("exampleModal2")} >
              Close
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default ModalImport;
