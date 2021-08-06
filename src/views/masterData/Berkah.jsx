import React, { Component } from "react"
import { 
    Card, 
    CardHeader, 
    Container, 
    Row, 
    Col, 
    CardBody, 
    Nav,NavItem ,
    NavLink,
    TabContent,
    TabPane , 
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button, 
} from "reactstrap"
import '../examples/css/Style.css'
import API from '../../service';
// import Swal from 'sweetalert2'
import classnames from "classnames";
// import Moment from 'moment'
import TableBerkah from "components/Table/TableBerkah";
import ModalBerkah from "components/Modal/ModalBerkah";

class KirimData extends Component {
  state = {
    post: [],
    data: [],
    lembaga: [],
    tabs:1,
    dataDate : {
        startDate : "",
        endDatae : "",
        lembaga : ""
    },
    formPotongan : {
      idguru : "",
      nominal : "",
      tanggal : ""
    },
    jenis : "",
    firstJenis : [],
    value : "",
    isUpdate: false,
    s : "",
    e : "",
    l : ""
  };

  toggleNavs = (e, state, index, jenisp) => {
    e.preventDefault()
    this.setState({
      [state]: index,
      jenis : jenisp,
      data : [],
      dataDate : {
        startDate : "",
        endDatae : "",
        lembaga : ""
      },
      s : "",
      e : "",
      l : ""
    })
    localStorage.setItem('tabs', index)
    localStorage.setItem('idp', jenisp)
  }

  getLembaga = async() => {
    await API.getUnit().then((res) =>{
      this.setState({
        lembaga : res
      })
    })
  }

  getIdFirst = async() => {
    await API.getAllPotongan().then((res) => {
        this.setState({
            firstJenis : res[0]['id']
        })
    })
    localStorage.setItem('idp', this.state.firstJenis)
  }

  getallPotongan = async() => {
      await API.getAllPotongan().then((res) => {
          this.setState({
              post : res
          })
      })
  }

  handleUpdate = (event) => {
    let formDateNew = { ...this.state.dataDate }
    formDateNew[event.target.name] = event.target.value
    this.setState(
      {dataDate : formDateNew}
     )
  }

  tampilkan = async() => {
    if(!localStorage.startD){
      this.setLocalStorage()
    }
    let jenis       = localStorage.idp
    let idlembaga   = !this.state.dataDate.lembaga ? localStorage.lmg : this.state.dataDate.lembaga
    let startDate   = !this.state.dataDate.startDate ? localStorage.startD : this.state.dataDate.startDate
    let endDate     = !this.state.dataDate.endDate ? localStorage.endD : this.state.dataDate.endDate
    await API.getPotonganRangeTgl(jenis,idlembaga,startDate,endDate).then((res) => {
        this.setState({
            data : res
        })
    })
  }

  tampilkanHistory = async() => {
    let jenis       = localStorage.idp
    let idlembaga   = localStorage.lmg
    let startDate   = localStorage.startD
    let endDate     = localStorage.endD
    let tabsActive  = parseInt(localStorage.tabs)
    this.setState({
      s : localStorage.startD,
      e : localStorage.endD,
      l : localStorage.lmg
    })
    await API.getPotonganRangeTgl(jenis,idlembaga,startDate,endDate).then((res) => {
        this.setState({
            data : res,
            tabs : tabsActive,
        })
    })
  }

  postPotonganPegawai = async() => {
    let id   = localStorage.idp
    await API.postPotonganPegawai(id,this.state.formPotongan).then((res) => {
       this.tampilkanHistory()
    })
  }

  handleUpdateP = (data) => {
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
      this.toggleClose(modal)
    } else {
      this.postPotonganPegawai()
      this.toggleClose(modal)
    }
  }

  handleFromClear = () => {
    this.setState({
      isUpdate: false,
      formPotongan: {
        idguru: "",
        nominal: "",
        tanggal: ""
      },
    })
  }

  setLocalStorage = () => {
    localStorage.setItem('lmg', this.state.dataDate.lembaga)
    localStorage.setItem('startD', this.state.dataDate.startDate)
    localStorage.setItem('endD', this.state.dataDate.endDate)
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

  format = (amount) => {
    return Number(amount).toFixed().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  componentDidMount() { 
    if(!localStorage.idp){
      this.getIdFirst()
    }
    if(localStorage.startD){
      this.tampilkanHistory()
    }
    this.getallPotongan()
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
                  <Row>
                    <Col md="12" sm="6" className="text-left">
                      <h3 className="mb-0">Potongan Berkah</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                 {/* <TableLedger data={datapost} format={this.format} /> */}
                <div className="nav-wrapper mt--5">
                <Nav
                    className="nav-fill flex-column flex-md-row"
                    id="tabs-icons-text"
                    pills
                    role="tablist"
                    >
                    {this.state.post.map((row,index) => {
                        return (
                        <NavItem key={index}>
                            <NavLink 
                                aria-selected={this.state.tabs === index+1}
                                className={classnames("mb-sm-3 mb-md-0", {
                                active: this.state.tabs === index+1
                                })}
                                onClick={e => this.toggleNavs(e, "tabs", index+1, row.id)}
                                href="#pablo"
                                role="tab"
                                >
                                <i className="ni ni-credit-card mr-2" />
                                {row.potongan}
                            </NavLink>
                        </NavItem>
                        )
                    })}
                </Nav>
                </div>
              <Card className="shadow">
                <CardBody>
                  <TabContent activeTab={"tabs" + this.state.tabs}>
                  {this.state.post.map((row,index) => {
                      let no = index+1
                      return (
                          <TabPane tabId={"tabs"+no} key={index}>
                              <h1 className="text-center mb-3"><u>{row.potongan}</u></h1>
                              <FormGroup>
                                  <Row>
                                      <Col md="3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-calendar-grid-58" />
                                            </InputGroupText>
                                            </InputGroupAddon>
                                            <Input className="form-control-alternative" name="startDate" onChange={this.handleUpdate} placeholder="Tgl" type="date" value={!this.state.dataDate.startDate ? this.state.s : this.state.dataDate.startDate} />
                                        </InputGroup>
                                      </Col>
                                      <Col md="3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-calendar-grid-58" />
                                            </InputGroupText>
                                            </InputGroupAddon>
                                            <Input className="form-control-alternative" name="endDate" onChange={this.handleUpdate} placeholder="Tgl" type="date" value={!this.state.dataDate.endDate ? this.state.e : this.state.dataDate.endDate}/>
                                        </InputGroup>
                                      </Col>
                                      <Col md="3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-building" />
                                            </InputGroupText>
                                            </InputGroupAddon>
                                            <Input className="form-control-alternative" name="lembaga" onChange={this.handleUpdate} value={!this.state.dataDate.lembaga ? this.state.l : this.state.dataDate.lembaga} type="select" >
                                                <option> --- Pilih Lembaga --- </option>
                                                {this.state.lembaga.map((prop, index,) => {
                                                  return (
                                                    <option key={index} value={prop.id} > {prop.nama_lembaga} </option>
                                                  )
                                                })}
                                            </Input>
                                        </InputGroup>
                                      </Col>
                                      <Col md="3" className="mt--3">
                                          <Button color="success" className="mt-3" size="md" type="button" onClick={this.tampilkan} >Tampilkan</Button>
                                      </Col>
                                  </Row>
                              </FormGroup>
                              {this.state.data.length > 0 ? 
                              <Button className="mb-2" color="success" type="button" size="md" onClick={() => this.toggleModalAdd("exampleModal")} >
                                <i className="fa fa-plus"></i> Create
                              </Button>
                              : ""}

                              <TableBerkah 
                              data={this.state.data}
                              format={this.format}
                              modal={this.toggleModal} 
                              remove={this.handleRemove}
                              stateExample={this.state.exampleModal} 
                              modalBuka={this.toggleModal} 
                              modalTutup={this.toggleClose} 
                              updateField={this.handleUbah} 
                              save={this.handleSimpan} 
                              status={this.state.isUpdate}
                              />
                          </TabPane>
                      )
                  })}
                  </TabContent>
                </CardBody>
              </Card>
      
              </CardBody>
                {/* <Col className="modal-footer">
                  {role === 'admin' ? <Button color="success" className="mt-3" size="md" type="button" onClick={this.simpanLedger}>Simpan</Button> :''}
                </Col> */}
              </Card>
            </div>
          </Row>
        </Container>

        <ModalBerkah
        data={this.state.formPotongan} 
        idlmg={this.state.dataDate.lembaga}
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

export default KirimData;
