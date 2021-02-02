import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { loadCSS } from "fg-loadcss";
import {
  Drawer,
  Divider,
  List,
  IconButton,
  makeStyles,
  Icon,
  ListItemText,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import styles from "./styles";
import { hasAccess } from "../../utils";

const useStyles = makeStyles(styles);

function SideBar(props) {
  const classes = useStyles(styles);
  const { drawer, handleDrawer, routes, color } = props;

  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  var links = (
    <List>
      {routes.map((prop, key) => {
        if (prop.view && hasAccess(prop.roles)) {
          let listItemClasses = clsx({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path),
          });
          let listFontClasses = clsx({
            [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path),
          });

          return (
            <MenuItem
              button
              component={Link}
              to={prop.layout + prop.path}
              className={classes.item + listItemClasses + listFontClasses}
              key={key}
              title={prop.name}
            >
              <ListItemIcon>
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={prop.icon + listFontClasses}
                    style={{ width: "1.2em" }}
                  />
                ) : (
                  <prop.icon className={listFontClasses} />
                )}
              </ListItemIcon>
              <ListItemText primary={prop.name} />
            </MenuItem>
          );
        } else {
          return null;
        }
      })}
    </List>
  );

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !drawer && classes.drawerPaperClose),
      }}
      open={drawer}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawer}>
          <MenuIcon />
        </IconButton>
      </div>
      <Divider />
      {links}
    </Drawer>
  );
}

export default SideBar;
