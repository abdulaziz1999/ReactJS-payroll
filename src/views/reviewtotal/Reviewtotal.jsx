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
    axios.get('http://127.0.0.1:8000/api/kredit',config)
    .then((result) => {
      this.setState({
        post: result.data
      });
      // console.log(result.data)
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

  handleRemove = (data) => {
    console.log(data);
    API.deletePegawai(data).then((res) => {
      this.getPostAPI();
    });
  };

  handleUpdate = (data) => {
    console.log(data);
    this.setState({
      formPegawai: data,
      isUpdate: true,
    });
  };

  hadleUbah = (event) => {
    let formPegawaiNew = { ...this.state.formPegawai };
    let timestamp = new Date().getTime();
    if (!this.state.isUpdate) {
      formPegawaiNew["id"] = timestamp;
    }
    formPegawaiNew[event.target.name] = event.target.value;
    this.setState(
      {
        formPegawai: formPegawaiNew,
      }
    );
  };

  handleSimpan = (modal) => {
    if (this.state.isUpdate) {
      this.postDataToAPI()
      console.log(this.state.formPegawai)
      this.toggleClose(modal);
    } else {
      this.putDataToAPI()
    }
  };

  hadleFromClear = () => {
    this.setState({
      isUpdate: false,
      formPegawai: {
        nama: "",
        nama_lembaga: "",
        total: "",
        idstatus: "",
      },
    }); 
  };

  format = amount => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  toggleModal = (state, post,e) => {
    this.setState({
      exampleModal: !this.state[state],
    });
    this.setState({
      formPegawai: post,
      isUpdate: true,
    });
  
  };

  toggleClose = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  
  componentDidMount() {
    this.getKreditAPI();

  }

  render() {
    const datapost = this.state.post
    // const formdata = this.state.formPegawai
    // let nama
    // let nama_lembaga
    // let total
    // if(formdata){
    //   nama = formdata.nama
    //   nama_lembaga = formdata.nama_lembaga
    //   total = formdata.total
    // }else{
    //   nama = ""
    //   nama_lembaga = ""
    //   total = ""
    // }

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
