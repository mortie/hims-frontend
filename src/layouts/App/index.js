import React, { useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { makeStyles, CssBaseline, Container } from "@material-ui/core";
import { logout, hasAccess } from "../../utils";
import { appRoutes as routes } from "../../routes";
import { AppBar, SideBar, Footer } from "../../components";
import styles from "./styles";

const useStyles = makeStyles(styles);

function App({ ...rest }) {
  const classes = useStyles();
  let history = useHistory();
  const [drawer, setDrawer] = useState(true);

  const handleDrawer = () => {
    setDrawer(!drawer);
  };

  const handleLogout = () => {
    logout(history);
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
      <AppBar
        handleDrawer={handleDrawer}
        handleLogout={handleLogout}
        routes={routes}
        drawer={drawer}
        {...rest}
      />
      <SideBar
        handleDrawer={handleDrawer}
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
    </div>
  );
}

export default App;
