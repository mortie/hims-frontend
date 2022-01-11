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
import {PatientSearchData,TestOrderDetails} from "../../../services/data"
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
     const [loading, setLoading] = useState(true);

     const [filteredPatientList, setFilteredPatientList] = useState([]);
    const [patientnameorid,setPatientnameorid]=React.useState("");
    const [orderrowdetails, setOrderRowDetails] = useState([]);
    const [countrow,setCountRow]=useState(0);
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
      // if(!value)
      // {
      //   setformErrors({"patientname":"Name or Id is required"});
      // }
      // if(value.length < 1)
      // {
      //   setformErrors({"patientname":"Name or Id is required"});
      // }
      // else{
      //   const errors = formerrors;
      //   delete errors[name];
      //   setformErrors(errors);
      // }
       setPatientnameorid(e.target.value);
     }
    
    
    const handleDateChange = (date) => {
      setActualOrderdate(moment(date["_d"]).format('DD-MM-YYYY'));
        setSelectedDate(date);
    };
     
     const submitHandler= async (e)=>{
      e.preventDefault();
      setDataSubmitted(true);
      const orderinfo={
        patientNameorId:patientnameorid,
        orderDate:actualorderdate
      }
     if(orderinfo.patientNameorId !=='' && orderinfo.orderDate !=='')
     {
      const getPatientSearchResultData= await PatientSearchData.PatientSearchDataFunc(orderinfo.patientNameorId);
      console.log(getPatientSearchResultData);
      if(getPatientSearchResultData !== null)
      {
        const hetdata=getPatientSearchResultData.map(async (item,index)=>{
          const getTestOrderDetails= await TestOrderDetails.TestOrderDetailsDataFunc(item.uuid,orderinfo.orderDate);
          if(getTestOrderDetails !== null)
          {
           
             if(getTestOrderDetails["testOrderDetails"].length >0)
             {
              console.log(getTestOrderDetails);
              setLoading(false);
             setFilteredPatientList((prev)=>[...prev,{
                  id:item.identifier,
                  name:item.name,
                  age:item.age,
                  gender:item.gender,
                  date:orderinfo.orderDate,
                  uuid:item.uuid
             }]);
            
            //  getTestOrderDetails.testOrderDetails.map((itembill)=>{
            //   if(itembill["billableServiceDetails"].length > 0)
            //   {
                
            //     itembill.billableServiceDetails.map((itemsorder,index)=>{
            //       setOrderRowDetails((orderrowdetails=[])=>[...orderrowdetails,{
            //         "id":index+1,
            //         "orderId":itemsorder.opdOrderId,
            //         "date":orderinfo.orderDate,
            //         "sentFrom":"OPD"
            //        }]);
            //     })
            //   }
            //  })
           
             }
             else{
              setLoading(false);
              setFilteredPatientList([]);
             }
          }
          else{
            console.log("error")
          }
        });
      }
      else{
        setLoading(false);
        setFilteredPatientList([]);
      }
     }
     else{
      const getDateOrders= await TestOrderDetails.TestOnlySelectDateFunc(orderinfo.orderDate);
      console.log(getDateOrders);
      
     }
     }
     const columns = [
      { field: "id", headerName: "Patiend ID",width: 125 },
      { field: "name", headerName: "Name",width: 220 },
      {
        field: "gender",
        headerName: "Gender",
        width: 160
      },
      {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 160
      },
      {
        field: "date",
        headerName: "Date",
        hide: true 
      },
      { field: "uuid", headerName: "uuid"}
    ];
    
    const rows1 = [
      {id: "1", orderId : "11146", date:"2021-11-11", sentFrom:"OPD"} 
    
    ];
    const columns1 = [
      { field: "id", headerName: "Sl.No.",flex:1},
      { 
        field: "orderId", 
        headerName: "Order Id",flex:1},
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
    const handleOpen=async(event)=>{
      setshowDialog(true);
      setCurrentRow(event.row);
      console.log(event.row);
      const getTestOrderDetails= await TestOrderDetails.TestOrderDetailsDataFunc(event.row.uuid,actualorderdate);
      console.log(getTestOrderDetails);
      getTestOrderDetails.testOrderDetails.map((itembill)=>{
        if(itembill["billableServiceDetails"].length > 0)
        {
          itembill.billableServiceDetails.map((itemsorder,index)=>{
            setOrderRowDetails((prev)=>[...prev,{
              id:index+1,
              orderId:itemsorder.opdOrderId,
              date:actualorderdate,
              sentFrom:"OPD"
             }]);
          })
        }
       })
    }
    const handleModalClose = () => {
      setshowDialog(false);
    };
  // const getRow=async (currentRow)=>{
  //   const getTestOrderDetails= await TestOrderDetails.TestOrderDetailsDataFunc(currentRow.uuid,actualorderdate);
  //   console.log(getTestOrderDetails);
  //   return orderrowdetails;
  // }
    
    return (
      <>
      {!currentRow && 
      <div>
      <Typography variant="h6">OPD Queue</Typography>
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
        // InputProps={{
        //   readOnly: datasubmitted,
        // }}
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
         
          >
        Get Patient
        </Button>
      </Box>
      </div>
      </form>
      </div>
  }
    {datasubmitted && !currentRow &&
    <DataGrid
      rows={filteredPatientList}
      loading={loading}
      disableColumnMenu
      columns={columns}
      autoHeight
      rowHeight={40}
      headerHeight={40}
      pageSize={10}
      onCellClick={handleOpen}
      components={{
        LoadingOverlay: CustomLoadingOverlay,
        NoRowsOverlay: CustomNoRowsOverlay,
      }}
     />
    }
        {currentRow && ( 
          <div>
          <Typography variant="h4">List Of Orders</Typography>
           <Typography variant="body1"> Date : {currentRow.date} </Typography>
              <Typography variant="body1">PatientId: {currentRow.id}</Typography>
              <Typography variant="body1">Name: {currentRow.name}</Typography>
              <Typography variant="body1">Gender: {currentRow.gender}</Typography>
              <Typography variant="body1">Age: {currentRow.age}</Typography>
              <Typography variant="body1" style={{marginBottom:"1rem"}}>Patient Category: Paying</Typography>
                <DataGrid
                  rows={orderrowdetails}
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
