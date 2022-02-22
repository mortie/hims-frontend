import React, { useState, useEffect } from "react";
import {
  TextField,
  makeStyles,
  Button,
  Box,
  Paper,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
  useMediaQuery,
  DialogContentText,
  LinearProgress,
  Icon,
  InputAdornment,
} from "@material-ui/core/";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import styles from "./styles";
import { Alert, Autocomplete } from "@material-ui/lab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { getAPI, postAPI, getPatientSearch } from "../../../services";
import { PatientSearchData, TestOrderDetails } from "../../../services/data";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import BillingNavbar from "../BillingNavbar";
import VerticalTabComponent from "../VerticalTabComponent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { useHistory } from "react-router-dom";
import ListtoOrder from "../ListtoOrder";
import { calculateAge } from "../../../utils/commons";

const useStyles = makeStyles(styles);
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows3 = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function OpdQue() {
  const classes = useStyles();
  //const [patientname,setPatientname]=useState("");
  const [datasubmitted, setDataSubmitted] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [patientData, setPatientData] = useState([]);
  const [showListToOrder, setShowListToOrder] = useState(false);
  const [showDialog, setshowDialog] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [actualorderdate, setActualOrderdate] = React.useState(
    moment().format("DD-MM-YYYY")
  );
  const [formerrors, setformErrors] = React.useState({});
  const [loading, setLoading] = useState(true);

  const [filteredPatientList, setFilteredPatientList] = useState([]);
  const [patientsList, setPatientsList] = useState([]);
  const [patientnameorid, setPatientnameorid] = React.useState("");
  const [orderrowdetails, setOrderRowDetails] = useState([]);
  const [countrow, setCountRow] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [pageSize, setPageSize] = React.useState(5);
  const history = useHistory();
  const calculateAgeFunction = (dateval) => {
    const valueresult = dateval.split("-");
    const dobj = new Date(
      parseInt(valueresult[2]),
      parseInt(valueresult[1]) - 1,
      parseInt(valueresult[0])
    );
    return moment(dobj).format();
  };
  const createPatientList = (results, orderdate) => {
    const patientList = results.map((result, index) => {
      //console.log(moment(result.birthDate).format());
      return {
        slno: index + 1,
        identifier: result.patientId,
        patientName: result.patientName,
        gender: result.gender,
        age: calculateAge(calculateAgeFunction(result.birthDate)),
        orderdate: orderdate,
        id: result.patientUuid,
        extraData: result.serviceDetailsForTestOrder,
        patientCategory: result.patientCategory,
      };
    });

    return patientList;
  };
  useEffect(() => {
    //console.log(moment().format("DD-MM-YYYY"));
    async function fetchData() {
      try {
        const request = await TestOrderDetails.TestOnlySelectDateFunc(
          actualorderdate
        );
        //console.log(request);
        const patientList = createPatientList(
          request.testOrderDetails,
          actualorderdate
        );
        setPatientsList(patientList);
        setFilteredPatientList(patientList);
        setLoading(false);
      } catch (err) {
        return null;
      }
    }
    fetchData();
  }, [actualorderdate]);
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoading(true);
    // setPatientnameorid(value);
    setSearchKey(value);
    setFilteredPatientList(getFilteredPatientList(value.toLowerCase()));
    //console.log(data);
    // const data = getFilteredPatientList(value.toLowerCase());
    // console.log(data);
    setLoading(false);
  };
  const getFilteredPatientList = (key) => {
    if (key.length >= 3) {
      const newitem = patientsList.filter(
        (item) =>
          item.identifier.toLowerCase().includes(key) ||
          item.patientName.toLowerCase().includes(key)
      );
      return newitem;
    } else {
      return patientsList;
    }
  };
  const handleDateChange = (date, value) => {
    // console.log(date);
    // console.log(value);
    //setActualOrderdate(moment(date["_d"]).format("DD-MM-YYYY"));
    setActualOrderdate(value);
    setSelectedDate(date);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setDataSubmitted(true);
    const orderinfo = {
      patientNameorId: patientnameorid,
      orderDate: actualorderdate,
    };
  };
  const columns = [
    { field: "slno", headerName: "Sl No.", width: 120 },
    { field: "identifier", headerName: "Patient Id", width: 220 },
    {
      field: "patientName",
      headerName: "Patient Name",
      width: 300,
    },
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 120,
    },
    {
      field: "orderdate",
      headerName: "Order Date",
      width: 220,
    },

    {
      field: "id",
      headerName: "patientUuid",
      width: 220,
      hide: true,
    },
    {
      field: "extraData",
      headerName: "extraData",
      width: 220,
      hide: true,
    },
  ];

  const rows1 = [
    { id: "1", orderId: "11146", date: "2021-11-11", sentFrom: "OPD" },
  ];
  const columns1 = [
    { field: "id", headerName: "Sl.No.", flex: 1 },
    {
      field: "orderId",
      headerName: "Order Id",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "sentFrom",
      headerName: "Sent From",
      flex: 1,
    },
  ];
  const handleOpen = (event) => {
    console.log(event.row);
    setShowListToOrder(true);
    setPatientData(event.row);
    // setshowDialog(true);
    // setCurrentRow(event.row);
    // console.log(event.row);
    // const getTestOrderDetails = await TestOrderDetails.TestOrderDetailsDataFunc(
    //   event.row.uuid,
    //   actualorderdate
    // );
    // console.log(getTestOrderDetails);
    // getTestOrderDetails.testOrderDetails.map((itembill) => {
    //   if (itembill["billableServiceDetails"].length > 0) {
    //     itembill.billableServiceDetails.map((itemsorder, index) => {
    //       setOrderRowDetails((prev) => [
    //         ...prev,
    //         {
    //           id: index + 1,
    //           orderId: itemsorder.opdOrderId,
    //           date: actualorderdate,
    //           sentFrom: "OPD",
    //         },
    //       ]);
    //     });
    //   }
    // });
  };
  const handleModalClose = () => {
    setshowDialog(false);
  };
  // const getRow=async (currentRow)=>{
  //   const getTestOrderDetails= await TestOrderDetails.TestOrderDetailsDataFunc(currentRow.uuid,actualorderdate);
  //   console.log(getTestOrderDetails);
  //   return orderrowdetails;
  // }

  if (showListToOrder) {
    return <ListtoOrder patientData={patientData} />;
  } else {
    return (
      <>
        <BillingNavbar></BillingNavbar>
        <VerticalTabComponent></VerticalTabComponent>
        {!currentRow && (
          <div mt={2}>
            <Typography variant="h5">Outdoor Patient Queue</Typography>
            <Card className={classes.root}>
              <CardHeader
                title="Get Queue"
                className={classes.title}
                titleTypographyProps={{ variant: "body1" }}
              />
              <CardContent>
                <form noValidate id="searchForm" onSubmit={submitHandler}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box flexGrow={0.5}>
                      <TextField
                        id="patientname"
                        name="patientname"
                        label="Search patient by name or ID"
                        variant="outlined"
                        className={classes.field}
                        onChange={handleChange}
                        // value={patientnameorid}
                        type="search"
                        error={formerrors["patientname"] ? true : false}
                        helperText={formerrors["patientname"]}
                        fullWidth
                        autoFocus
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className="fas fa-search" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Box flexGrow={0.4}>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                          fullWidth
                          name="orderdate"
                          style={{ marginTop: 8 }}
                          disableFuture
                          allowKeyboardControl
                          autoOk
                          inputVariant="outlined"
                          format="DD-MM-yyyy"
                          label="Date"
                          views={["year", "month", "date"]}
                          onChange={handleDateChange}
                          value={selectedDate}
                          className={classes.field}
                        />
                      </MuiPickersUtilsProvider>
                    </Box>
                    {/* <Box>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.field}
                        type="submit"
                      >
                        Get Patient
                      </Button>
                    </Box> */}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        <Paper style={{ marginTop: 4 }}>
          <DataGrid
            rows={filteredPatientList}
            loading={loading}
            disableColumnMenu
            columns={columns}
            autoHeight
            rowHeight={40}
            headerHeight={40}
            pageSize={5}
            // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            // rowsPerPageOptions={[5]}
            // pagination
            onCellClick={handleOpen}
            components={{
              LoadingOverlay: CustomLoadingOverlay,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
          />
        </Paper>

        {currentRow && (
          <div>
            <Typography variant="h4">List Of Orders</Typography>
            <Typography variant="body1"> Date : {currentRow.date} </Typography>
            <Typography variant="body1">PatientId: {currentRow.id}</Typography>
            <Typography variant="body1">Name: {currentRow.name}</Typography>
            <Typography variant="body1">Gender: {currentRow.gender}</Typography>
            <Typography variant="body1">Age: {currentRow.age}</Typography>
            <Typography variant="body1" style={{ marginBottom: "1rem" }}>
              Patient Category: Paying
            </Typography>
            <DataGrid
              rows={orderrowdetails}
              columns={columns1}
              autoHeight
              rowHeight={40}
              headerHeight={40}
              className={classes.table}
              components={{
                LoadingOverlay: CustomLoadingOverlay,
                NoRowsOverlay: CustomNoRowsOverlay,
              }}
            />
          </div>
          // <Dialog open={showDialog}  onClose={handleModalClose}  maxWidth="lg" fullWidth  >
          //   <DialogTitle>List Of Orders</DialogTitle>
          //   <DialogContent dividers>
          //     <DialogContentText>
          //     <Typography variant="body1" gutterBottom>
          //     <Typography variant="h5"> Date : {currentRow.date} </Typography>
          //     </Typography>
          //     <Typography variant="body1" gutterBottom>
          //     <Typography variant="h5">PatientId: {currentRow.id}</Typography>
          //     </Typography>
          //     <Typography variant="body1" gutterBottom>
          //     <Typography variant="h5">Name: {currentRow.name}</Typography>
          //     </Typography>
          //     <Typography variant="body1" gutterBottom>
          //     <Typography variant="h5">Gender: {currentRow.gender}</Typography>
          //     </Typography>
          //     <Typography variant="body1" gutterBottom>
          //     <Typography variant="h5">Age: {currentRow.age}</Typography>
          //     </Typography>
          //     <Typography variant="body1" gutterBottom>
          //     <Typography variant="h5">Patient Category: Paying</Typography>
          //     </Typography>
          //     <Typography variant="body1" gutterBottom>
          //     <Typography variant="h5">File No.</Typography>
          //     </Typography>

          //         <DataGrid
          //           rows={rows1}
          //           columns={columns1}
          //           autoHeight
          //           rowHeight={40}
          //           headerHeight={40}
          //           className={classes.table}
          //           pageSize={10}
          //           components={{
          //             LoadingOverlay: CustomLoadingOverlay,
          //             NoRowsOverlay: CustomNoRowsOverlay,
          //           }}

          //         />
          //     </DialogContentText>
          //   </DialogContent>
          // </Dialog>
        )}
      </>
    );
  }
}
