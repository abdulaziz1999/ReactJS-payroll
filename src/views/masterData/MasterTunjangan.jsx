import React, { Component } from "react";
// reactstrap components
import { Card, CardHeader, Button, Container, Col, Row, CardBody} from "reactstrap";
// core components
import '../examples/css/Style.css';
import API from '../../service';
import Swal from 'sweetalert2'
import TableMasterTunjangan from "components/Table/TableMasterTunjangan";
import ModalMasterTunjangan from "components/Modal/ModalMasterTunjangan";

class BerkahMaster extends Component {
  state = {
    post: [],
    formTunjangan: {
      id: "",
      tunjangan: "",
      nominal: "",
      type: ""
    },
    isUpdate: false,
  }

  getAllTunjangan = async() => {
      await API.getTunjangan().then((res) => {
        this.setState({
          post: res
        })
      })
  }

  postTunjangan = async() => {
    await API.postTunjangan(this.state.formTunjangan).then((res) => {
      this.getAllTunjangan()
    }) 
  }

  putTunjangan = async() => {
    await API.putTunjangan(this.state.formTunjangan).then((res) => {
        this.getAllTunjangan()
        this.handleFromClear()
      })
  }

  deleteTunjangan = async(id) => {
    await API.deleteTunjangan(id).then(() => {
      this.getAllTunjangan()
      Swal.fire(
        'Deleted!',
        'Your Tunjangan '+ id +' been deleted.',
        'success'
      )
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
        this.deleteTunjangan(id)
      }
    })
  }

  handleUpdate = (data) => {
    console.log(data)
    this.setState({
      formTunjangan: data,
      isUpdate: true,
    })
  }

  handleUbah = (event) => {
    let formTunjanganNew = { ...this.state.formTunjangan }
    formTunjanganNew[event.target.name] = event.target.value
    this.setState(
      {
        formTunjangan: formTunjanganNew,
      })
  }

  handleSimpan = (modal) => {
    if (this.state.isUpdate) {
      this.putTunjangan()
      this.toggleClose(modal)
    } else {
      this.postTunjangan()
      this.toggleClose(modal)
    }
  }

  handleFromClear = () => {
    this.setState({
      isUpdate: false,
      formTunjangan: {
        tunjangan: "",
        nominal: "",
        type: ""
      },
    })
  }

  toggleModal = (state, post,e) => {
      this.setState({
        exampleModal: !this.state[state],
      });
      this.setState({
        formTunjangan: post,
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
    this.getAllTunjangan()
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
                    <h3 className="mb-0">Data Tunjangan </h3>
                  </Col>
                  <Col md="6" sm="6" className="text-right">
                  <Button color="success" type="button" size="sm" onClick={() => this.toggleModalAdd("exampleModal")} >
                    <i className="fa fa-plus"></i> Create
                    </Button>
                  </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <TableMasterTunjangan data={datapost} modal={this.toggleModal} remove={this.handleRemove}/>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>

        <ModalMasterTunjangan 
        data={this.state.formTunjangan} 
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

export default BerkahMaster;
