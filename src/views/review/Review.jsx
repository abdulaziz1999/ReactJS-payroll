import React, { Component } from "react"
// import axios from "axios";
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Button,
  CardBody,
  Modal,
  Form,
  FormGroup,
  Input
} from "reactstrap"
// core components
import '../examples/css/Style.css'
import ReviewGapok from "components/Table/ReviewGapok"
// import API from '../../service';
// import Swal from 'sweetalert2'
import axios from "axios"
import { RootOnline } from "service/Config"
// import ModalTunjangan from "../../components/Modal/ModalTunjangan"
// import Cookies from "js-cookie"

class Review extends Component {
  state = {
    post: [],
    namaLembaga : "",
  };

  getReviewGapok = async() => {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[3]
    const config = {headers : {Authorization: `Bearer ` + localStorage.token}}
    const result = await axios.get(RootOnline +'/gapok/'+id ,config)
     try{
      this.setState({
        post: result.data
      })
    }catch(err) {
      console.log("ini eror :"+err)
    }
  }

  simpanGapok = () => {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[3];
    axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
    axios.post(RootOnline +'/gapok/'+id ).then((result) => {
      this.props.history.push('/admin/reviewtotal/'+id)
    }).catch((err) => {
      console.log("ini eror : "+err)
    })
  }

  getNamaLembaga = () => {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[3];
    axios.get('https://kepegawaian.dqakses.id/api/lembagaById/'+id).then((result) => {
      this.setState({
        namaLembaga : result.data[0]['nama_lembaga']
      })
      console.log(this.state)
    }).catch((err) => {
      console.log("ini eror : "+err)
    })
  }

  handleLocalStorage = () => {
    localStorage.setItem('lastRev', '/admin/review/5')
    let url = localStorage.lastRev
    this.props.history.push(url)
    // this.getNamaLembaga()
    this.getReviewGapok()
  };
  
  format = (amount) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
  };

  toggleModal = (state) => {
    this.setState({
      exampleModal: !this.state[state],
    });
  
  };

  toggleClose = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };
  
  componentDidMount() {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[3];
    if(!id){
      // this.handleLocalStorage()
    }else{
      this.getReviewGapok()
      this.getNamaLembaga()
    }
  }

  render() {
    let datapost =  this.state.post
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">   
        </div>
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row>
                    <Col md="6" sm="6" className="text-left">
                      <h3 className="mb-0">Review Gapok Lembaga - {this.state.namaLembaga}</h3>
                    </Col>
                    <Col md="6" sm="6" className="text-right">
                      <Button
                        color="success"
                        type="button"
                        size="sm"
                        onClick={() =>
                          this.toggleModal("exampleModal")
                        }>
                        <i className="fa fa-plus"></i> Tunjangan
                        </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <ReviewGapok data={datapost} save={this.simpanGapok} />
                </CardBody>
                <Col className="modal-footer">
                  <Button color="success" className="mt-3" size="md" type="button" onClick={this.simpanGapok}>Simpan & Lanjutkan</Button>
                </Col>
              </Card>
            </div>
          </Row>
        </Container>
        
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal("exampleModal")}
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
              onClick={() => this.toggleClose("exampleModal")}
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
                    <Input name="nama"id="exampleFormControlSelect1" type="select">
                      <option value="">Pilih Nama Pegawai</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                  <label htmlFor="exampleFormControlSelect2">Jenis Tunjangan:</label>
                    <Input name="tunjangan"id="exampleFormControlSelect2" type="select">
                      <option value="">Pilih Jenis Tunjangan</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                  <label>Nominal :</label>
                    <Input
                      placeholder="Kredit"
                      name="total"
                      type="text"
                      // onChange={this.hadleUbah}
                      // value={total}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="modal-footer">
            <Button
              color="danger"
              data-dismiss="modal"
              type="button"
              size="sm"
              onClick={() => this.toggleClose("exampleModal")}
            >
              Close
            </Button>
            <Button
              color="info"
              type="button"
              size="sm"
              onClick={() => this.handleSimpan("exampleModal")}
            >
              <i className="ni ni-air-baloon"></i> Tambah
            </Button>
          </div>
        </Modal>
        {/* <ModalTunjangan/> */}
      </>
    );
  }
}

export default Review;
