import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { appRoutes as routes, PublicRoute, PrivateRoute } from "./routes";
import App from "./layouts/App";
import SignIn from "./views/SignIn";
import "./assets/css/styles.css";
// import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <PublicRoute restricted={true} component={SignIn} path="/" exact />
        <PublicRoute
          restricted={true}
          component={SignIn}
          path="/signin"
          exact
        />
        {routes.map((prop, key) => {
          return (
            <PrivateRoute
              key={key}
              component={App}
              path={prop.layout + prop.path}
              exact
            />
          );
        })}
        <Redirect from="/" to="/signin" />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
