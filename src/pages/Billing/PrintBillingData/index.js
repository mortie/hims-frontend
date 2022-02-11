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
import styles from "../ListtoOrder/styles";
import Box from "@material-ui/core/Box";
import { Link, Route } from "react-router-dom";
const useStyles = makeStyles(styles);
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
          <div style={{ width: "100%" }}>
            <Box display="flex" justifyContent="space-between">
              <Box p={1} style={{ width: "30%" }}>
                PatientId : <strong>{patientDataresult.identifier}</strong>
              </Box>
              <Box p={1} style={{ width: "30%" }}>
                Name :
                <strong>{patientDataresult.patientName.toUpperCase()}</strong>
              </Box>
              <Box p={1} style={{ width: "30%" }}>
                Gender : <strong>{patientDataresult.gender}</strong>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box p={1} style={{ width: "30%" }}>
                Age : <strong>{patientDataresult.age}</strong>
              </Box>
              <Box p={1} style={{ width: "30%" }}>
                Order Date : <strong>{patientDataresult.orderdate}</strong>
              </Box>
              <Box p={1} style={{ width: "30%" }}>
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
              </Box>
            </Box>
            {/* <Box p={1} style={{ width: "30%" }}>
              BillId:
            </Box> */}
          </div>

          {/* <Grid container spacing={2}>
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
          </Grid> */}
          <TableContainer component={Paper} style={{ marginTop: 20 }}>
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
                    <TableCell
                      className={classes.custompaddingcellbilled}
                      component="th"
                      scope="row"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell className={classes.custompaddingcellbilled}>
                      <strong>{row.serviceName}</strong>
                    </TableCell>
                    <TableCell className={classes.custompaddingcellbilled}>
                      {row.quantity}
                    </TableCell>
                    <TableCell className={classes.custompaddingcellbilled}>
                      {row.UnitPrice}
                    </TableCell>
                    <TableCell className={classes.custompaddingcellbilled}>
                      {row.totalUnitPrice}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    className={classes.custompaddingcellbilled}
                  ></TableCell>
                  <TableCell
                    className={classes.custompaddingcellbilled}
                  ></TableCell>
                  <TableCell
                    className={classes.custompaddingcellbilled}
                  ></TableCell>

                  <TableCell className={classes.custompaddingcellbilled}>
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell className={classes.custompaddingcellbilled}>
                    <strong> {billingDataresult.total}</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className={classes.custompaddingcellbilled}
                  ></TableCell>
                  <TableCell
                    className={classes.custompaddingcellbilled}
                  ></TableCell>
                  <TableCell
                    className={classes.custompaddingcellbilled}
                  ></TableCell>

                  <TableCell className={classes.custompaddingcellbilled}>
                    <strong>Total Amount Paid as Advance</strong>
                  </TableCell>
                  <TableCell className={classes.custompaddingcellbilled}>
                    <strong> {billingDataresult.amountGiven}</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className={classes.custompaddingcellbilled}
                  ></TableCell>
                  <TableCell
                    className={classes.custompaddingcellbilled}
                  ></TableCell>
                  <TableCell
                    className={classes.custompaddingcellbilled}
                  ></TableCell>

                  <TableCell className={classes.custompaddingcellbilled}>
                    Discount(%)
                  </TableCell>
                  <TableCell className={classes.custompaddingcellbilled}>
                    {billingDataresult.waiverPercentage}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className={classes.custompaddingcellbilled}
                  ></TableCell>
                  <TableCell
                    className={classes.custompaddingcellbilled}
                  ></TableCell>
                  <TableCell
                    className={classes.custompaddingcellbilled}
                  ></TableCell>

                  <TableCell className={classes.custompaddingcellbilled}>
                    <strong>Total Amount Payable</strong>
                  </TableCell>
                  <TableCell className={classes.custompaddingcellbilled}>
                    <strong>{billingDataresult.totalAmountPayable}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Grid container justify="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrint}
              style={{ marginRight: 4 }}
              className={classes.colorchange}
            >
              Print
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              className={classes.colorchange}
              to="/app/billing/home"
            >
              Cancel
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
}

export default PrintBillingData;
