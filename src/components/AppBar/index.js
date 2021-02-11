import React from "react";
import clsx from "clsx";
import {
  AppBar as TopBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import UserAvatar from "../UserAvatar";

import styles from "./styles";

const useStyles = makeStyles(styles);

function AppBar(props) {
  const classes = useStyles(styles);
  const { drawer, handleDrawer, handleLogout, routes } = props;

  const appTitle = () => {
    let title;
    routes.map((prop) => {
      if (window.location.href.indexOf(prop.path) !== -1) {
        title = prop.title;
      }
      return null;
    });
    return title;
  };

  return (
    <TopBar
      position="absolute"
      className={clsx(classes.appBar, drawer && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawer}
          className={clsx(
            classes.menuButton,
            drawer && classes.menuButtonHidden
          )}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {appTitle()}
        </Typography>
        <UserAvatar handleLogout={handleLogout} />
      </Toolbar>
    </TopBar>
  );
}

export default AppBar;
