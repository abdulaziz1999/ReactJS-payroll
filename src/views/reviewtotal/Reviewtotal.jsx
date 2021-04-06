import React, { Component } from "react";
// import axios from "axios";
// reactstrap components
import {
  Card,
  CardHeader,
  // Button,
  Container,
  // FormGroup,
  // Form,
  // Input,
  // Col,
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

class Review extends Component {
  state = {
    post: [],
    isUpdate: false,
  };
 
  getPostAPI = () => {
    API.getPegawai().then((result) => {
        this.setState({
          post: result
        });
      });
  };

  getKreditAPI = () => {
    let URL= this.props.location.pathname;
    let arr=URL.split('/');
    let id = arr[3];
    const config = {headers : {Authorization: `Bearer ` + localStorage.token}}
    axios.get(RootOnline +'/summary/'+id ,config)
    .then((result) => {
      // this.setState({
      //   post: result.data
      // });
      console.log(result.data)
    }).catch((err) => {
      console.log("ini eror :"+err)
  })
}


  format = amount => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };


  
  componentDidMount() {
    this.getKreditAPI();

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
                  <h3 className="mb-0">Data Review Jam Tambahan</h3>
                </CardHeader>
                <CardBody>
                 <ReviewGapok data={datapost} modal={this.toggleModal} />
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>

      </>
    );
  }
}

export default Review;
