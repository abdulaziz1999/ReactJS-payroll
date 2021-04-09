import React, { Component } from "react"
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  CardBody,
  Button,
  Col
} from "reactstrap";
// core components
import '../examples/css/Style.css'
// import Swal from 'sweetalert2'
import axios from "axios"
import { RootOnline } from "service/Config"

class Unit extends Component {
  state = {
    post: [],
    isUpdate: false,
  };
 
  getLembaga = async() => {
    delete axios.defaults.headers.common["Authorization"]
    const res = await axios.get('https://kepegawaian.dqakses.id/api/lembaga')
      this.setState({
        post : res.data
      })
  };

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

  
  componentDidMount() {
    this.getLembaga()
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
                    {this.state.post.map((post, index) => {
                      return (
                        <Row key={index}>
                          <Col md={8}>
                            <Button block color="primary" size="md" id={post.id} type="button" onClick={this.getReviewLembaga} >{post.nama_lembaga} </Button>
                          </Col>
                          <Col md={4} className="mb-3">
                            <Button className="btn-icon btn-2" color="secondary" type="button">
                              <span className="btn-inner--icon">
                                <i className="ni ni-check-bold text-green" />
                                {/* <i className="ni ni-fat-remove text-red" /> */}
                              </span>
                            </Button>
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
