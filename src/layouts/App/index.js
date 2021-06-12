import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { makeStyles, CssBaseline, Container } from "@material-ui/core";
import { logout, hasAccess, isLogin } from "../../utils";
import { appRoutes as routes } from "../../routes";
import { AppBar, SideBar, Footer } from "../../components";
import styles from "./styles";
import { getAPI, deleteAPI } from "../../services";
import { SESSION_TIME_OUT } from "../../utils/constants";

import { addLocations } from "../../actions/locationActions";

const useStyles = makeStyles(styles);

function App({ ...rest }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();
  const [drawer, setDrawer] = useState(true);

  useEffect(() => {
    getAPI("/location?v=custom:(uuid,display)")
      .then((response) => dispatch(addLocations(response.data.results)))
      .catch((error) => console.log(error));
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLogin()) {
        logout(history);
      }
    }, SESSION_TIME_OUT);
    return () => clearInterval(interval);
  }, []);

  const handleDrawer = () => {
    setDrawer(!drawer);
  };

  const handleLogout = () => {
    deleteAPI("/loginaudit").then((response) => logout(history));
  };

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (hasAccess(prop.roles)) {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
              exact
            />
          );
        }
        return null;
      })}
      <Redirect from="/" to="/app/home" />
    </Switch>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SnackbarProvider>
        <AppBar
          handleDrawer={handleDrawer}
          handleLogout={handleLogout}
          routes={routes}
          drawer={drawer}
          {...rest}
        />
        <SideBar
          handleDrawer={handleDrawer}
          match={match}
          routes={routes}
          drawer={drawer}
          color="blue"
          {...rest}
        />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {switchRoutes}
          </Container>
          <Footer />
        </main>
      </SnackbarProvider>
    </div>
  );
}

export default App;
