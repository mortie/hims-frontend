import React, { useState } from "react";
import { GridOverlay, DataGrid } from "@material-ui/data-grid";
import { getAPI,getOnlineAPI } from "../../services/index";
import {  postAPI,statusAppointment } from "../../services/index";
import { Alert } from "@material-ui/lab";
import clsx from "clsx";
import {District_Dropdown} from "../../utils/constants"
import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  CircularProgress,
  InputLabel,
  makeStyles,
  Paper,
  Select,
  FormLabel,
  MenuItem,
} from "@material-ui/core/";
import { GridContainer, GridItem } from "../../components/Grid";
import styles from "./styles";
import "./styles.css";

const useStyles = makeStyles(styles);

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
  




export default function InfiniteLoadingGrid() {
  
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [btnValue, setBtnValue]= React.useState('Check In');
  let [appointData, setAppointData]= React.useState([]);
  let [filterappointData, setFilterAppointData]= React.useState([]);
  const [visitAttributeTypes, setVisitAttributeTypes] = useState();
  const [visits, setVisits] = useState([]);
  var [searchDetails, setsearchDetails] = useState({
    phone: "",
    name: "",
    age: "",
    gender: "",
  });
  
  const date = new Date();
  const fromDate = new Date(
    date.getFullYear(),
      date.getMonth(),
      (date.getDate()+1)
  );
    const toDate = new Date(
      fromDate.getFullYear(),
      fromDate.getMonth(),
      (fromDate.getDate()+1)
    );
    
  const columns = [
    { field: 'uuid',headerName: 'Uid', hide: true },
    { field: 'hospitalId', hide: true },
    { field: 'appointmentId', hide: true },
    { field: 'appointmentStatus', hide: true },
    { field: "id", headerName: "No.", width: 90 },
    { field: "name", headerName: "Name", width: 120 },
    { field: "phone", headerName: "Phone", width: 120 },
    {
      field: "gender",
      headerName: "Gender",
      width: 120,
    },
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "district",
      headerName: "District",
      width: 120,
    },
    {
      field: "hospital",
      headerName: "Hospital",
      width: 160,
    },
    {
      field: "appointmentTime",
      headerName: "Time",
      type: "date",
      width: 120,
    },
    {
      field: "checkin",
      headerName: "Check In",
      type: "string",
      width: 120,
      renderCell: (cellValues) => {  
        if(cellValues.row.appointmentStatus !== "BOOKED"){
          return <Button
        variant="contained"
      >
       Arrived
      </Button>
        }else{
             return <Button
        variant="contained"
        onClick={(event) => {
          handleClick(event, cellValues);
        }}
      >
       {btnValue}
      </Button>;
        }      
       
    },
  }
  ];
 
function keyUpFun(e){

  searchDetails[e.target.id] = e.target.value;
}

function resetOnKey(e){
  
  setAppointData(filterappointData);
  document.getElementById("searchForm").reset();
}
  function searchOnKey(e){
   if(searchDetails["name"] !== ""){
    appointData = appointData.filter( function (appointment) {
      return appointment.name === searchDetails["name"];
    })
    setAppointData(appointData)
   }
   if(searchDetails["phone"] !== ""){
    appointData = appointData.filter( function (appointment) {
      return appointment.phone === "91"+searchDetails["phone"];
    })
    setAppointData(appointData)
   }
   if(searchDetails["age"] !== ""){
    appointData = appointData.filter( function (appointment) {
      return appointment.age === searchDetails["age"];
    })
    setAppointData(appointData)
   }
   else{
    setAppointData(filterappointData);
   }
  
  }
  const handleClick = (event, data) => {
   if(event.target.innerHTML !== "Arrived"){
    let visitattributes = [
      {uuid: "724ce4fd-4908-4562-831e-c33d7a469539", display: "Patient Category*: Paid category*"},
      {uuid: "d70434d4-5f55-4e82-9903-41de9454049c", display: "Paid category*: General Category*"},
      {uuid: "026578f3-750d-4910-889f-c0c1190d1ce3", display: "Cash: 785.0"},
      {uuid: "c52cec47-b03f-4795-9465-a26ad00fdc81", display: "Medico Legal Case*: MLC No"}
    ];
    const patientId = data.row.uuid;

    let visit = {
      visitType: "7b0f5697-27e3-40c4-8bae-f4049abfb4ed",
    };

    
    getOnlineAPI("/onlineappointment/onlinePatientVisits?patientId="+patientId)
    .then((response) => {
      let visits = response.data.visits;
      let firstVisitId = visits[visits.length-1].uuid;
      getAPI("/visit/"+firstVisitId)
        .then((resp) => {
          console.log(resp.data.attributes);
          let attributes =[];
          attributes = resp.data.attributes.length > 0? resp.data.attributes : visitattributes;
          console.log(attributes);
         visit.attributes = attributes;
          visit.patient = data.row.uuid;
          visit.location = resp.data.location.uuid
          statusAppointment( data.row.appointmentId,"CONFIRM");
          postAPI("/visit", visit)
            .then((visitResponse) => {
              console.log(visitResponse);
              //event.target.style.pointerEvents = "none";
              event.target.innerHTML = "Arrived";
          })
      })
      
    })
    .catch((error) => {
      console.log(error);
    });
  } 
    return ;
  };
  const createAppointmentList = (results) => {
    const patientList = results.map((result,index) => {
   
      return {
        id: index+1,        
        uuid: result.patient_id,
        appointmentId:result.appointment_id,
        appointmentStatus: result.appointment_status,
        hospitalId:result.hospital_appointment_id,
        name:result.patient_name,
        phone: result.patient_mobile,
        gender:result.patient_gender,
        age:result.patient_age,
        district:result.district_name,
        hospital:result.hospital_name,
        appointmentTime: new Date(result.appointment_date).toLocaleTimeString(),
      };
    });
  
    return patientList;
  };
 
  React.useEffect(() => {
   setLoading(true); 
   
   getOnlineAPI(
    `/onlineappointment/onlineAppointments?&frdate=${fromDate.toISOString()}&todate=${toDate.toISOString()}`
      )
    .then((response) => {
      console.log(response.data.appointments)
      response.data.appointments = response.data.appointments.filter( function (appointment) {
        return appointment.appointment_status === "BOOKED";
      })
      response.data.appointments = response.data.appointments.filter( function (appointment) {
        return appointment.district_name === District_Dropdown;
      })
      const appointList = createAppointmentList(response.data.appointments);
        setFilterAppointData(appointList);
        setAppointData(appointList);
        setLoading(false);
      
    })
    .catch((error) => {
     
      console.log(error);
    });
   
  },[false]);

  return (
    <>
    <Paper className={classes.paper}>
        <form noValidate id="searchForm" >
          <GridContainer>
            <GridItem item xs={12} sm={6} md={3}>
              <TextField                
                name={searchDetails["name"]}
                variant="outlined"
                margin="dense"
                required
                fullWidth
                type="text"
                id="name"
                label="Name"
                className={classes.field}
                onKeyUp={(e) => keyUpFun(e, "clicked")}
              />
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                margin="dense"
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                value={classes.phone}
                type="number"
                className={classes.field}
                onKeyUp={(e) => keyUpFun(e, "clicked")}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
              />
            </GridItem>
            
           
            <GridItem item xs={12} sm={6} md={3}>
              <GridContainer>
                <GridItem item xs={12} sm={6} md={6}>
                  <TextField
                    id="age"
                    name= "age"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    label="Age"
                    type="number"
                    onKeyUp={(e) => keyUpFun(e, "clicked")}
                    className={classes.field}
                  />
                </GridItem>               
              </GridContainer>
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
             
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="primary"
                className={clsx(classes.button, classes.field)}
                onClick={(e) => searchOnKey(e, "clicked")}
              >
                Search
              </Button>
              <Button
                variant="contained"
                onClick={(e) => resetOnKey(e, { searchDetails }, "clicked")}
                className={classes.field}
              >
                Reset
              </Button>
            </GridItem>
          </GridContainer>
        </form>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}

      </Paper>
      <Paper style={{ marginTop: "2vh" }}>
      <DataGrid
          loading={loading}
          rows={appointData}
          columns={columns} 
          disableColumnMenu
          autoHeight
          rowHeight={40}
          headerHeight={40}
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
