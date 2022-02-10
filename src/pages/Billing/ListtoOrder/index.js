import React, { useEffect, useState } from "react";
import BillingNavbar from "../BillingNavbar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, Typography, LinearProgress } from "@material-ui/core/";
import { useParams } from "react-router-dom";
import styles from "./styles";
import { TestOrderDetails } from "../../../services/data";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import { Alert } from "@material-ui/lab";
import ProcedureInvestigationOrder from "../ProcedureInvestigationOrder";
const useStyles = makeStyles(styles);

function ListtoOrder(props) {
  const classes = useStyles();
  const patientData = props.patientData;
  const [procedureinvestigationorder, setProcedureInvestigationOrder] =
    useState();
  const CustomLoadingOverlay = () => {
    return (
      <GridOverlay>
        <div style={{ position: "absolute", top: 0, width: "100%" }}>
          <LinearProgress />
        </div>
      </GridOverlay>
    );
  };
  const CustomNoRowsOverlay = () => {
    return (
      <GridOverlay>
        <Alert severity="info">
          <strong>No records found.</strong>
        </Alert>
      </GridOverlay>
    );
  };

  const row = [
    {
      id: 1,
      orderid: patientData.encounterId,
      date: patientData.orderdate,
      sentFrom: patientData.locationName,
      extradataPatient: patientData.billableServiceDetails,
    },
  ];

  const columns = [
    { field: "id", headerName: "Sl No.", width: 180 },
    { field: "orderid", headerName: "Order ID", width: 320 },
    { field: "date", headerName: "Date", width: 220 },
    { field: "sentFrom", headerName: "Sent From", width: 220 },
    {
      field: "extradataPatient",
      headerName: "Extra Data",
      width: 120,
      hide: true,
    },
  ];
  const handleOpen = (event) => {
    console.log(event.row);
    setProcedureInvestigationOrder(true);
  };
  const { id, param2 } = useParams();
  useEffect(() => {
    console.log(patientData);
  }, []);
  if (procedureinvestigationorder) {
    return <ProcedureInvestigationOrder patientData={patientData} />;
  } else {
    return (
      <>
        <BillingNavbar></BillingNavbar>

        <Card className={classes.root}>
          <CardHeader
            title="List of Orders"
            className={classes.title}
            titleTypographyProps={{ variant: "body1" }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography>
                  PatientId : <strong>{patientData.identifier}</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography>
                  Name :{" "}
                  <strong>{patientData.patientName.toUpperCase()}</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography>
                  Gender : <strong>{patientData.gender}</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography>
                  Age : <strong>{patientData.age}</strong>
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography>
                  Order Date : <strong>{patientData.orderdate}</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography>
                  Patient Category :{" "}
                  <strong>
                    {patientData.patientCategory === null
                      ? "N.A."
                      : patientData.patientCategory.substring(
                          0,
                          patientData.patientCategory.length - 1
                        )}
                  </strong>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Paper style={{ marginTop: 5 }}>
          <DataGrid
            rows={row}
            columns={columns}
            autoHeight
            rowHeight={40}
            headerHeight={40}
            onCellClick={handleOpen}
            className={classes.table}
            pageSize={10}
            components={{
              LoadingOverlay: CustomLoadingOverlay,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
          />
        </Paper>
      </>
    );
  }
}

export default ListtoOrder;
