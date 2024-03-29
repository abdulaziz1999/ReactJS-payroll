import React, { Component } from "react";
// reactstrap components
import { Card, CardHeader, Button, Container, Col, Row, CardBody} from "reactstrap";
// core components
import '../examples/css/Style.css';
import API from '../../service';
import Swal from 'sweetalert2'
import TableUser from "components/Table/TableUser";
import ModalUser from "components/Modal/ModalUser";

class User extends Component {
  state = {
    post: [],
    formUser: {
      id: "",
      name: "",
      role: "",
      email: "",
      password: "",
      idlembaga: ""
    },
    isUpdate: false,
  }

  getDataUser = async() => {
      await API.getDataUser().then((res) => {
        this.setState({
          post: res
        })
      })
  }

  putDataUser = async() => {
    await API.putDataUser(this.state.formUser).then((res) => {
        this.getDataUser()
        this.handleFromClear()
      })
  }

  deleteDataUser = async(id) => {
    await API.deleteUser(id).then(() => {
      this.getDataUser()
      Swal.fire(
        'Deleted!',
        'Your User '+ id +' been deleted.',
        'success'
      )
    })
  }

  postDataUser = async() => {
    await API.postDataUser(this.state.formUser).then((res) => {
      this.getDataUser()
    }) 
  }

  handleRemove = (id) => {
      Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteDataUser(id)
      }
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
      this.postDataUser()
      this.toggleClose(modal)
    }
  }

  handleFromClear = () => {
    this.setState({
      isUpdate: false,
      formUser: {
        name: "",
        role: "",
        email: "",
        password: ""
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
      },(err) => {
        console.log('error : ', err)
    })
  }

  toggleModalAdd = (state, e) => {
    this.setState({
      exampleModal: !this.state[state],
    });
    this.handleFromClear()
    this.setState({
      isUpdate: false,
    },(err) => {
      console.log('error : ', err)
    })
  }

  toggleClose = (state) => {
    this.setState({ [state]: !this.state[state]})
  }

  format = amount => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  componentDidMount() {
    this.getDataUser()
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
                    <h3 className="mb-0">Data User </h3>
                  </Col>
                  <Col md="6" sm="6" className="text-right">
                  <Button color="success" type="button" size="sm" onClick={() => this.toggleModalAdd("exampleModal")} >
                    <i className="fa fa-plus"></i> Create
                    </Button>
                  </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <TableUser data={datapost} modal={this.toggleModal} remove={this.handleRemove}/>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>

        <ModalUser 
        data={this.state.formUser} 
        stateExample={this.state.exampleModal} 
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
