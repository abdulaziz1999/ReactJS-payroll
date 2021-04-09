import React, { Component } from "react";
// import axios from "axios";
// reactstrap components
import {
  Card,
  CardHeader,
  Button,
  Container,
  // FormGroup,
  // Form,
  // Input,
  Col,
  Row,
  CardBody,
} from "reactstrap";
// core components
import '../examples/css/Style.css';
import ReviewGapok from "components/Table/ReviewTotal";
import API from '../../service';
// import Swal from 'sweetalert2'
import axios from "axios";
import { RootOnline } from "service/Config";

class ReviewTotal extends Component {
  state = {
    post: [],
    namaLembaga: "",
  };
 
  getPostAPI = () => {
    API.getPegawai().then((result) => {
        this.setState({
          post: result
        });
      });
  };

  getDataSummary = async() => {
    let URL= this.props.location.pathname;
    let arr=URL.split('/');
    let id = arr[3];
    axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
    const result = await axios.get(RootOnline +'/summary/'+id )
    try{
      this.setState({
        post: result.data
      });
      // console.log(result.data)
    }catch(err) {
      console.log("ini eror :"+err)
    }
  }

  getNamaLembaga = () => {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[3];
    delete axios.defaults.headers.common["Authorization"]
    axios.get('https://kepegawaian.dqakses.id/api/lembagaById/'+id).then((result) => {
      this.setState({
        namaLembaga : result.data[0]['nama_lembaga']
      })
    }).catch((err) => {
      console.log("ini eror : "+err + this.state)
    })
  }

  getStepInsentif = () => {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[3];
    this.props.history.push('/admin/insentif/'+id)
  }

  format = amount => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };


  
  componentDidMount() {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[3];
    if(!id){

    }else{
      this.getDataSummary()
      this.getNamaLembaga()
    }

  }

  render() {
    const datapost = this.state.post
    
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
                  <h3 className="mb-0">Data Total Jam Tambahan Lembaga - {this.state.namaLembaga}</h3>
                </CardHeader>
                <CardBody>
                 <ReviewGapok data={datapost} modal={this.toggleModal} />
                </CardBody>
                <Col className="modal-footer">
                  <Button color="success" className="mt-3" size="md" type="button" onClick={this.getStepInsentif}>Simpan & Lanjutkan</Button>
                </Col>
              </Card>
            </div>
          </Row>
        </Container>

      </>
    );
  }
}

export default ReviewTotal;
