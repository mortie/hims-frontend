import React from 'react';
import { GridContainer, GridItem } from "../../../components/Grid";
import { makeStyles, Icon,Typography } from "@material-ui/core";
import { Card, CardHeader, CardIcon, CardFooter } from "../../../components/Card";
import styles from "../../Home/styles";
const useStyles = makeStyles(styles);
function BillingTabHomeComponent() {
  const classes = useStyles();
    return (
        <div>
              <GridContainer>
              <GridItem item xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Icon className="fa fa-user-md" style={{ width: "1.2em" }} />
                  </CardIcon>
                  <h4 className={classes.cardTitle} style={{ fontSize: "1em" }}>O.P.D Bills</h4>
                  <Typography variant="h6" component="h2">
                   5000
                  </Typography>
                </CardHeader>
                <CardFooter stats>
                 
                </CardFooter>
              </Card>
              </GridItem>
              <GridItem item xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Icon className="fa fa-procedures" style={{ width: "1.2em" }} />
                  </CardIcon>
                  <h4 className={classes.cardTitle} style={{ fontSize: "1em"}}>I.P.D Bills</h4>
                  <Typography variant="h6" component="h2">
                   3000
                  </Typography>
                </CardHeader>
                <CardFooter stats>
                 
                </CardFooter>
              </Card>
              </GridItem>
              <GridItem item xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Icon className="fa fa-vials" style={{ width: "1.2em" }} />
                  </CardIcon>
                  <h4 className={classes.cardTitle} style={{ fontSize: "1em" }}>Lab Orders</h4>
                  <Typography variant="h6" component="h2">
                   10
                  </Typography>
                </CardHeader>
                <CardFooter stats>
                 
                </CardFooter>
              </Card>
              </GridItem>
              <GridItem item xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Icon className="fa fa-x-ray" style={{ width: "1.2em" }}  />
                  </CardIcon>
                  <h4 className={classes.cardTitle} style={{ fontSize: "1em"}} >Radiology Orders</h4>
                  <Typography variant="h6" component="h2">
                   10
                  </Typography>
                </CardHeader>
                <CardFooter stats>
                 
                </CardFooter>
              </Card>
              </GridItem>
              </GridContainer>
              
        </div>
    )
}
export default BillingTabHomeComponent;