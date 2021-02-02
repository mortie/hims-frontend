import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Icon, Button } from "@material-ui/core";
import { appRoutes } from "../../routes/index";
import { hasAccess } from "../../utils";
import { GridContainer, GridItem } from "../../components/Grid";
import { Card, CardHeader, CardIcon, CardFooter } from "../../components/Card";

import styles from "./styles";

const useStyles = makeStyles(styles);

function Home() {
  const classes = useStyles();
  return (
    <GridContainer>
      {appRoutes.map((prop, key) => {
        if (prop.view && hasAccess(prop.roles)) {
          return (
            <GridItem item xs={12} sm={6} md={3} key={key}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    {typeof prop.icon === "string" ? (
                      <Icon className={prop.icon} style={{ width: "1.2em" }} />
                    ) : (
                      <prop.icon />
                    )}
                  </CardIcon>
                  <h4 className={classes.cardTitle}>{prop.name}</h4>
                </CardHeader>
                <CardFooter stats>
                  <Button
                    size="small"
                    className={classes.cardButton}
                    component={Link}
                    to={prop.layout + prop.path}
                    endIcon={<Icon>launch</Icon>}
                  >
                    Visit
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          );
        } else {
          return null;
        }
      })}
    </GridContainer>
  );
}

export default Home;
