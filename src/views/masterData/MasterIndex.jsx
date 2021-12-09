import React, { Component } from "react";
// reactstrap components
import { Card, CardHeader, Button, Container, Col, Row, CardBody} from "reactstrap"
// core components
import '../examples/css/Style.css'
import API from '../../service'
import Swal from 'sweetalert2'
import TableMasterIndex from "components/Table/TableMasterIndex"
import ModalMasterIndex from "components/Modal/ModalMasterIndex"

class MasterIndex extends Component {
  state = {
    post: [],
    formIndex: {
      id: "",
      type: "",
      nominal: "",
      idstatus: "",
      golongan: ""
    },
    isUpdate: false,
  }

  getMasterIndex = async() => {
      await API.getMasterIndex().then((res) => {
        this.setState({
          post: res
        })
      })
  }

  putMasterIndex = async() => {
    let id = this.state.formIndex.id
    let data = this.state.formIndex
    await API.putMasterIndex(id,data).then((res) => {
        this.getMasterIndex()
        this.handleFromClear()
      })
  }

  deleteMasterIndex = async(id) => {
    await API.delMasterIndex(id).then(() => {
      this.getMasterIndex()
      Swal.fire(
        'Deleted!',
        'Your Jam Wajib '+ id +' been deleted.',
        'success'
      )
    })
  }

  postMasterIndex = async() => {
    await API.postMasterIndex(this.state.formIndex).then((res) => {
      this.getMasterIndex()
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
        this.deleteMasterIndex(id)
      }
    })
  }

  handleUpdate = (data) => {
    console.log(data)
    this.setState({
      formIndex: data,
      isUpdate: true,
    })
  }

  handleUbah = (event) => {
    let formIndexNew = { ...this.state.formIndex }
    formIndexNew[event.target.name] = event.target.value
    this.setState(
      {
        formIndex: formIndexNew,
      })
  }

  handleSimpan = (modal) => {
    if (this.state.isUpdate) {
      this.putMasterIndex()
      this.toggleClose(modal)
    } else {
      this.postMasterIndex()
      this.toggleClose(modal)
    }
  }

  handleFromClear = () => {
    this.setState({
      isUpdate: false,
      formIndex: {
        type: "",
        nominal: "",
        idstatus: "",
        golongan: ""
      },
    })
  }

  toggleModal = (state, post,e) => {
      this.setState({
        exampleModal: !this.state[state],
      });
      this.setState({
        formIndex: post,
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
    this.getMasterIndex()
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
                    <h3 className="mb-0">Data Index</h3>
                  </Col>
                  <Col md="6" sm="6" className="text-right">
                  <Button color="success" type="button" size="sm" onClick={() => this.toggleModalAdd("exampleModal")} >
                    <i className="fa fa-plus"></i> Create
                    </Button>
                  </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <TableMasterIndex data={datapost} modal={this.toggleModal} remove={this.handleRemove} nmlembaga={this.getNamaLembaga}/>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>

        <ModalMasterIndex 
        data={this.state.formIndex} 
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

export default MasterIndex;
