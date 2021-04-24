import React, { Component } from "react";
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
import ReviewGapok from "components/Table/ReviewTotal";
import API from '../../service';
import Swal from 'sweetalert2'
import Moment from 'moment'
class ReviewTotal extends Component {
  state = {
    post: [],
    cutOffActive: [],
    namaLembaga: "",
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

  getPostAPI = () => {
    API.getPegawai().then((result) => {
        this.setState({
          post: result
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

  getDataSummary = async() => {
    let id = this.getUriSegment3()
    await API.getDataSummary(id).then((result) => {
      this.setState({
        post: result
      })
    }).catch((err) => {
      console.log("ini eror : "+err)
    })
  }

  getStepInsentif = () => {
    let id = this.getUriSegment3()
    Swal.fire(
      'Success!',
      'Data Jam Tambahan<br> Berhasil Disimpan.',
      'success'
    )
    this.props.history.push('/admin/reviewinsentif/'+id)
  }

  format = amount => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };


  
  componentDidMount() {
    let id = this.getUriSegment3()
    if(!id){

    }else{
      this.getNamaLembaga()
      this.getDataCutOff()
      this.getClearChache()
      this.getDataSummary()
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
                  <h3 className="mb-0">Data Total Jam Tambahan Lembaga - {this.state.namaLembaga}
                      <Badge className="ml-3" color="info">
                        <strong className="mr-2">{Moment(this.state.cutOffActive.start).format('DD MMMM YYYY')}</strong>
                        sampai 
                        <strong className="ml-2">{Moment(this.state.cutOffActive.end).format('DD MMMM YYYY')}</strong>
                      </Badge>
                     <i className="ni ni-check-bold text-green ml-1"></i>
                  </h3>
                </CardHeader>
                <CardBody>
                 <ReviewGapok data={datapost} modal={this.toggleModal} format={this.format} />
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
