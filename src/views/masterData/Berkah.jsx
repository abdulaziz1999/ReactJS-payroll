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
    Table,
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

class KirimData extends Component {
  state = {
    post: [],
    data: [],
    tabs:1,
    dataDate : {
        startDate : "",
        endDatae : "",
    },
    jenis : ""
  };

  toggleNavs = (e, state, index, jenisp) => {
    e.preventDefault();
    this.setState({
      [state]: index,
      jenis : jenisp,
      data : []
    });
  };

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
    let jenis       = this.state.jenis.toLowerCase()
    let idlembaga   = 4
    let startDate   = this.state.dataDate.startDate
    let endDate     = this.state.dataDate.endDate
    await API.getPotonganRangeTgl(jenis,idlembaga,startDate,endDate).then((res) => {
        this.setState({
            data : res
        })
    })
  }

  componentDidMount() {  
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
                                onClick={e => this.toggleNavs(e, "tabs", index+1, row.potongan)}
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
                                            <input type="hidden" id="jenis" value={row.potongan}/>
                                            <Col md="4">
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-calendar-grid-58" />
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <Input className="form-control-alternative" name="startDate" onChange={this.handleUpdate} placeholder="Tgl" type="date" />
                                            </InputGroup>
                                            </Col>
                                            <Col md="4">
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-calendar-grid-58" />
                                                </InputGroupText>
                                                </InputGroupAddon>
                                                <Input className="form-control-alternative" name="endDate" onChange={this.handleUpdate} placeholder="Tgl" type="date" />
                                            </InputGroup>
                                            </Col>
                                            <Col md="4" className="mt--3">
                                                <Button color="success" className="mt-3" size="md" type="button" onClick={this.tampilkan} >Tampilkan</Button>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    
                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light">
                                            <tr >
                                            <th scope="col">Nama</th>
                                            <th scope="col">Jumlah</th>
                                            <th scope="col" className="text-center">Act</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {this.state.data.map((row,index) => {
                                                return(
                                                    <tr className="text-left" key={index}>
                                                        <td>{row.nama}</td>
                                                        <td>{row.total}</td>
                                                        <td></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                    
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
        
      </>
    );
  }
}

export default KirimData;
