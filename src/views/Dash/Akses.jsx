import React, { Component } from "react";
// import axios from "axios";
// reactstrap components
import { getToken,getRole } from "../../Utils/Common";
import '../examples/css/Style.css';
// import Swal from 'sweetalert2'

class Akses extends Component {

  aksesUser = () => {
    if(getToken() && getRole() === 'admin') {
        this.props.history.push('/admin/index');
    }else if (getToken() && getRole() === 'dqmart') {
        this.props.history.push('/dqmart/index');
    }else if(getToken() && getRole() === 'keuangan') { 
        this.props.history.push('/keuangan/index');
    } else{
        this.props.history.push('/auth/login');
    }
  };
  
  componentDidMount() {
    this.aksesUser()
  }

  render() {
    return (
      <>
        <div >   
        </div>
      </>
    );
  }
}

export default Akses;
