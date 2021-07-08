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
import Swal from 'sweetalert2'
import Moment from 'moment'
import { Fragment } from "react";

class Unit extends Component {
  state = {
    post: [],
    cutOffActive: [],
    listMenu: [],
    isUpdate: false,
    idcut:''
  };
 
  getLembaga = async() => {
    await API.getUnit().then((res) =>{
      this.setState({
        post : res
      })
    })
  }

  getDataCutOff = async() => {
    await API.getDataCutOff().then((res) => {
      this.setState({
        cutOffActive: res
      })
    })
    this.getMenu()
  }

  getMenu = async() => {
    let id = this.state.cutOffActive.id
    await API.getMenu(id).then((res) => {
      this.setState({
        listMenu: res
      })
    })
  }

  getReviewLembaga = async(event) => {
    let id = event.target.id
    let data = event.target.name
    Swal.fire(
      'Success!',
      'Review Gapok Lembaga '+data+'.',
      'success'
    )
    await API.getDataGapok(id).then((result) => {
      this.props.history.push('/admin/review/'+id)
    }).catch((err) => {
      console.log("ini eror :"+err)
    })
  }
  
  getLinkMenu = (event,id) => {
    let idc = this.state.cutOffActive.id
    if(event === 'reviewinsentif' || event === 'reviewcicilan' || event === 'reviewledger' ){
      this.props.history.push('/admin/'+event+'/'+id+'/'+idc)
    }else{
      this.props.history.push('/admin/'+event+'/'+id)
    }
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
                    {this.state.listMenu.map((post, index) => {
                      return (
                        <Row key={index}>
                          <Col md={2}>
                            <Button block color="primary" className="mt-1" size="md" id={post.id} name={post.nama_lembaga} type="button" onClick={this.getReviewLembaga} >{post.nama_lembaga} </Button>
                            <hr className="my-3" />
                          </Col>
                          <Col md={10} className="mb-3">
                            {post.menu.map((row,index) => {
                              return (
                                <Fragment key={index}>
                                  {row.log === 1 ?  
                                  <Button className="btn-icon btn-2 mt-1" color="success" onClick={() => this.getLinkMenu(row.link,post.id)}  >
                                    <span className="btn-inner--icon">
                                      {row.menu} 
                                    </span>
                                  </Button>
                                  :
                                  <Button className="btn-icon btn-2 mt-1" color="secondary" onClick={() => this.getLinkMenu(row.link,post.id)} >
                                    <span className="btn-inner--icon">
                                      {row.menu} 
                                    </span>
                                  </Button>}
                                </Fragment>
                              )
                            })}
                          </Col>
                            <hr className="my-3" />
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
