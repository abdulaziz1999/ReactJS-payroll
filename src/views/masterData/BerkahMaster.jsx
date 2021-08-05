import React, { Component } from "react";
// reactstrap components
import { Card, CardHeader, Button, Container, Col, Row, CardBody} from "reactstrap";
// core components
import '../examples/css/Style.css';
import API from '../../service';
import Swal from 'sweetalert2'
import TableMasterBerkah from "components/Table/TableMasterBerkah";
import ModalMasterBerkah from "components/Modal/ModalMasterBerkah";

class BerkahMaster extends Component {
  state = {
    post: [],
    formPotongan: {
      id: "",
      potongan: ""
    },
    isUpdate: false,
  }

  getAllPotongan = async() => {
      await API.getAllPotongan().then((res) => {
        this.setState({
          post: res
        })
      })
  }

  postPotongan = async() => {
    await API.postPotongan(this.state.formPotongan).then((res) => {
      this.getAllPotongan()
    }) 
  }

  putPotongan = async() => {
    await API.putPotongan(this.state.formPotongan).then((res) => {
        this.getAllPotongan()
        this.handleFromClear()
      })
  }

  deletePotongan = async(id) => {
    await API.deletePotongan(id).then(() => {
      this.getAllPotongan()
      Swal.fire(
        'Deleted!',
        'Your Potongan '+ id +' been deleted.',
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
        this.deletePotongan(id)
      }
    })
  }

  handleUpdate = (data) => {
    console.log(data)
    this.setState({
      formPotongan: data,
      isUpdate: true,
    })
  }

  handleUbah = (event) => {
    let formPotonganNew = { ...this.state.formPotongan }
    formPotonganNew[event.target.name] = event.target.value
    this.setState(
      {
        formPotongan: formPotonganNew,
      })
  }

  handleSimpan = (modal) => {
    if (this.state.isUpdate) {
      this.putPotongan()
      this.toggleClose(modal)
    } else {
      this.postPotongan()
      this.toggleClose(modal)
    }
  }

  handleFromClear = () => {
    this.setState({
      isUpdate: false,
      formPotongan: {
        potongan: "",
      },
    })
  }

  toggleModal = (state, post,e) => {
      this.setState({
        exampleModal: !this.state[state],
      });
      this.setState({
        formPotongan: post,
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
    this.getAllPotongan()
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
                    <h3 className="mb-0">Data Potongan </h3>
                  </Col>
                  <Col md="6" sm="6" className="text-right">
                  <Button color="success" type="button" size="sm" onClick={() => this.toggleModalAdd("exampleModal")} >
                    <i className="fa fa-plus"></i> Create
                    </Button>
                  </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <TableMasterBerkah data={datapost} modal={this.toggleModal} remove={this.handleRemove}/>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>

        <ModalMasterBerkah 
        data={this.state.formPotongan} 
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
