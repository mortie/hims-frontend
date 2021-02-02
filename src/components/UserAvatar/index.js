import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { getAuthenticatedUser } from "../../utils";

import { Avatar, Typography, Button, makeStyles } from "@material-ui/core";
import styles from "./styles";
import avatar from "../../assets/images/shubham.jpg";

const useStyles = makeStyles(styles);

function UserAvatar(props) {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, classes.flexRow)}>
      <Avatar alt="A" src={avatar}>
        SH
      </Avatar>
      <div className={classes.flexColumn}>
        <Typography component="h6">{getAuthenticatedUser().display}</Typography>
        
        <div className={classes.flexRow}>
          <Button
            color="primary"
            size="small"
            component={Link}
            to="/app/user-profile"
          >
            Profile
          </Button>
          <Button color="primary" size="small" onClick={props.handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserAvatar;
