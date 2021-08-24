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
} from "reactstrap"
import '../examples/css/Style.css'
import API from '../../service';
// import Swal from 'sweetalert2'
import classnames from "classnames";
import TableBerkah from "components/Table/TableBerkah";
import ModalBerkah from "components/Modal/ModalBerkah";

class BerkahInput extends Component {
  state = {
    post: [],
    data: [],
    lembaga: [],
    cutOffActive : [],
    tabs:1,
    formPotongan : {
      idguru : "",
      nominal : "",
      tanggal : ""
    },
    jenis : "",
    firstJenis : [],
    value : "",
    dataPeg : [],
    isUpdate: false,
  };

  toggleNavs = (e, state, index, jenisp) => {
    e.preventDefault()
    this.setState({
      [state]: index,
      jenis : jenisp,
      data :[]
    })
    localStorage.setItem('tabs', index)
    localStorage.setItem('idp', jenisp)
    this.tampilkanHistory()
  }

  getLembaga = async() => {
    await API.getUnit().then((res) =>{
      this.setState({
        lembaga : res
      })
    })
  }

  getDataCutOff = async() => {
    await API.getDataCutOff().then((res) => {
      this.setState({
        cutOffActive: res
      })
    })
  }

  getIdFirst = async() => {
    await API.getAllPotongan().then((res) => {
        this.setState({
            firstJenis : res[0]['id']
        })
    })
    localStorage.setItem('tabs', 1)
    localStorage.setItem('idp', this.state.firstJenis)
    this.tampilkanHistory()
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
    this.setState({dataDate : formDateNew})
  }

  tampilkanHistory = async() => {
    let jenis       = localStorage.idp
    let startDate   = this.state.cutOffActive.start
    let endDate     = this.state.cutOffActive.end
    let tabsActive  = parseInt(localStorage.tabs)
    await API.getPotonganAllLembaga(jenis,startDate,endDate).then((res) => {
        this.setState({
            data : res,
            tabs : tabsActive,
        })
    })
  }

  postPotonganPegawai = async() => {
    let id   = localStorage.idp
    let data = {
      idguru : document.getElementById("guruId").value,
      nominal : document.getElementById("nominalId").value,
      tanggal : document.getElementById("tanggalId").value
    }
    await API.postPotonganPegawai(id,data).then((res) => {
       this.tampilkanHistory()
    })
  }

  handleUpdateP = (data) => {
    this.setState({
      formPotongan: data,
      isUpdate: true,
    })
  }

  handleUbah = (event) => {
    let formPotonganNew = { ...this.state.formPotongan }
    formPotonganNew[event.target.name] = event.target.value
    this.setState({formPotongan: formPotonganNew,})
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
    localStorage.setItem('startD', this.state.cutOffActive.start)
    localStorage.setItem('endD', this.state.cutOffActive.end)
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

  toggleModalAdd = (state,row, e) => {
    this.setState({
      exampleModal: !this.state[state],
    });
    this.setState({
      dataPeg : row
    })
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
    if(localStorage.idp){
      this.tampilkanHistory()
    }
    this.getDataCutOff()
    this.getallPotongan()
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
                  {this.state.post.length > 0 ? this.state.post.map((row,index) => {
                      let no = index+1
                      return (
                          <TabPane tabId={"tabs"+no} key={index}>
                              <h1 className="text-center mb-3"><u>{row.potongan}</u></h1>
                              {/* {this.state.data.length > 0 ?
                              <Button className="mb-2" color="success" type="button" size="sm" onClick={() => this.toggleModalAdd("exampleModal")} >
                                <i className="fa fa-plus"></i> Tambah
                              </Button> :""} */}
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
                              modalAdd={this.toggleModalAdd}
                              />
                          </TabPane>
                      )
                  }) :
                    <div className="text-center">
                      <img alt="loading ..." width="200" height="120" src={require("assets/img/brand/loading.gif").default}/>
                    </div>
                  }
                  </TabContent>
                </CardBody>
              </Card>
              </CardBody>
              </Card>
            </div>
          </Row>
        </Container>

        <ModalBerkah
        data={this.state.formPotongan} 
        stateExample={this.state.exampleModal} 
        modalBuka={this.toggleModal} 
        modalTutup={this.toggleClose} 
        updateField={this.handleUbah} 
        save={this.handleSimpan} 
        status={this.state.isUpdate}
        dataPeg={this.state.dataPeg}
        />
      </>
    );
  }
}

export default BerkahInput;
