import React, { Component } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  // Button,
  Container,
  Col,
  Row,
  CardBody,
} from "reactstrap";
// core components
import '../examples/css/Style.css';
import TableComp from "components/Table/TableKredit";
import API from '../../service';
import ModalPinjaman from "../../components/Modal/ModalPinjaman";
// import Swal from 'sweetalert2'
class Pinjaman extends Component {
  state = {
    post: [],
    formPegawai: {
      idpegawai: "",
      nominal: "",
      tenor: "",
      date: "",
    },
    formData : [],
    detailKredit: [],
    namaPegawai : "",
    isUpdate: false,
  }

  getKreditAPI = async() => {
    await API.getDataKredit().then((result) => {
      this.setState({
        post: result
      })
    }).catch((err) => {
      console.log("ini eror :"+err)
  })
}

  postDataToAPI = async() => {
    let data = {
      idpegawai: document.getElementById("idpegawai").value,
      date     : document.getElementById("tanggal").value,
      nominal  :document.getElementById("nom_pinjaman").value,
      tenor    :document.getElementById("tenor").value
    }
    await API.postDataKredit(data).then((result) => { 
        this.getKreditAPI();
        this.handleFormClear();
    }).catch((err) => {
        console.log("ini eror :"+err)
    })
  }

  handleRemove = (data) => {
    API.deletePegawai(data).then((res) => {
      this.getPostAPI();
    })
  }

  handleUpdate = (data) => {
    console.log(data);
    this.setState({
      formPegawai: data,
      isUpdate: true,
    })
  }

  handleUbah = (event) => {
    let formPegawaiNew = { ...this.state.formPegawai };
    formPegawaiNew[event.target.name] = event.target.value;
    this.setState(
      {
        formPegawai: formPegawaiNew,
      }
    )
  }

  handleSimpan = (modal) => {
      this.postDataToAPI()
      this.toggleClose(modal)
  }

  handleFormClear = () => {
    this.setState({
      isUpdate: false,
      formPegawai: {
        idpegawai: "",
        nominal: "",
        tenor: "",
        date: "",
      },
    })
  }

  format = (amount) => {
    return Number(amount).toFixed().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  toggleModal = (state, post,kredit,nama,e) => {
    this.setState({
      exampleModal: !this.state[state],
    })
    this.setState({
      formData: post,
      detailKredit: kredit,
      namaPegawai : nama,
      isUpdate: true,
    })
  }

  toggleModalAdd = (state,post, e) => {
    this.setState({
      exampleModal: !this.state[state],
    });
    this.setState({
      formData: post,
    })
    console.log(post)
    this.handleFormClear()
    this.setState({
      isUpdate: false,
    },(err) => {
      console.log('error : ', err)
    })
  }

  toggleClose = (state) => {
    this.setState({
      [state]: !this.state[state],
    })
  }

  
  componentDidMount() {
    this.getKreditAPI()
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
                  <Row>
                    <Col md="6" sm="6" className="text-left">
                      <h3 className="mb-0">Data Pinjaman Pegawai</h3>
                    </Col>
                    <Col md="6" sm="6" className="text-right">
                      {/* <Button color="success" type="button" size="sm" onClick={() => this.toggleModalAdd("exampleModal") }>
                        <i className="fa fa-plus"></i> Tambah
                      </Button> */}
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <TableComp data={datapost} modal={this.toggleModal} modalAdd={this.toggleModalAdd} format={this.format}/>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>

        <ModalPinjaman 
        stateExample={this.state.exampleModal}
        modalBuka={this.toggleModal}
        modalTutup={this.toggleClose}
        save={this.handleSimpan}
        dataKredit={this.state.formData}
        namaPegawai={this.state.namaPegawai}
        ubah={this.handleUbah}
        dataDetail={this.state.detailKredit}
        status={this.state.isUpdate}
        format={this.format}
        />
      </>
    );
  }
}

export default Pinjaman;
