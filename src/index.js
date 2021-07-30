import React from "react"
import ReactDOM from "react-dom"
import { HashRouter, Route, Switch, Redirect } from "react-router-dom"

import "assets/plugins/nucleo/css/nucleo.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "assets/scss/argon-dashboard-react.scss"

import AdminLayout from "layouts/Admin.js"
import AuthLayout from "layouts/Auth.js"
import DqmartLayout from "layouts/Dqmart"
import KeuangantLayout from "layouts/Keuangan"
import UnitLayout from "layouts/Unit"
import { getToken } from "../src/Utils/Common"
import ProtectedRoute from "./Utils/protectedRoute"
import Akses from "views/Dash/Akses"


ReactDOM.render(
  <HashRouter>
    <Switch>
      <ProtectedRoute path="/admin" component={AdminLayout} />
      <ProtectedRoute path="/dqmart" component={DqmartLayout} />
      <ProtectedRoute path="/keuangan" component={KeuangantLayout} />
      <ProtectedRoute path="/unit" component={UnitLayout} />
      <Route path="/auth" render={(props) => !getToken() ? ( <AuthLayout {...props} />) : ( <Redirect to={{ pathname: "/akses" }} />)}/>
      <Route path="/akses" component={Akses}/>
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
