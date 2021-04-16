import React, { Component } from "react"
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  CardBody,
  Button,
  Col,
  Badge
} from "reactstrap";
// core components
import '../examples/css/Style.css'
import API from '../../service';
// import Swal from 'sweetalert2'
import axios from "axios"
import { RootOnline } from "service/Config"
import Moment from 'moment'

class Unit extends Component {
  state = {
    post: [],
    cutOffActive: [],
    isUpdate: false,
  };
 
  getLembaga = async() => {
    await API.getUnit().then((res) =>{
      this.setState({
        post : res
      })
    })
  };

  getDataCutOff = async() => {
    await API.getDataCutOff().then((res) => {
      this.setState({
        cutOffActive: res
      })
    })
  }

  getReviewLembaga = (event) => {
    let id = event.target.id
    const config = {headers : {Authorization: `Bearer ` + localStorage.token}}
    axios.get(RootOnline + '/gapok/' +id,config)
    .then((result) => {
      this.props.history.push('/admin/review/'+id)
    }).catch((err) => {
      console.log("ini eror :"+err)
    })
  }

  getReviewGapok = (event) => {
    let id = event.target.id
    const config = {headers : {Authorization: `Bearer ` + localStorage.token}}
    axios.get(RootOnline + '/gapok/' +id,config)
    .then((result) => {
      console.log(id)
      this.props.history.push('/admin/review/'+id)
    }).catch((err) => {
      console.log("ini eror :"+err)
    })
  }

  getReviewJam = (event) => {
    let id = event.target.id
    const config = {headers : {Authorization: `Bearer ` + localStorage.token}}
    axios.get(RootOnline + '/summary/' +id,config)
    .then((result) => {
      console.log(id)
      this.props.history.push('/admin/reviewtotal/'+id)
    }).catch((err) => {
      console.log("ini eror :"+err)
    })
  }

  getReviewInsentif = (event) => {
    let id = event.target.id
    const config = {headers : {Authorization: `Bearer ` + localStorage.token}}
    axios.get(RootOnline + '/insentifCutoff/' +id,config)
    .then((result) => {
      console.log(id)
      this.props.history.push('/admin/reviewinsentif/'+id)
    }).catch((err) => {
      console.log("ini eror :"+err)
    })
  }
  
  componentDidMount() {
    this.getLembaga()
    this.getDataCutOff()
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
                  <h3 className="mb-0">Pilih Lembaga 
                      <Badge className="ml-3" color="info">
                        <strong className="mr-2">{Moment(this.state.cutOffActive.start).format('DD MMMM YYYY')}</strong>
                        sampai 
                        <strong className="ml-2">{Moment(this.state.cutOffActive.end).format('DD MMMM YYYY')}</strong>
                      </Badge>
                     <i className="ni ni-check-bold text-green ml-1"></i>
                  </h3>
                </CardHeader>
                <CardBody>
                    {this.state.post.map((post, index) => {
                      return (
                        <Row key={index}>
                          <Col md={3}>
                            <Button block color="primary" className="mt-1" size="md" id={post.id} type="button" onClick={this.getReviewLembaga} >{post.nama_lembaga} </Button>
                            <hr className="my-3" />
                          </Col>
                          <Col md={9} className="mb-3">
                            <Button className="btn-icon btn-2 mt-1" color="secondary" >
                              <span className="btn-inner--icon">
                                1 - Review Gapok <i className="ni ni-check-bold text-green" />
                                {/* <i className="ni ni-fat-remove text-red" /> */}
                              </span>
                            </Button>
                            <Button className="btn-icon btn-2 mt-1" color="secondary" >
                              <span className="btn-inner--icon">
                                2 - Review Jam<i className="ni ni-check-bold text-green" />
                                {/* <i className="ni ni-fat-remove text-red" /> */}
                              </span>
                            </Button>
                            <Button className="btn-icon btn-2 mt-1" color="secondary" >
                              <span className="btn-inner--icon">
                                3 - Review Insentif <i className="ni ni-check-bold text-green" />
                                {/* <i className="ni ni-fat-remove text-red" /> */}
                              </span>
                            </Button>
                            <Button className="btn-icon btn-2 mt-1" color="secondary" type="button">
                              <span className="btn-inner--icon">
                                4 - Review Cicilan 
                                {/* <i className="ni ni-check-bold text-green" /> */}
                                <i className="ni ni-fat-remove text-red" />
                              </span>
                            </Button>
                            <Button className="btn-icon btn-2 mt-1" color="secondary" type="button">
                              <span className="btn-inner--icon">
                                5 - Review Ledger 
                                {/* <i className="ni ni-check-bold text-green" /> */}
                                <i className="ni ni-fat-remove text-red" />
                              </span>
                            </Button>
                            <Button className="btn-icon btn-2 mt-1" color="secondary" type="button">
                              <span className="btn-inner--icon">
                                6 - Kirim Data <i className="ni ni-fat-remove text-red" />
                              </span>
                            </Button>
                            <hr className="my-3" />
                          </Col>
                        </Row>
                      )
                    })}
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Unit;
