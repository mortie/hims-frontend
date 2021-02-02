import React, { useState, useEffect } from "react";
import { getAPI } from "../../services";
import { makeStyles } from "@material-ui/core";
import { GridContainer, GridItem } from "../../components/Grid";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardAvatar,
} from "../../components/Card";
import Button from "../../components/CustomButton";
import avatar from "../../assets/images/shubham.jpg";
import styles from "./styles";

const useStyles = makeStyles(styles);
function UserProfile() {
  const classes = useStyles();
  const [image, setImage] = useState();

  useEffect(() => {
    getAPI("/personimage/3a8e9e70-250a-4deb-99da-e6789d537f01")
      .then((response) => {
        setImage(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody></CardBody>
            <CardFooter>
              <Button color="primary" variant="contained">
                Update Profile
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Admin</h6>
              <h4 className={classes.cardTitle}>Shubham Goyal</h4>
              <p className={classes.description}>
                Duis finibus elit vitae leo aliquam, et dapibus augue maximus.
                Nullam fringilla nisl vitae odio dignissim, eget scelerisque
                odio ultricies. Suspendisse sollicitudin vel ligula at commodo.
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default UserProfile;
