import React, { useEffect, useState } from "react";
import BillingNavbar from "../BillingNavbar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import {
  makeStyles,
  Typography,
  LinearProgress,
  TextField,
  Button,
} from "@material-ui/core/";
import { useParams } from "react-router-dom";
import styles from "../ListtoOrder/styles";
import { TestOrderDetails } from "../../../services/data";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import { Alert } from "@material-ui/lab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
const useStyles = makeStyles(styles);

function ProcedureInvestigationOrder(props) {
  const classes = useStyles();
  const patientData = props.patientData;
  const [checked, setChecked] = React.useState(
    patientData.billableServiceDetails.map((item) => {
      return true;
    })
  );
  const [textfieldqunatityval, settextfieldqunatityval] = React.useState(
    // patientData.billableServiceDetails.map((item, index) => {
    //   return {
    //     ["textfiledQuantityid" + index]: "1",
    //   };
    // })
    patientData.billableServiceDetails.map((item) => {
      return "1";
    })
  );
  const [checkedprice, setCheckedprice] = React.useState(
    patientData.billableServiceDetails.map((item) => {
      return true;
    })
  );
  // const [checkpricedisable, setcheckpricedisable] = React.useState(
  //   patientData.billableServiceDetails.map((item) => {
  //     return false;
  //   })
  // );
  const [setquantityno, setsetQuantityNo] = React.useState("1");
  console.log(patientData);
  const initialSate = {};
  const [quantitymultiplyprice, setquantitymultiplyprice] = React.useState(
    patientData.billableServiceDetails.map((item) => {
      return parseInt(item.price) * parseInt("1");
    })
  );
  const [pricevalue, setPriceValue] = React.useState(initialSate);
  const [total, setTotal] = useState(
    patientData.billableServiceDetails.reduce((sum, item) => {
      return sum + parseInt(item.price) * parseInt("1");
    }, 0)
  );
  const handleQuantityChange = (event, position) => {
    // setQuantityValue({
    //   ...quantityvalue,
    //   [event.target.name]: event.target.value,
    // });
    // const unitPricevalue = parseInt(
    //   document.getElementById("textfieldPriceid" + index).value
    // );
    // const quantityvalue = parseInt(
    //   document.getElementById("textfiledQuantityid" + index).value
    // );
    // document.getElementById("textfieldTotalUnitid" + index).value =
    //   unitPricevalue * quantityvalue;

    const data = patientData.billableServiceDetails.map((item, index) => {
      return index === position
        ? event.target.value
        : textfieldqunatityval[index];
    });

    settextfieldqunatityval(data);
    const totalmultunit = patientData.billableServiceDetails.map(
      (item, index) => {
        return index === position
          ? parseInt(event.target.value) * parseInt(item.price)
          : parseInt(item.price) * parseInt(textfieldqunatityval[index]);
      }
    );
    setquantitymultiplyprice(totalmultunit);

    const totallastData = patientData.billableServiceDetails.reduce(
      (sum, currentvalue, index) => {
        if (index === position) {
          return (
            sum + parseInt(currentvalue.price) * parseInt(event.target.value)
          );
        } else {
          return (
            sum +
            parseInt(currentvalue.price) * parseInt(textfieldqunatityval[index])
          );
        }
      },
      0
    );
    console.log(totallastData);
    setTotal(totallastData);
  };
  const handleSelectChange = (event, position) => {
    const updatedCheckedState = checked.map((item, index) => {
      return index === position ? !item : item;
    });
    setChecked(updatedCheckedState);
    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return (
            sum +
            parseInt(
              document.getElementById("textfieldTotalUnitid" + index).value
            )
          );
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };
  const handleSelectPriceChange = (event, position) => {
    const updatedCheckedState = checkedprice.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedprice(updatedCheckedState);
  };
  return (
    <>
      <BillingNavbar></BillingNavbar>

      <Card className={classes.root}>
        <CardHeader
          title="List of Procedures and Investigations"
          className={classes.title}
          titleTypographyProps={{ variant: "body1" }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography>PatientId : {patientData.identifier}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>
                Name : {patientData.patientName.toUpperCase()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>Gender : {patientData.gender}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>Age : {patientData.age}</Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography>Date : {patientData.orderdate}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>
                Patient Category : {patientData.patientCategory}
              </Typography>
            </Grid>
          </Grid>
          <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <form>
              <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sl No.</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Select</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Pay</TableCell>
                    <TableCell>Unit Price</TableCell>
                    <TableCell>Q*Unit Price</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {patientData.billableServiceDetails.map((row, index) => (
                    <TableRow key={`keyindex${index}`}>
                      <TableCell className={classes.custompaddingcell}>
                        {index + 1}
                      </TableCell>
                      <TableCell className={classes.custompaddingcell}>
                        {row.serviceConName}
                      </TableCell>
                      <TableCell className={classes.custompaddingcell}>
                        <Checkbox
                          checked={checked[index]}
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                          id={`checkboxselectid${index}`}
                          name={`checkboxselectid${index}`}
                          onChange={(e) => {
                            handleSelectChange(e, index);
                          }}
                        />
                      </TableCell>
                      <TableCell className={classes.custompaddingcell}>
                        <TextField
                          id={`textfiledQuantityid${index}`}
                          name={`textfiledQuantityid${index}`}
                          variant="outlined"
                          size="small"
                          // defaultValue={1}
                          InputProps={{ inputProps: { min: 0, max: 10 } }}
                          value={textfieldqunatityval[index]}
                          onChange={(e) => {
                            handleQuantityChange(e, index);
                          }}
                          type="number"
                          disabled={checked[index] === true ? false : true}
                        />
                      </TableCell>
                      <TableCell className={classes.custompaddingcell}>
                        <Checkbox
                          color="primary"
                          checked={checkedprice[index]}
                          inputProps={{ "aria-label": "secondary checkbox" }}
                          id={`checkboxpriceid${index}`}
                          name={`checkboxpriceid${index}`}
                          onChange={(e) => {
                            handleSelectPriceChange(e, index);
                          }}
                          disabled={checked[index] === true ? false : true}
                        />
                      </TableCell>
                      <TableCell className={classes.custompaddingcell}>
                        <TextField
                          id={`textfieldPriceid${index}`}
                          name={`textfieldPriceid${index}`}
                          variant="outlined"
                          size="small"
                          value={row.price}
                          InputProps={{
                            readOnly: true,
                          }}
                          disabled={checked[index] === true ? false : true}
                        />
                      </TableCell>
                      <TableCell className={classes.custompaddingcell}>
                        <TextField
                          id={`textfieldTotalUnitid${index}`}
                          name={`textfieldTotalUnitid${index}`}
                          variant="outlined"
                          size="small"
                          // value={
                          //   parseInt(row.price) *
                          //   parseInt(quantityvalue[`textfiledQuantityid${index}`])
                          // }
                          value={quantitymultiplyprice[index]}
                          InputProps={{
                            readOnly: true,
                          }}
                          disabled={checked[index] === true ? false : true}
                        />

                        {/* {row.price * quantityvalue[`textfiledQuantityid${index}`]} */}
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell className={classes.custompaddingcell}>
                      Total
                    </TableCell>
                    <TableCell className={classes.custompaddingcell}>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={total}
                        id="totalamountbilled"
                        name="totalamountbilled"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell className={classes.custompaddingcell}>
                      Discount(%)
                    </TableCell>
                    <TableCell className={classes.custompaddingcell}>
                      <TextField
                        variant="outlined"
                        size="small"
                        value=""
                        id="discountamount"
                        name="discountamount"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell className={classes.custompaddingcell}>
                      Total Amount Payable
                    </TableCell>
                    <TableCell className={classes.custompaddingcell}>
                      <TextField
                        variant="outlined"
                        size="small"
                        value=""
                        id="totalamountpaybale"
                        name="totalamountpaybale"
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell className={classes.custompaddingcell}>
                      Amount Given
                    </TableCell>
                    <TableCell className={classes.custompaddingcell}>
                      <TextField
                        variant="outlined"
                        size="small"
                        value=""
                        id="amountgiven"
                        name="amountgiven"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>
                    <TableCell
                      className={classes.custompaddingcell}
                    ></TableCell>

                    <TableCell className={classes.custompaddingcell}>
                      Amount Returned to Patient
                    </TableCell>
                    <TableCell className={classes.custompaddingcell}>
                      <TextField
                        variant="outlined"
                        size="small"
                        value=""
                        id="amountreturned"
                        name="amountreturned"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button
                variant="contained"
                color="primary"
                href="#contained-buttons"
                className={classes.margin}
              >
                Save Bill
              </Button>
              <Button
                variant="contained"
                color="primary"
                href="#contained-buttons"
                className={classes.margin}
              >
                Cancel
              </Button>
            </form>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
}

export default ProcedureInvestigationOrder;
