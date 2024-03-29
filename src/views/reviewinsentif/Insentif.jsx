import React, { Component } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  Button,
  Container,
  Col,
  Row,
  CardBody,
  Badge
} from "reactstrap";
// core components
import '../examples/css/Style.css';
import TableComp from "components/Table/TableInsentif";
import API from '../../service';
import Swal from 'sweetalert2'
import ModalInsentif from "../../components/Modal/ModalInsentif";
import Moment from 'moment'
import {removeUserSession} from '../../Utils/Common';

class Insentif extends Component {
  state = {
    post: [],
    insentif: [],
    insentifAll:[],
    kegiatanId:[],
    namaLembaga: "",
    isUpdate: false,
    searchTerm: "",
    idinsentif: [],
    cutOffActive: [],
    postInsentif: {
      idguru: "",
      idinsentif: "",
      nominal: ""
    }
  };

  getUriSegment3 = () => {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[3]
    return id
  }

  getUriSegment4 = () => {
    let URL= this.props.location.pathname
    let arr= URL.split('/')
    let id = arr[4]
    return id
  }

  getClearChache = async() => {
    await API.hapusChache().then((res) => {
    })
  }

  getDataCutOff = async() => {
    await API.getDataCutOff().then((res) => {
      this.setState({
        cutOffActive: res
      })
    }).catch((res) => {
      if(res.response.status === 401){
        removeUserSession()
        this.props.history.push('/auth/login');
      }
    })
  }

  getNamaLembaga = async(uri=false) => {
    let id = this.getUriSegment3() 
    if(uri){
      await API.getUnitById(uri).then((result) => {
        this.setState({
          namaLembaga : result[0]['nama_lembaga']
        })
      }).catch((err) => {
        console.log("ini eror : "+err)
      })
    }else{
      await API.getUnitById(id).then((result) => {
        this.setState({
          namaLembaga : result[0]['nama_lembaga']
        })
      }).catch((err) => {
        console.log("ini eror : "+err)
      })
    }
  }

  getDataInsentif = async(uri=false) => {
    let id = this.getUriSegment3()
    if(uri){
      await API.getDataInsentifCutoff(uri).then((res) => {
        this.setState({
          post: res
        })
      }).catch((err) => {
          console.log("ini eror : "+err)
      })
    }else{
      await API.getDataInsentifCutoff(id).then((res) => {
        this.setState({
          post: res
        })
      }).catch((err) => {
          console.log("ini eror : "+err)
      })
    }
  }

  getInsentif = async() => {
    await API.getAllInsentif().then((res) => {
        this.setState({
          insentif: res
        })
      }).catch((err) => {
          console.log("ini eror : "+err)
      })
  } 


  handleSimpan = async(modal) => {
    let data  = document.getElementById("nominal").value
    let arr   = data.split('_')
    let id_insentif = arr[0]
    let nom = arr[1]
    
    let postInsentif = {
      idguru: document.getElementById("idguru").value,
      idinsentif: id_insentif,
      nominal: nom,
      frekuensi : document.getElementById("frekuensi").value
    }
    await API.postInsentifPegawai(postInsentif).then((result) => {
        this.toggleClose(modal);
        this.getDataInsentif()
      }).catch((err) => {
          console.log("ini eror :"+err)
      })
  }

  getAddInsentifPerCutOff = () => {
    API.postDataInsentifCutoff(this.state.idinsentif).then((res) => {
      console.log(res)
    })
  }

  handleDelete = async(postInsentif) => {
    await API.postInsentifPegawai(postInsentif).then((result) => {
        this.getDataInsentif()
        Swal.fire(
          'Deleted!',
          'Your Data Insentif been deleted.',
          'success'
        )
      }).catch((err) => {
          console.log("ini eror :"+err)
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
      this.handleDelete(id)
    }
  })
}


  getSimpan = async() => {
    let id  = this.getUriSegment3()
    let data = {
      idmenu: 3,
      idcutoff: this.state.cutOffActive.id,
      idlembaga: id
    }
    await API.postLogMenu(data).then((res) => {
    }).catch((err) => {
      console.log("ini eror : "+err)
    })
    Swal.fire(
      'Success!',
      'Data Insetif <br> Berhasil Disimpan.',
      'success'
  )
    this.props.history.push('/admin/rev_cicilan/'+id)
  }

  format = (amount) => {
    return Number(amount).toFixed().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  getKegiatanId = async(event) => {
    let id = event.target.value;
    await API.getKegiatanId(id).then((result) => {
      this.setState({
          kegiatanId: result.detail
        });
    }).catch((err) => {
      console.log("ini eror :"+err)
    })
  }

  handleUbah = (event) => {
    let formInsentif = { ...this.state.postInsentif };
    if(event.target.name === 'idinsentif'){
      this.getKegiatanId(event)
    }
    formInsentif[event.target.name] = event.target.value;
    this.setState(
      {
        postInsentif: formInsentif,
      }
    )
    console.log(this.state.postInsentif)
  }

  toggleModal = (state, post,e) => {
    this.setState({
      exampleModal: !this.state[state],
    });
    
      this.setState({
        formPegawai: post,
        isUpdate: true,
      },
      (err) => {
        console.log('error : ', err)
    });
  
  };

  toggleClose = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  handleLocalStorage = () => {
    let idl = localStorage.idl
    let role = JSON.parse(localStorage.user).role
    this.props.history.push('/'+role+'/rev_insentif/'+idl) 
    this.getNamaLembaga(idl)
    this.getDataCutOff()
    this.getClearChache()
    this.getInsentif()
    this.getDataInsentif(idl)
  }

  setLocalStorage = () => {
    let id = this.getUriSegment3()
    localStorage.setItem('idl', id)
  }

  componentDidMount() {
    let id = this.getUriSegment3()
    if(!id){
      this.handleLocalStorage()
    }else{
      this.getDataCutOff()
      this.getNamaLembaga()
      this.getInsentif()
      this.getDataInsentif()
      this.getClearChache()
    }
  }

  render() {
    const awal = Moment(this.state.cutOffActive.start).format('DD MMMM YYYY')
    const akhir = Moment(this.state.cutOffActive.end).format('DD MMMM YYYY')
    const role  = JSON.parse(localStorage.user).role
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
                      <h3 className="mb-0">Data Insentif Pegawai Lembaga - {this.state.namaLembaga} 
                      <Badge className="ml-3" color="info">
                        <strong className="mr-2">{awal}</strong>
                        sampai 
                        <strong className="ml-2">{akhir}</strong>
                      </Badge>
                      {role === 'keuangan' ? 
                      <Badge className="ml-3" color="success">
                          Read Only
                      </Badge>
                      :''}
                      </h3>
                    </Col>
                    <Col md="6" sm="6" className="text-right">
                    {role === 'admin' ?
                      <Button color="success" type="button" size="sm" onClick={() => this.toggleModal("exampleModal") }>
                        <i className="fa fa-plus"></i> Insentif
                      </Button>
                    : ''}
                      {/* <Button color="success" type="button" size="sm" onClick={this.getAddInsentifPerCutOff}>
                        <i className="fa fa-plus"></i> Add Insentif
                      </Button> */}
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 <TableComp data={this.state.post} insentif={this.state.insentif} format={this.format} remove={this.handleRemove}/>
                </CardBody>
                <Col className="modal-footer">
                  {role === 'admin' ? <Button color="success" className="mt-3" size="md" type="button" onClick={this.getSimpan}>Simpan & Lanjutkan</Button> : ''}
                </Col>
              </Card>
            </div>
          </Row>
        </Container>

        <ModalInsentif 
        stateExample={this.state.exampleModal}
        modalBuka={this.toggleModal}
        modalTutup={this.toggleClose}
        save={this.handleSimpan}
        uri={this.getUriSegment3()}
        dataInsentif={this.getDataInsentif}
        ubah={this.handleUbah}
        kegiatanId={this.state.kegiatanId}
        />        
      </>
    );
  }
}

export default Insentif;
