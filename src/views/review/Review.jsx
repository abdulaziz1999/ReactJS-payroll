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
} from "reactstrap"
// core components
import '../examples/css/Style.css'
import ReviewGapok from "components/Table/ReviewGapok"
// import API from '../../service';
// import Swal from 'sweetalert2'
import axios from "axios"
import { RootOnline } from "service/Config"

class Review extends Component {
  state = {
    post: [],
    namaLembaga : "",
  };

  getReviewGapok = () => {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[3]
    const config = {headers : {Authorization: `Bearer ` + localStorage.token}}
    axios.get(RootOnline +'/gapok/'+id ,config).then((result) => {
      this.setState({
        post: result.data
      })
    }).catch((err) => {
      console.log("ini eror :"+err)
    })
  }

  simpanGapok = () => {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[3];
    const config = {headers : {Authorization: `Bearer ` + localStorage.token}}
    axios.post(RootOnline +'/gapok/'+id ,config).then((result) => {
      console.log(result.data)
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
    }).catch((err) => {
      console.log("ini eror :"+err)
    })
  }
  
  format = (amount) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
  };
  
  componentDidMount() {
    this.getReviewGapok()
    this.getNamaLembaga()
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
                  <h3 className="mb-0">Review Gapok Lembaga {this.state.namaLembaga}</h3>
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

      </>
    );
  }
}

export default Review;
