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
import { SaveBillingPostData } from "../../../services/data";
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
import { Link, Route } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import swal from "sweetalert";
const useStyles = makeStyles(styles);

function ProcedureInvestigationOrder(props) {
  const classes = useStyles();
  const patientData = props.patientData;
  console.log(patientData);
  const initialformvalues = {
    service: "",
    totalamount: "",
    totalamountPayable: "",
    amountgiven: "",
    amountreturnedtoPatient: "",
    discountamount: 0,
    Commenttextfield: "",
  };
  const [formData, setformData] = React.useState(initialformvalues);
  const [discountrate, setDiscountRate] = React.useState(0);
  const [errors, seterrors] = React.useState(false);
  const [commenterror, setCommenterror] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = React.useState(
    patientData.billableServiceDetails.map((item) => {
      return true;
    })
  );
  //const initialDiscountRate=0.00;

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
  const [unitpricetextfield, setunitpricetextfield] = React.useState(
    patientData.billableServiceDetails.map((item) => {
      return item.price;
    })
  );
  // const [checkpricedisable, setcheckpricedisable] = React.useState(
  //   patientData.billableServiceDetails.map((item) => {
  //     return false;
  //   })
  // );
  // const [setquantityno, setsetQuantityNo] = React.useState("1");
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
  const initialnetamount = total;
  const [netamount, setNetAmount] = React.useState(initialnetamount);
  const handleQuantityChange = (event, position) => {
    const data = patientData.billableServiceDetails.map((item, index) => {
      return index === position
        ? (textfieldqunatityval[index] = event.target.value)
        : textfieldqunatityval[index];
    });

    settextfieldqunatityval(data);
    const totalmultunit = patientData.billableServiceDetails.map(
      (item, index) => {
        // return index === position
        //   ? parseInt(item.price) * parseInt(textfieldqunatityval[index])
        //   : parseInt(item.price) * parseInt(textfieldqunatityval[index]);
        return (
          parseInt(item.price) *
          parseInt(
            textfieldqunatityval[index] === ""
              ? "0"
              : textfieldqunatityval[index]
          )
        );
      }
    );
    setquantitymultiplyprice(totalmultunit);

    const totallastData = checked.reduce((sum, currentvalue, index) => {
      if (currentvalue === true) {
        console.log(unitpricetextfield[index]);
        console.log(textfieldqunatityval[index]);
        return (
          sum +
          parseInt(unitpricetextfield[index]) *
            parseInt(
              textfieldqunatityval[index] === ""
                ? "0"
                : textfieldqunatityval[index]
            )
        );
      }
      // else {
      //   return (
      //     sum +
      //     parseInt(currentvalue.price) * parseInt(textfieldqunatityval[index])
      //   );
      // }
      return sum;
    }, 0);

    setTotal(totallastData);
    const amountdeducted = (totallastData * discountrate) / 100;
    console.log(amountdeducted);
    const leftamount = parseFloat(totallastData) - parseFloat(amountdeducted);
    setNetAmount((totallastData - amountdeducted).toFixed(2));
    const amountreurn = (
      parseFloat(formData.amountgiven) - parseFloat(leftamount)
    ).toFixed(2);
    setformData({
      ...formData,
      amountreturnedtoPatient: amountreurn,
    });
  };
  const handleSelectChange = (event, position) => {
    const updatedCheckedState = checked.map((item, index) => {
      return index === position ? !item : item;
    });
    setChecked(updatedCheckedState);
    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          // quantitymultiplyprice[index] =
          //   parseInt(textfieldqunatityval[index]) *
          //   parseInt(unitpricetextfield[index]);
          return (
            sum +
            parseInt(textfieldqunatityval[index]) *
              parseInt(unitpricetextfield[index])
          );
        }
        // else {
        //   textfieldqunatityval[index] = "0";
        //   quantitymultiplyprice[index] =
        //     parseInt(textfieldqunatityval[index]) *
        //     parseInt(unitpricetextfield[index]);
        //   return (
        //     sum +
        //     parseInt(textfieldqunatityval[index]) *
        //       parseInt(unitpricetextfield[index])
        //   );
        // }
        return sum;
      },
      0
    );

    setTotal(totalPrice);

    const amountdeducted = (totalPrice * discountrate) / 100;
    console.log(amountdeducted);
    setNetAmount((totalPrice - amountdeducted).toFixed(2));
    const leftamount = parseFloat(totalPrice) - parseFloat(amountdeducted);
    const amountreurn = (
      parseFloat(formData.amountgiven) - parseFloat(leftamount)
    ).toFixed(2);
    setformData({
      ...formData,
      amountreturnedtoPatient: amountreurn,
    });
  };
  const handleSelectPriceChange = (event, position) => {
    const updatedCheckedState = checkedprice.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedprice(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          //setCommentTextfield(false);
          // textfieldqunatityval[index] = "1";
          quantitymultiplyprice[index] =
            parseInt(textfieldqunatityval[index]) *
            parseInt(unitpricetextfield[index]);
          return (
            sum +
            parseInt(textfieldqunatityval[index]) *
              parseInt(unitpricetextfield[index])
          );
        } else {
          //setCommentTextfield(true);
          textfieldqunatityval[index] = "0";
          quantitymultiplyprice[index] =
            parseInt(textfieldqunatityval[index]) *
            parseInt(unitpricetextfield[index]);
          return (
            sum +
            parseInt(textfieldqunatityval[index]) *
              parseInt(unitpricetextfield[index])
          );
        }
        //return sum;
      },
      0
    );

    setTotal(totalPrice);
    const amountdeducted = (totalPrice * discountrate) / 100;
    console.log(amountdeducted);
    setNetAmount((totalPrice - amountdeducted).toFixed(2));
    const leftamount = parseFloat(totalPrice) - parseFloat(amountdeducted);
    const amountreurn = (
      parseFloat(formData.amountgiven) - parseFloat(leftamount)
    ).toFixed(2);
    setformData({
      ...formData,
      amountreturnedtoPatient: amountreurn,
    });
  };
  const handleInputchange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "discountamount") {
      const discountrate = parseInt(
        e.target.value === "" ? "0" : e.target.value
      );
      setDiscountRate(discountrate);
      const amountdeducted = (parseInt(total) * discountrate) / 100;
      const leftamount = (total - amountdeducted).toFixed(2);
      setNetAmount((total - amountdeducted).toFixed(2));
      //console.log(typeofdiscountratedata);
      //console.log(parseInt(total) * discountratedata);
      // setDiscountRate(discountratedata);
      // const totalamount = total;
      // const discountedAmount = (totalamount * discountrate) / 100;
      // setNetAmount((total - discountedAmount).toFixed(2));
      const amountreurn = (
        parseFloat(formData.amountgiven) - parseFloat(leftamount)
      ).toFixed(2);
      setformData({
        ...formData,
        [e.target.name]: e.target.value,
        amountreturnedtoPatient: amountreurn,
      });
    }
    if (e.target.name === "amountgiven") {
      if (e.target.value !== "") {
        const newreturnedvalue = (
          parseFloat(e.target.value) - parseFloat(netamount)
        ).toFixed(2);
        setformData({
          ...formData,
          amountreturnedtoPatient: newreturnedvalue,
          amountgiven: e.target.value,
        });
        seterrors(false);
      } else {
        seterrors(true);
      }
    }
    if (e.target.name === "Commenttextfield") {
      if (e.target.value === "") {
        setCommenterror(true);
      } else {
        setCommenterror(false);
        setformData({
          ...formData,
          Commenttextfield: e.target.value,
        });
      }
    }
  };
  const handleformDataSubmit = async (e) => {
    e.preventDefault();

    //alert("sssssssssssssss");
    if (formData.amountgiven === "") {
      seterrors(true);
      // e.preventDefault();
    } else {
      seterrors(false);
      const formval = document.getElementById("formpatientdata");

      const payload = {
        total: parseFloat(formval.elements["totalamountbilled"].value),
        waiverPercentage: parseFloat(formval.elements["discountamount"].value),
        totalAmountPayable: parseFloat(
          formval.elements["totalamountpaybale"].value
        ),
        amountGiven: parseFloat(formval.elements["amountgiven"].value),
        amountReturned: parseFloat(
          formval.elements["amountreturnedtoPatient"].value
        ),
        // comment: formval.elements["Commenttextfield"]
        //   ? formval.elements["Commenttextfield"].value
        //   : "xyz",
        comment: "xyz",
        orderServiceDetails: [
          {
            opdOrderId: patientData.encounterId,
            quantity: parseInt(formval.elements["textfiledQuantityid0"].value),
            billed: true,
          },
        ],
      };
      swal({
        title: "Thank You",
        text: "Billing Data Saved Successfully",
        icon: "success",
      }).then((value) => {
        setTimeout(() => {
          setIsLoading(false);
          window.location.href = "/app/billing/home";
        }, 200);
      });
      // const response = await SaveBillingPostData.saveBillingData(payload);
      // console.log(response);
      // if (response !== null) {
      //   swal({
      //     title: "Thank You",
      //     text: "Billing Data Saved Successfully",
      //     icon: "success",
      //   }).then((value) => {
      //     setTimeout(() => {
      //       setIsLoading(false);
      //       window.location.href = "/app/billing/home";
      //     }, 2000);
      //   });
      // } else {
      //   swal({
      //     title: "Server Error !",
      //     text: "Try Again after Some Time",
      //     icon: "error",
      //   });
      // }
    }
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
              <Typography>
                PatientId : <strong>{patientData.identifier}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>
                Name : <strong>{patientData.patientName.toUpperCase()}</strong>
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
                Patient Category :
                <strong>
                  {" "}
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
          <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <form
              onSubmit={handleformDataSubmit}
              id="formpatientdata"
              method="post"
            >
              <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sl No.</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Select</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Pay</TableCell>
                    <TableCell>Unit Price</TableCell>
                    <TableCell>Quantity * Unit Price</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {patientData.billableServiceDetails.map((row, index) => (
                    <TableRow key={`keyindex${index}`}>
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
                        {index + 1}
                      </TableCell>
                      <TableCell className={classes.custompaddingcell}>
                        {row.serviceConName}
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
                          disabled={
                            (checked[index] === true ? false : true) ||
                            (checkedprice[index] === true ? false : true)
                          }
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
                          value={unitpricetextfield[index]}
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
                          value={quantitymultiplyprice[index]}
                          InputProps={{
                            readOnly: true,
                          }}
                          disabled={checked[index] === true ? false : true}
                        />
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
                        value={formData.discountamount}
                        id="discountamount"
                        name="discountamount"
                        onChange={(e) => {
                          if (e.target.value.length > 3) return false;
                          handleInputchange(e);
                        }}
                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                        type="number"
                        style={{ minWidth: 208 }}
                      />
                    </TableCell>
                  </TableRow>
                  {checkedprice.includes(false) && checkedprice.length > 0 && (
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
                        Comment
                      </TableCell>

                      <TableCell className={classes.custompaddingcell}>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={formData.Commenttextfield}
                          id="Commenttextfield"
                          name="Commenttextfield"
                          onChange={(e) => {
                            handleInputchange(e);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  )}

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
                      <strong>Total Amount Payable</strong>
                    </TableCell>
                    <TableCell className={classes.custompaddingcell}>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={netamount}
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
                      <strong> Amount Given</strong>
                    </TableCell>
                    <TableCell className={classes.custompaddingcell}>
                      <TextField
                        error={errors}
                        variant="outlined"
                        size="small"
                        value={formData.amountgiven}
                        id="amountgiven"
                        name="amountgiven"
                        onChange={(e) => {
                          console.log(e.target.value.length);
                          if (e.target.value.length > 8) return false;
                          handleInputchange(e);
                        }}
                        type="number"
                        helperText={
                          errors === true ? "This field is required" : ""
                        }
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
                        value={formData.amountreturnedtoPatient}
                        id="amountreturnedtoPatient"
                        name="amountreturnedtoPatient"
                        type="number"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button
                variant="contained"
                color="primary"
                className={classes.margin}
                type="submit"
                disabled={errors === true ? true : false}
              >
                Save Bill
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/app/billing/home"
                className={classes.colorchange}
              >
                Cancel
              </Button>
            </form>
          </TableContainer>
          {/* {isLoading && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CircularProgress />
            </div>
          )} */}
        </CardContent>
      </Card>
    </>
  );
}

export default ProcedureInvestigationOrder;
