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
import Akses from "views/Dash/Akses"
import Unit from "views/review/Review"
import Summary from "views/reviewtotal/Reviewtotal"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <ProtectedRoute path="/admin" component={AdminLayout} />
      <ProtectedRoute path="/dqmart" component={DqmartLayout} />
      <ProtectedRoute path="/keuangan" component={KeuangantLayout} />
      <Route
        path="/auth"
        render={(props) =>
          !getToken() ? ( <AuthLayout {...props} />) : ( <Redirect to={{ pathname: "/akses" }} />)
        }
      />
      <Route path="/dash" component={Dash}/>
      <Route path="/icon" component={Icons}/>
      <Route path="/step" component={Step}/>
      <Route path="/tes" component={ArrayInsert}/>
      <Route path="/akses" component={Akses}/>
      <Route path="/admin/review/:idlembaga" component={Unit}/>
      <Route path="/admin/reviewtotal/:idlembaga" component={Summary}/>
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
