import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils";

export const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          <Redirect from="/" to="/app/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
