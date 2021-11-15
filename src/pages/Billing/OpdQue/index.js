import React,{useState} from 'react';
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
  DialogContentText
} from '@material-ui/core/';
import { DataGrid } from "@material-ui/data-grid";
import styles from "./styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

 const dateval=new Date().toLocaleDateString("fr-CA");

export default function OpdQue() {
     const classes = useStyles();
     const [patientname,setPatientname]=useState("");
     const [datasubmitted,setDataSubmitted]=useState(false);
     const [currentRow,setCurrentRow]=useState(null);
     const [showDialog,setshowDialog]=useState(false);
     const [orderdate,setorderdate]=useState(new Date().toLocaleDateString("en-IN"));
  
     const changeEventHandlerPatientName=(e)=>{
      setPatientname(e.target.value);
     }
     const changeEventHandlerOrderDate=(e)=>{
       console.log(e.target.value);
      setorderdate(new Date(e.target.value).toLocaleDateString("en-IN"));
     }
     const submitHandler=(e)=>{
      e.preventDefault();
      setDataSubmitted(true);
      const getpatientinfo={
        patientDetails :patientname,
        bookingDate:orderdate
      }
      setPatientname("");
      console.log(getpatientinfo);
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
        id="firstnameopdque" 
        name="lpn"
        label="Name/Patient-Id" 
        variant="outlined"
        className={classes.field}
        onChange={changeEventHandlerPatientName}
        value={patientname}
        fullWidth
        autoFocus
        />
      </Box>
       <Box  flexGrow={0.4}>
        <TextField
            variant="outlined"
            label="Date"
            type="date"
            margin="dense"
            name="lvd"
            id="lvd"
            defaultValue={dateval}
            onChange={changeEventHandlerOrderDate}
            maxDate={new Date()}
            InputLabelProps={{
            shrink: true,
            }}
            className={classes.field}
            fullWidth
        />
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
    {datasubmitted && 
    <DataGrid
      rows={rows}
      disableColumnMenu
      columns={columns}
      autoHeight
      rowHeight={40}
      headerHeight={40}
      pageSize={10}
      onCellClick={handleOpen}
      
     />
        }
        {currentRow && ( 
        <Dialog open={showDialog}  onClose={handleModalClose}  maxWidth="lg" fullWidth >
          <DialogTitle>List Of Orders</DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
            <Typography variant="body1" gutterBottom>
            <Typography variant="h5"> Date : {orderdate} </Typography>
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
                  pageSize={5}
                  autoHeight
                  rowHeight={40}
                  headerHeight={40}
                  className={classes.table}
                 
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
