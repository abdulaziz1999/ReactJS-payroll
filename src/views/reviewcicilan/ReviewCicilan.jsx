import React, { Component } from "react";
import axios from "axios";
// reactstrap components
import {
  Card,
  CardHeader,
  Button,
  Container,
  Col,
  Row,
  CardBody,
  Badge
} from "reactstrap";
// core components
import '../examples/css/Style.css';
import TableComp from "components/Table/TableCicilan";
import API from '../../service';
import Swal from 'sweetalert2'
import { RootOnline } from "service/Config";
import Moment from 'moment'

class ReviewCicilan extends Component {
  state = {
    post: [],
    insentif: [],
    insentifAll:[],
    namaLembaga: "",
    isUpdate: false,
    searchTerm: "",
    idinsentif: [],
    cutOffActive: [],
    postInsentif: {
      idguru: "",
      idinsentif: "",
      nominal: ""
    }
  };

  getUriSegment3 = () => {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[3]
    return id
  }

  getClearChache = async() => {
    await API.hapusChache().then((res) => {
    })
  }

  getDataCutOff = () => {
    API.getDataCutOff().then((res) => {
      this.setState({
        cutOffActive: res
      })
    })
  }

  getNamaLembaga = async() => {
    let id = this.getUriSegment3()
    await API.getUnitById(id).then((result) => {
      this.setState({
        namaLembaga : result[0]['nama_lembaga']
      })
    }).catch((err) => {
      console.log("ini eror : "+err)
    })
  }

  getDataInsentif = async() => {
    let id = this.getUriSegment3()
    axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
    const result = await axios.get(RootOnline +'/potongan/all/'+id +'/'+ this.state.cutOffActive.id )
    try{
      this.setState({
        post: result.data
      });
    }catch(err) {
      console.log("ini eror :"+err)
    }
  }


  handleSimpan = async(modal) => {
    await API.postInsentifPegawai(this.state.postInsentif).then((result) => {
        this.toggleClose(modal);
        // this.getDataInsentif()
      }).catch((err) => {
          console.log("ini eror :"+err)
      })
  }

  getAddInsentifPerCutOff = () => {
    API.postDataInsentifCutoff(this.state.idinsentif).then((res) => {
      console.log(res)
    })
  }

  getInsentif = async() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
    const result = await axios.get(RootOnline +'/insentif/cutoff' )
    // const result = await axios.post(RootOnline +'/insentifCutoff',this.state.idinsentif) 
    try{
      this.setState({
        insentif: result.data
      });
    }catch(err) {
      console.log("ini eror :"+err)
    }
  }  

  getSimpan = () => {
    let id = this.getUriSegment3()
    let idc = this.state.cutOffActive.id
    Swal.fire(
      'Success!',
      'Data Cicilan <br> Berhasil Disimpan.',
      'success'
    )
    this.props.history.push('/admin/reviewledger/'+id+'/'+idc)
  }

  format = (amount) => {
    return Number(amount).toFixed().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  handleUbah = (event) => {
    let formInsentif = { ...this.state.postInsentif };
    formInsentif[event.target.name] = event.target.value;
    this.setState(
      {
        postInsentif: formInsentif,
      }
    )
    console.log(this.state.postInsentif)
  }

  toggleModal = (state, post,e) => {
    this.setState({
      exampleModal: !this.state[state],
    });
    
    this.setState({
      formPegawai: post,
      isUpdate: true,
    },
    (err) => {
      console.log('error : ', err)
  });
  
  };

  toggleClose = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };


  componentDidMount() {
    this.getDataCutOff()
    this.getNamaLembaga()
    this.getDataInsentif()
    this.getClearChache()
  }

  render() {
    const awal = Moment(this.state.cutOffActive.start).format('DD MMMM YYYY')
    const akhir = Moment(this.state.cutOffActive.end).format('DD MMMM YYYY')
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
                      <h3 className="mb-0">Review Cicicilan Pegawai Lembaga - {this.state.namaLembaga}
                      <Badge className="ml-3" color="info">
                        <strong className="mr-2">{awal}</strong>
                        sampai 
                        <strong className="ml-2">{akhir}</strong>
                      </Badge>
                     <i className="ni ni-check-bold text-green ml-1"></i>
                      </h3>
                    </Col>
                    <Col md="6" sm="6" className="text-right">
                      {/* <Button color="success" type="button" size="sm" onClick={() => this.toggleModal("exampleModal") }>
                        <i className="fa fa-plus"></i> Insentif
                      </Button> */}
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <TableComp data={this.state.post} insentif={this.state.insentif} format={this.format}/>
                </CardBody>
                <Col className="modal-footer">
                  <Button color="success" className="mt-3" size="md" type="button" onClick={this.getSimpan}>Simpan & Lanjutkan</Button>
                </Col>
              </Card>
            </div>
          </Row>
        </Container>

      </>
    );
  }
}

export default ReviewCicilan;
