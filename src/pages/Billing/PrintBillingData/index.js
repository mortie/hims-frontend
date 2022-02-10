import React, { useRef } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import BillingNavbar from "../BillingNavbar";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 10,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
function PrintBillingData(props) {
  const classes = useStyles();
  const ref = useRef();
  const billingDataresult = props.billingData;
  const patientDataresult = props.patientDataprops;
  const servicdetailsValResult = props.serviceDetailsprops;
  console.log(billingDataresult);
  //   console.log(patientDataresult);
  //   console.log(servicdetailsValResult);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
    //onAfterPrint: () => handleClose()
  });
  return (
    <>
      <BillingNavbar></BillingNavbar>
      <Card className={classes.root} variant="outlined">
        <CardContent ref={ref}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography>
                PatientId : <strong>{patientDataresult.identifier}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>
                Name :{" "}
                <strong>{patientDataresult.patientName.toUpperCase()}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>
                Gender : <strong>{patientDataresult.gender}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>
                Age : <strong>{patientDataresult.age}</strong>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography>
                Order Date : <strong>{patientDataresult.orderdate}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>
                Patient Category :
                <strong>
                  {" "}
                  {patientDataresult.patientCategory === null
                    ? "N.A."
                    : patientDataresult.patientCategory.substring(
                        0,
                        patientDataresult.patientCategory.length - 1
                      )}
                </strong>
              </Typography>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sl No.</TableCell>
                  <TableCell>Service Name</TableCell>
                  <TableCell>Quantity</TableCell>

                  <TableCell>Price(Rs)</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billingDataresult.billdata.map((row, index) => (
                  <TableRow key={`keytablerow${index}`}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{row.serviceName}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.UnitPrice}</TableCell>
                    <TableCell>{row.totalUnitPrice}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>

                  <TableCell>Total</TableCell>
                  <TableCell>{billingDataresult.total}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>

                  <TableCell>Discount(%)</TableCell>
                  <TableCell>{billingDataresult.waiverPercentage}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>

                  <TableCell>Total Amount Payable</TableCell>
                  <TableCell>{billingDataresult.totalAmountPayable}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handlePrint}
          >
            Print
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default PrintBillingData;
