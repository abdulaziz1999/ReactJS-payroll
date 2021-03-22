import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./../components/Navbars/Navbar"
// reactstrap components
import {
  // Button,
  // Card,
  // CardHeader,
  // CardBody,
  // FormGroup,
  // Form,
  // Input,
  // InputGroupAddon,
  // InputGroupText,
  // InputGroup,
  // Row,
  // Col,
} from "reactstrap";
import Dash1 from "components/Table/Dash1";
// import Dash2 from "components/Table/Dash2";
import Tables from "../views/examples/Tables";

const Register = () => {
  return (
    <>
      
      <Router>
                <div>
                <Navbar/>
                    <Switch>
                      <Route exact path="/dash" component={Dash1}/>
                      <Route exact path="/dash2" component={Tables}/>
                    </Switch>
                </div>
            </Router>
    </>
  );
};

export default Register;
