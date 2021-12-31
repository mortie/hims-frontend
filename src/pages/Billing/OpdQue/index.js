import React,{useState,useEffect} from 'react';
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
  LinearProgress
} from '@material-ui/core/';
import { DataGrid ,  GridOverlay } from "@material-ui/data-grid";
import styles from "./styles";
import { Alert, Autocomplete } from "@material-ui/lab";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { getAPI, postAPI,getPatientSearch } from "../../../services";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const useStyles = makeStyles(styles);
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows3 = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

  export default function OpdQue() {
     const classes = useStyles();
     //const [patientname,setPatientname]=useState("");
     const [datasubmitted,setDataSubmitted]=useState(false);
     const [currentRow,setCurrentRow]=useState(null);
     const [showDialog,setshowDialog]=useState(false);
     const [selectedDate, setSelectedDate] = React.useState(new Date());
     const [actualorderdate,setActualOrderdate]= React.useState(moment().format('DD-MM-YYYY'));
     const [formerrors,setformErrors]=React.useState({});
     const [loading, setLoading] = useState(false);
     const [filteredPatientList, setFilteredPatientList] = useState([]);
    const [patientnameorid,setPatientnameorid]=React.useState("");
    useEffect(() => {
      setLoading(true);
      const url =
        "/procedureinvestigationorder/patient";
      getAPI(url).then((response) => {
         const patientList = response.data.testOrderDetails;
        patientList.map((item)=>{
          const patientId="1bb427fe-0a0a-4a1a-a145-38656e232845";
        })
        setLoading(false);
        console.log(response.data.testOrderDetails);
      });
    }, []);
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
     const handleChange=(e)=>{
       const {name,value}=e.target;
       console.log(value);
      //   setFormValues({...formValues,[name]:value});
      if(!value)
      {
        setformErrors({"patientname":"Name or Id is required"});
      }
      else{
        const errors = formerrors;
        delete errors[name];
        setformErrors(errors);
      }
       setPatientnameorid(e.target.value);
     }
    
    
    const handleDateChange = (date) => {
      setActualOrderdate(moment(date["_d"]).format('DD-MM-YYYY'));
        setSelectedDate(date);
    };
  
     const submitHandler=(e)=>{
      e.preventDefault();
      setDataSubmitted(true);
      const getpatientinfo={
        patientNameorId:patientnameorid,
        orderDate:actualorderdate
      }
      const getPatientSearchdata= async ()=>{
        const url="/patient_search?name="+getpatientinfo.patientNameorId;
        try{
        const data= await getPatientSearch(url);
        return data;
        }
        catch(err)
        {
          return null;
        }
      }
      const getPatientdata=getPatientSearchdata();
      console.log(getPatientdata);   
      getPatientdata.map(async (item)=>{
          const url="/procedureinvestigationorder/patient";
          const passuid=await getAPI(url);
          if(passuid)
          {

          }
      })
     }
     const columns = [
      { field: "id", headerName: "S.No" },
      { field: "patientid", headerName: "Patiend ID",flex:1 },
      { field: "name", headerName: "Name",flex:1},
      {
        field: "gender",
        headerName: "Gender",
        flex:1
        
      },
      {
        field: "age",
        headerName: "Age",
        type: "number"
       
      }
    ];
    const rows = [
      {id:"1",patientid: "101", name : "subham",gender: 'M',  age: 18},
      {id:"2",patientid: "201",  name : "Subham",gender: 'F', age: 20},
      {id:"3",patientid: "301",  name : "Subham",gender: 'F', age: 20}
    
    ];
    const rows1 = [
      {id: "1", orderId : "11146", date:"2021-11-11", sentFrom:"OPD"} 
    
    ];
    const columns1 = [
      { field: "id", headerName: "Sl.No."},
      { field: "orderId", headerName: "Order Id",flex:1},
      {
        field: "date",
        headerName: "Date",
        flex:1,
      },
      {
        field: "sentFrom",
        headerName: "Sent From",
        flex:1,
      }
      
      
    ];
    const handleOpen=(event)=>{
      setshowDialog(true);
      setCurrentRow(event.row);
      //setDataSubmitted(false);
    }
    const handleModalClose = () => {
      setshowDialog(false);
    };
  
    
    return (
      <>
      <form noValidate id="searchForm" onSubmit={submitHandler}>
      <div style={{ width: '100%',display: 'flex' ,flexWrap: 'wrap',justifyContent :'space-between',alignItems:'center'}}>
      <Box flexGrow={0.4}>
       <TextField 
        id="patientname" 
        name="patientname"
        label="Name" 
        variant="outlined"
        className={classes.field}
        onChange={handleChange}
        value={patientnameorid}
        error={formerrors["patientname"] ? true :false}
        helperText={formerrors["patientname"]}
        fullWidth
        autoFocus
        />
      </Box>
       <Box  flexGrow={0.4}>
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
      <Box>
        <Button
            variant="contained"
            color="primary"
            className={classes.field}
            type="submit"
            disabled={
              Object.keys(formerrors).length > 0 || patientnameorid===""
            }
          >
        Get Patient
        </Button>
      </Box>
      </div>
      </form>

    {/* <DataGrid
      rows={rows}
      loading={loading}
      disableColumnMenu
      columns={columns}
      autoHeight
      rowHeight={40}
      headerHeight={40}
      pageSize={10}
      onCellClick={handleOpen}
      
     /> */}
        
        {currentRow && ( 
        <Dialog open={showDialog}  onClose={handleModalClose}  maxWidth="lg" fullWidth  >
          <DialogTitle>List Of Orders</DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
            <Typography variant="body1" gutterBottom>
            {/* <Typography variant="h5"> Date : {orderdate} </Typography> */}
            </Typography>
            <Typography variant="body1" gutterBottom>
            <Typography variant="h5">PatientId: {currentRow.patientid}</Typography>
            </Typography>
            <Typography variant="body1" gutterBottom>
            <Typography variant="h5">Name: {currentRow.name}</Typography>
            </Typography>
            <Typography variant="body1" gutterBottom>
            <Typography variant="h5">Gender: {currentRow.gender}</Typography>
            </Typography>
            <Typography variant="body1" gutterBottom>
            <Typography variant="h5">Age: {currentRow.age}</Typography>
            </Typography>
            <Typography variant="body1" gutterBottom>
            <Typography variant="h5">Payment Category: Paying</Typography>
            </Typography>
            <Typography variant="body1" gutterBottom>
            <Typography variant="h5">File No.</Typography>
            </Typography>
        
                <DataGrid
                  rows={rows1}
                  columns={columns1}
                  autoHeight
                  rowHeight={40}
                  headerHeight={40}
                  className={classes.table}
                  pageSize={10}
                  components={{
                    LoadingOverlay: CustomLoadingOverlay,
                    NoRowsOverlay: CustomNoRowsOverlay,
                  }}
                 
                />
            {/* <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{rows3.calories}</TableCell>
              <TableCell align="right">{rows3.fat}</TableCell>
              <TableCell align="right">{rows3.carbs}</TableCell>
              <TableCell align="right">{rows3.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
            </DialogContentText>
          </DialogContent>
          {/* <DialogActions></DialogActions> */}
        </Dialog>)}
       
    </>
    );
}
