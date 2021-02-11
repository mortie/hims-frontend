import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PublicRoute, PrivateRoute } from "./routes";
import App from "./layouts/App";
import SignIn from "./pages/SignIn";
import "./assets/css/styles.css";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <PublicRoute restricted={true} component={SignIn} path="/" exact />
          <PublicRoute
            restricted={true}
            component={SignIn}
            path="/signin"
            exact
          />
          <PrivateRoute component={App} path="/app" />
          <Redirect from="/" to="/signin" />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
