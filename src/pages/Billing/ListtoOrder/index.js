import React, { useEffect } from "react";
import BillingNavbar from "../BillingNavbar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/";
import { useParams } from "react-router-dom";
import styles from "./styles";
import { TestOrderDetails } from "../../../services/data";
const useStyles = makeStyles(styles);

function ListtoOrder(props) {
  const classes = useStyles();
  const patientData = props.patientData;
  const { id, param2 } = useParams();
  useEffect(() => {
    console.log(patientData);
    /*async function fetchData() {
      const request = await TestOrderDetails.TestOrderDetailsDataFunc(
        id,
        param2
      );
      console.log(request);
    }
    fetchData();*/
  }, []);
  return (
    <>
      <BillingNavbar></BillingNavbar>

      <Card className={classes.root}>
        <CardHeader
          title="List of Orders"
          className={classes.title}
          titleTypographyProps={{ variant: "body1" }}
        />
        <CardContent></CardContent>
      </Card>
    </>
  );
}

export default ListtoOrder;
