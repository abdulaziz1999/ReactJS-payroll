import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import DqmartLayout from "layouts/Dqmart";
import KeuangantLayout from "layouts/Keuangan";
import { getToken } from "../src/Utils/Common";
import ProtectedRoute from "./Utils/protectedRoute";
import Dash from "views/Dash";
import Icons from "views/examples/Icons";
import Step from "views/Step/Step";
import ArrayInsert from "views/examples/Tes.js"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <ProtectedRoute path="/admin" component={AdminLayout} />
      <ProtectedRoute path="/dqmart" component={DqmartLayout} />
      <ProtectedRoute path="/keuangan" component={KeuangantLayout} />
      {/* <Route path="/auth" component={AuthLayout}/> */}
      <Route
        path="/auth"
        render={(props) =>
          // (getToken() && getRole() === 'admin') ? ( <Redirect to={{ pathname: "/admin" }} />) : ( <AuthLayout {...props} />) ||
          // (getToken() && getRole() === 'dqmart') ? ( <Redirect to={{ pathname: "/dqmart" }} />) : ( <AuthLayout {...props} />) ||
          // (getToken() && getRole() === 'keuangan') ? ( <Redirect to={{ pathname: "/keuangan" }} />) : ( <AuthLayout {...props} />) 
          !getToken() ? ( <AuthLayout {...props} />) : ( <Redirect to={{ pathname: "/admin" }} />)
        }
      />
      <Route path="/dash" component={Dash}/>
      <Route path="/icon" component={Icons}/>
      <Route path="/step" component={Step}/>
      <Route path="/tes" component={ArrayInsert}/>
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
