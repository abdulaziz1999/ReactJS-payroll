import React from "react";
import { Route, Redirect } from "react-router-dom";

import { getToken,getRole } from "./Common";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        (getToken() && getRole() === 'keuangan') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
