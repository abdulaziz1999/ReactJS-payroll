import React, { Component } from "react";
// import axios from "axios";
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  CardBody,
  Button
} from "reactstrap";
// core components
import '../examples/css/Style.css';
import API from '../../service';
// import Swal from 'sweetalert2'
import axios from "axios";

class Review extends Component {
  state = {
    post: [],
    formPegawai: {
      id: "",
      idpegawai: "",
      nama: "",
      nama_lembaga: "",
      total: "",
      idstatus: "",
    },
    formupdate:{
      idpegawai: "",
      total: ""
    },
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
    const config = {headers : {Authorization: `Bearer ` + localStorage.token}}
    axios.get('http://127.0.0.1:8000/api/gapok/5',config)
    .then((result) => {
      // this.setState({
      //   post: result.data
      // });
      console.log(result)
    }).catch((err) => {
      console.log("ini eror :"+err)
  })
}

  postDataToAPI = () => {
    const postData = {
      idpegawai: this.state.formPegawai.idguru,
      total: this.state.formPegawai.total,
    };
    const config = {headers : {Authorization: `Bearer ` + localStorage.token}}
    axios.post('http://127.0.0.1:8000/api/kredit',postData, config).then((res) =>{
          this.getKreditAPI();
          this.hadleFromClear();
    })
  };

  putDataToAPI = () => {
    const postData = {
      idpegawai: this.state.formPegawai.idguru,
      total: this.state.formPegawai.total,
    };
    API.putPegawai(postData,this.state.formPegawai.idguru).then((res) => {
        this.getPostAPI();
        this.hadleFromClear();
      });
  };


  
  componentDidMount() {
    // let step = document.getElementsByClassName("go2441762052");
    // console.log(step)
    // this.getKreditAPI()
  }

  render() {
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
                  <h3 className="mb-0">Pilih Lembaga</h3>
                </CardHeader>
                <CardBody>
                    <Button block color="primary" size="lg" type="button" onClick={this.getKreditAPI}>PAUD <i className="ni ni-check-bold text-green"></i></Button>
                    <Button block color="primary" size="lg" type="button">SDIT <i className="ni ni-fat-remove text-red"></i></Button>
                    <Button block color="primary" size="lg" type="button">SMPIT <i className="ni ni-fat-remove text-red"></i></Button>
                    <Button block color="primary" size="lg" type="button">SMAIT <i className="ni ni-fat-remove text-red"></i></Button>
                    <Button block color="primary" size="lg" type="button">STIU DQ <i className="ni ni-fat-remove text-red"></i></Button>
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
