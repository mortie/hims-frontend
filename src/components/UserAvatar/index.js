import React, { useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography, Button, makeStyles, Avatar } from "@material-ui/core";
import { getAuthenticatedUser } from "../../utils";
import { getImageAPI } from "../../services";
import { addAvatar } from "../../actions/avatarActions";

import styles from "./styles";

const useStyles = makeStyles(styles);

function UserAvatar(props) {
  const classes = useStyles();
  const avatar = useSelector((state) => state.avatar.avatar);
  const dispatch = useDispatch();

  useEffect(() => {
    getImageAPI(`/personimage/${getAuthenticatedUser().person.uuid}`)
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        dispatch(addAvatar(url));
      })
      .catch((e) => {
        dispatch(addAvatar(null));
      });
  }, []);
  return (
    <div className={clsx(classes.root, classes.flexRow)}>
      <Avatar src={avatar} alt={getAuthenticatedUser().display}>
        {getAuthenticatedUser().display.slice(0, 1).toUpperCase()}
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
