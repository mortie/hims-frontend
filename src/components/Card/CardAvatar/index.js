import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Button, makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { getAuthenticatedUser } from "../../../utils";
import { postAPI } from "../../../services";
import ImageUpload from "../../ImageUpload";
import styles from "./styles";
import { addAvatar, removeAvatar } from "../../../actions/avatarActions";

const useStyles = makeStyles(styles);

export default function CardAvatar(props) {
  const classes = useStyles();
  const avatar = useSelector((state) => state.avatar);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { className, small, profile, ...rest } = props;

  const cardAvatarClasses = clsx({
    [classes.cardAvatar]: true,
    [classes.cardAvatarProfile]: profile,
    [className]: className !== undefined,
  });

  function uploadImage(img) {
    const data = {
      person: getAuthenticatedUser().person.uuid,
      base64EncodedImage: img.base64.split(",")[1],
    };
    postAPI(`/personimage`, data)
      .then((response) => {
        dispatch(addAvatar(img.base64));
        enqueueSnackbar("Image uploaded successfully");
      })
      .catch((error) => {
        enqueueSnackbar(
          "There seems to be a problem while uploading image. Please try again."
        );
      });
  }

  function removeImage(e) {
    dispatch(removeAvatar());
    enqueueSnackbar("Image deleted successfully");
  }

  return (
    <div>
      <div className={cardAvatarClasses} {...rest}>
        {avatar ? (
          <img src={avatar} alt={getAuthenticatedUser().display} />
        ) : (
          <div className={classes.cardAvatarText}>
            {getAuthenticatedUser().display.slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>
      <div>
        <label htmlFor="image-upload" className={classes.uploadButton}>
          <ImageUpload
            id="image-upload"
            onDone={(e) => uploadImage(e)}
            className={classes.imageUpload}
          />
          Upload
        </label>
        {avatar ? (
          <Button
            color="secondary"
            size="small"
            onClick={(e) => removeImage(e)}
          >
            Remove
          </Button>
        ) : null}
      </div>
    </div>
  );
}

CardAvatar.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.bool,
};
