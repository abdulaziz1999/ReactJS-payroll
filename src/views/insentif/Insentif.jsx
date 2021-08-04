import React, { Component } from "react";
// reactstrap components
import { Card, CardHeader, Button, Container, Col, Row, CardBody} from "reactstrap";
// core components
import '../examples/css/Style.css';
import API from '../../service';
import Swal from 'sweetalert2'
import TableInsentif from "components/Table/TableInsentifUnit";
import TableDetail from "components/Table/TableDetailInsentif";
import ModaAddInsentif from "components/Modal/ModalInputInsentif";
// import ModalInsentif  from "components/Modal/ModalInsentifActive"

class Insentif extends Component {
  state = {
    post: [],
    detailKegiatan:[],
    formUser: {
      id: "",
      nama_kegiatan: "",
      jenis: ""
    },
    formDetail:{
      id : "",
      idkegiatan : "",
      nominal : "",
      jabatan : "",
    },
    isUpdate: false,
    namaDetail: "",
    insentifAll: [],
    insentifActive: []
  }

  getUriSegment3 = () => {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[3]
    return id
  }

  getNamaDetail = async(uri) => {
    await API.getDetailKegiatan(uri).then((res) => {
      this.setState({
        namaDetail : res.nama_kegiatan
      })
    })
  }

  getDataInsentifAll = async() => {
    let uri = this.getUriSegment3()
    await API.getAllInsentif().then((res) => {
      this.setState({
        insentifAll: res
      })
      if(uri){
        this.getDetail(uri)
      }
    })
  }
  
  postDataInsentif = async() => {
    await API.postDataInsentif(this.state.formUser).then((res) => {
      this.getDataInsentifAll()
    })
  }

  postDetailInsentif = async() => {
    const data = {
      idkegiatan : document.getElementById("kegiatanId").value,
      nominal : this.state.formDetail.nominal,
      jabatan : this.state.formDetail.jabatan,
    }
    await API.postDetailKegiatan(data).then((res) => {
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

  putDataInsentif = async() => {
    await API.putKegiatan(this.state.formUser).then((res) => {
        this.getDataUser()
        this.handleFromClear()
      })
  }

  putDetailInsentif = async() => {
    let uri = this.getUriSegment3()
    const data = {
      id : this.state.formDetail.id,
      idkegiatan : document.getElementById("kegiatanId").value,
      nominal : this.state.formDetail.nominal,
      jabatan : this.state.formDetail.jabatan,
    }
    await API.putDetailKegiatan(data).then((res) => {
        this.getDetail(uri)
        this.handleFromClear()
      })
  }
   
  getDetail = async(uri) => {
    await API.getDetailKegiatan(uri).then((res) => {
      this.setState({
        detailKegiatan : res.detail
      })
    })
  }

  viewDetail = (id) => {
    this.props.history.push('/admin/insentif/'+id)
    this.getDetail(id)
    this.getNamaDetail(id)
  }

  handleRemove = (id) => {
    let uri = this.getUriSegment3()
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
        !uri ?
         API.deleteKegiatan(id).then(() => {
          this.getDataInsentifAll()
          Swal.fire(
            'Deleted!',
            'Data Insentif '+ id +' been deleted.',
            'success'
          )
        })
        :
        API.deleteDetailKegiatan(id).then(() => {
          this.getDetail(uri)
          Swal.fire(
            'Deleted!',
            'Data Insentif '+ id +' been deleted.',
            'success'
          )
        })
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
    let uri = this.getUriSegment3()
    if(!uri){
      let formUserNew = { ...this.state.formUser }
      formUserNew[event.target.name] = event.target.value
      this.setState({formUser: formUserNew})
    }else{
      let formDetailNew = { ...this.state.formDetail }
      formDetailNew[event.target.name] = event.target.value
      this.setState({formDetail: formDetailNew})
    }
  }

  handleSimpan = (modal) => {
    let uri = this.getUriSegment3()
    if(!uri){
      if (this.state.isUpdate) {
        this.putDataInsentif()
        this.toggleClose(modal)
      } else {
        this.postDataInsentif()
        this.toggleClose(modal)
      }
    }else{
      if (this.state.isUpdate) {
        this.putDetailInsentif()
        this.toggleClose(modal)
      } else {
        this.postDetailInsentif()
        this.toggleClose(modal)
      }
    }
  }

  handleFromClear = () => {
    let uri = this.getUriSegment3()
    if(!uri){
    this.setState({
      isUpdate: false,
      formUser: {
        insentif: "",
        nominal: ""
      }
    })
    }else{
      this.setState({
        isUpdate: false,
        formDetail: {
          nominal : "",
          jabatan : "",
        }
      })
    }
  }

  toggleModal = (state, post,e) => {
      let uri = this.getUriSegment3()
      this.setState({
        exampleModal: !this.state[state],
      });
      if(!uri){
        this.setState({
          formUser: post,
          isUpdate: true,
        })
      }else{
        this.setState({
          formDetail: post,
          isUpdate: true,
        })
      }
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
    let uri = this.getUriSegment3()
    if(uri){
      this.getDetail(uri)
      this.getNamaDetail(uri)
    }
    this.getDataInsentifAll()
    this.getDataInsentifActive()
  }

  render() {
    const dataInsentifAll = this.state.insentifAll 
    const dataDetail = this.state.detailKegiatan
    const uri = this.getUriSegment3()
    // const dataInsetifActive = this.state.insentifActive 
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
                    <h3 className="mb-0"><strong>{!uri ? 'Data Insentif' : 'Detail Insentif '+this.state.namaDetail}</strong></h3>
                  </Col>
                  <Col md="6" sm="6" className="text-right">
                    <input type="hidden" id="uri" value="" />
                  <Button color="success" type="button" size="sm" onClick={() => this.toggleModalAdd("exampleModal")} >
                    <i className="fa fa-plus"></i> Create
                    </Button>
                  </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {!uri ? 
                    <TableInsentif 
                    data={dataInsentifAll} 
                    viewdetail={this.viewDetail} 
                    remove={this.handleRemove}
                    insentif={false} 
                    modal={this.toggleModal} 
                    />
                    :
                    <TableDetail
                    data={dataDetail} 
                    remove={this.handleRemove}
                    insentif={false} 
                    modal={this.toggleModal} 
                    format={this.format}
                    />
                  }

                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>

        {!uri ?
        <ModaAddInsentif 
        data={this.state.formUser} 
        stateExample={this.state.exampleModal} 
        modalBuka={this.toggleModal} 
        modalTutup={this.toggleClose} 
        updateField={this.handleUbah} 
        save={this.handleSimpan} 
        status={this.state.isUpdate}
        uri={this.getUriSegment3()}
        />
        :
        <ModaAddInsentif 
        data2={this.state.formDetail} 
        stateExample={this.state.exampleModal} 
        modalBuka={this.toggleModal} 
        modalTutup={this.toggleClose} 
        updateField={this.handleUbah} 
        save={this.handleSimpan} 
        status={this.state.isUpdate}
        uri={this.getUriSegment3()}
        />
        }

      
      </>
    );
  }
}

export default Insentif;
