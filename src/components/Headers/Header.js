import { Component,React } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import API from "service";

class Header extends Component {
  state = {
    jumlahPegawai: 0,
    jumlahLembaga: 0,
    jumlahKredit: 0,
    jumlahCicilan: 0
  };

  getLembaga = async() => {
    await API.getUnit().then((res) =>{
      this.setState({
        jumlahLembaga : res.length
      })
    })
  }

  getKredit = async() => {
    await API.getAllKredit().then((res) =>{
      this.setState({
        jumlahKredit  : res.total,
        jumlahCicilan : res.total,
        jumlahPegawai : res.totalPegawai
      })
    })
  }

  format = (amount) => {
    return 'Rp. '+Number(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')
  }

  componentDidMount() {
    this.getLembaga()
    this.getKredit()
  }

  render () {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0" >
                            Jumlah Pegawai
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.jumlahPegawai}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0" >
                            Jumlah Lembaga
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.jumlahLembaga}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0" >
                            Kredit
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.format(this.state.jumlahKredit)}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0" >
                            Cicilan
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {this.format(this.state.jumlahKredit)}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    )
  }
}

export default Header;
