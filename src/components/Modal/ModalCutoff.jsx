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

import API from '../../service'
import Moment from 'moment';

class ModalCutOff extends Component {
  state = {
    dataPegawai: [],
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
    console.log(id)
    API.getDetailTunjangan(id).then((res) => {
      console.log(res)
    })
  }
  

  componentDidMount() {
  }

  render() {
    const ubah = this.props.updateField
    const formdata = this.props.data
    let start, end, status
    if(formdata){
      start = Moment(formdata.start).format('DD MMMM YYYY')
      end = Moment(formdata.end).format('DD MMMM YYYY')
      status = formdata.status
    }else{
      start = ""
      end = ""
      status = ""
    }

    return (
      <>
        <Modal className="modal-dialog-centered" isOpen={this.props.stateExample} toggle={() => this.props.modalBuka("exampleModal")} size="lg" >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Update Data Cut Off
            </h5>
            <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.props.modalTutup("exampleModal")} >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                  <label>Awal :</label>
                    <Input autoComplete="off" placeholder="Start" name="start" type="text" readOnly value={start} onChange={ubah}/>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                  <label>Akhir :</label>
                    <Input autoComplete="off" placeholder="End" name="end" type="text" readOnly value={end} onChange={ubah}/>
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <label htmlFor="exampleFormControlSelect1">Status :</label>
                    <Input name="status" id="exampleFormControlSelect1" type="select" value={status} onChange={ubah}>
                        <option disabled selected >Pilih Status</option>
                            {status === '1' ?
                            <Fragment>
                                <option value="1" selected>Active</option>
                                <option value="0">Non Active</option>
                            </Fragment>
                            : 
                            <Fragment>
                                <option value="1">Active</option>
                                <option value="0" selected>Non Active</option>
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
              <i className="ni ni-fat-remove"></i>Close
            </Button>
            <Button color="info" type="submit" size="sm" onClick={() => this.props.save("exampleModal")} >
              <i className="ni ni-fat-add"></i> Update
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default ModalCutOff;
