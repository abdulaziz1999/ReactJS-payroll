import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { getToken } from "../src/Utils/Common";
import ProtectedRoute from "../src/Utils/protectedRoute";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <ProtectedRoute path="/admin" component={AdminLayout} />
      <Route
        path="/auth"
        render={(props) =>
          !getToken() ? (
            <AuthLayout {...props} />
          ) : (
            <Redirect to={{ pathname: "/admin" }} />
          )
        }
      />
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
