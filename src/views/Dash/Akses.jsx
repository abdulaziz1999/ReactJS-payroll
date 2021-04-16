import React, { Component } from "react";
import { getToken,getRole } from "../../Utils/Common";
import '../examples/css/Style.css';

class Akses extends Component {

  aksesUser = () => {
    if(getToken() && getRole() === 'admin') {
        this.props.history.push('/admin/index');
    }else if (getToken() && getRole() === 'dqmart') {
        this.props.history.push('/dqmart/index');
    }else if(getToken() && getRole() === 'keuangan') { 
        this.props.history.push('/keuangan/index');
    }else if(getToken() && getRole() === 'unit') { 
        this.props.history.push('/unit/index');
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
