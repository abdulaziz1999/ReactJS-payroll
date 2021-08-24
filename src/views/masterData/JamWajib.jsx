import React, { Component } from "react";
// reactstrap components
import { Card, CardHeader, Button, Container, Col, Row, CardBody} from "reactstrap"
// core components
import '../examples/css/Style.css'
import API from '../../service'
import Swal from 'sweetalert2'
import TableJamWajib from "components/Table/TableJamWajib"
import ModalJamWajib from "components/Modal/ModalJamWajib"

class JamWajib extends Component {
  state = {
    post: [],
    formJam: {
      id: "",
      idlembaga: "",
      idstatus: "",
      jamwajib: "",
      jammax: ""
    },
    isUpdate: false,
  }

  getJamWajib = async() => {
      await API.getJamWajib().then((res) => {
        this.setState({
          post: res
        })
      })
  }

  putJamWajib = async() => {
    await API.putJamWajib(this.state.formJam.id,this.state.formJam).then((res) => {
        this.getJamWajib()
        this.handleFromClear()
      })
  }

  deleteJamWajib = async(id) => {
    await API.delJamWajib(id).then(() => {
      this.getJamWajib()
      Swal.fire(
        'Deleted!',
        'Your Jam Wajib '+ id +' been deleted.',
        'success'
      )
    })
  }

  postJamWajib = async() => {
    await API.postJamWajib(this.state.formJam).then((res) => {
      this.getJamWajib()
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
        this.deleteJamWajib(id)
      }
    })
  }

  handleUpdate = (data) => {
    console.log(data)
    this.setState({
      formJam: data,
      isUpdate: true,
    })
  }

  handleUbah = (event) => {
    let formJamNew = { ...this.state.formJam }
    formJamNew[event.target.name] = event.target.value
    this.setState(
      {
        formJam: formJamNew,
      })
  }

  handleSimpan = (modal) => {
    if (this.state.isUpdate) {
      this.putJamWajib()
      this.toggleClose(modal)
    } else {
      this.postJamWajib()
      this.toggleClose(modal)
    }
  }

  handleFromClear = () => {
    this.setState({
      isUpdate: false,
      formJam: {
        idlembaga: "",
        idstatus: "",
        jamwajib: "",
        jammax: ""
      },
    })
  }

  toggleModal = (state, post,e) => {
      this.setState({
        exampleModal: !this.state[state],
      });
      this.setState({
        formJam: post,
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
  }

  componentDidMount() {
    this.getJamWajib()
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
                    <h3 className="mb-0">Data Jam Wajib</h3>
                  </Col>
                  <Col md="6" sm="6" className="text-right">
                  <Button color="success" type="button" size="sm" onClick={() => this.toggleModalAdd("exampleModal")} >
                    <i className="fa fa-plus"></i> Create
                    </Button>
                  </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <TableJamWajib data={datapost} modal={this.toggleModal} remove={this.handleRemove} nmlembaga={this.getNamaLembaga}/>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>

        <ModalJamWajib 
        data={this.state.formJam} 
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

export default JamWajib;
