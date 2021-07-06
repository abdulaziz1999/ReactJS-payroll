import React, { Component } from "react";
// reactstrap components
import { Card, CardHeader, Button, Container, Col, Row, CardBody} from "reactstrap";
// core components
import '../examples/css/Style.css';
import API from '../../service';
import TableInsentif from "components/Table/TableInsentifUnit";
import ModaAddInsentif from "components/Modal/ModalInputInsentif";
import ModalInsentif  from "components/Modal/ModalInsentifActive"

class User extends Component {
  state = {
    post: [],
    formUser: {
      insentif: "",
      nominal: ""
    },
    isUpdate: false,
    insentifAll: [],
    insentifActive: []
  }

  getDataInsentifAll = async() => {
    await API.getAllInsentif().then((res) => {
      this.setState({
        insentifAll: res
      })
    })
  }
  
  postDataInsentif = async() => {
    await API.postDataInsentif(this.state.formUser).then((res) => {
      this.getDataInsentifAll()
    })
  }

  getDataInsentifActive = async() => {
    await API.getInsentifPerCutOff().then((res) => {
      this.setState({
        insentifActive: res
      })
    })
  }

  putDataUser = () => {
    API.putDataUser(this.state.formUser).then((res) => {
        this.getDataUser()
        this.handleFromClear()
      })
  }

  handleRemove = (id) => {
    API.deleteDataInsentifCutoff(id).then((res) => {
      this.getDataInsentifActive()
    })
  }

  handleUpdate = (data) => {
    console.log(data)
    this.setState({
      formUser: data,
      isUpdate: true,
    })
  }

  handleUbah = (event) => {
    let formUserNew = { ...this.state.formUser }
    formUserNew[event.target.name] = event.target.value
    this.setState(
      {
        formUser: formUserNew,
      })
  }

  handleSimpan = (modal) => {
    if (this.state.isUpdate) {
      this.putDataUser()
      this.toggleClose(modal)
    } else {
      this.postDataInsentif()
      this.toggleClose(modal)
    }
  }

  handleFromClear = () => {
    this.setState({
      isUpdate: false,
      formUser: {
        insentif: "",
        nominal: ""
      },
    })
  }

  toggleModal = (state, post,e) => {
      this.setState({
        exampleModal: !this.state[state],
      });
      this.setState({
        formUser: post,
        isUpdate: true,
      })
  }

  toggleModalAdd = (state, e) => {
    this.setState({
      exampleModal: !this.state[state],
    });
    this.handleFromClear()
    this.setState({
      isUpdate: false,
    })
  }

  toggleModalAct = (state, e) => {
    this.setState({
      exampleModal1: !this.state[state],
    });
    this.handleFromClear()
    this.setState({
      isUpdate: false,
    })
  }

  toggleClose = (state) => {
    this.setState({ [state]: !this.state[state]})
  }

  format = (amount) => {
    return Number(amount).toFixed().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  componentDidMount() {
    this.getDataInsentifAll()
    this.getDataInsentifActive()
  }

  render() {
    const dataInsentifAll = this.state.insentifAll 
    const dataInsetifActive = this.state.insentifActive 
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
                    <h3 className="mb-0">Data Insentif</h3>
                  </Col>
                  <Col md="6" sm="6" className="text-right">
                  <Button color="success" type="button" size="sm" onClick={() => this.toggleModalAdd("exampleModal")} >
                    <i className="fa fa-plus"></i> Create
                    </Button>
                  </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <TableInsentif data={dataInsentifAll} insentif={true} modal={this.toggleModal} format={this.format}/>
                </CardBody>
              </Card>
            </div>
          </Row>
          {/* Table */}
          <Row>
            <div className="col mt-5">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row>
                  <Col md="6" sm="6" className="text-left">
                    <h3 className="mb-0">Data Insentif Active</h3>
                  </Col>
                  <Col md="6" sm="6" className="text-right">
                  <Button color="success" type="button" size="sm" onClick={() => this.toggleModalAct("exampleModal1")}>
                    <i className="fa fa-plus"></i> Tambah
                    </Button>
                  </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <TableInsentif data={dataInsetifActive} insentif={false} modal={this.toggleModal} remove={this.handleRemove} format={this.format}/>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>

        <ModaAddInsentif 
        data={this.state.formUser} 
        stateExample={this.state.exampleModal} 
        modalBuka={this.toggleModal} 
        modalTutup={this.toggleClose} 
        updateField={this.handleUbah} 
        save={this.handleSimpan} 
        status={this.state.isUpdate}
        />

        <ModalInsentif 
        data={this.state.formUser} 
        stateModal={this.state.exampleModal1} 
        modalBuka={this.toggleModal} 
        modalTutup={this.toggleClose} 
        updateField={this.handleUbah} 
        save={this.handleSimpan} 
        status={this.state.isUpdate}
        />
      </>
    );
  }
}

export default User;
