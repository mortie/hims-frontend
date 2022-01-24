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
  LinearProgress,
  CircularProgress,
  makeStyles,
  Paper, 
  Select,
  MenuItem,
  InputLabel,
  FormControl
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
  let [appointData, setAppointData]= useState([]);
  let [filterappointData, setFilterAppointData]= React.useState([]);
  const [visitAttributeTypes, setVisitAttributeTypes] = useState();
  const [visitId, setVisitId] = useState('');
  const [gender, setGender] = React.useState('');
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
    { field: 'uuid', hide: true },
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
        variant="contained" disabled
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
  
  setAppointData(appointData);
  document.getElementById("searchForm").reset();
}
  function searchOnKey(e){
   if(searchDetails["name"] !== ""){
    filterappointData = filterappointData.filter( function (appointment) {
      return appointment.name === searchDetails["name"];
    })
    setFilterAppointData(appointData)
   }
   if(searchDetails["phone"] !== ""){
    filterappointData = filterappointData.filter( function (appointment) {
      return appointment.phone === "91"+searchDetails["phone"];
    })
    setFilterAppointData(filterappointData)
   }
   if(searchDetails["age"] !== ""){
    filterappointData = filterappointData.filter( function (appointment) {
      return appointment.age === searchDetails["age"];
    })
    setFilterAppointData(filterappointData)
   }
   if(searchDetails["gender"] !== ""){
    filterappointData = filterappointData.filter( function (appointment) {
      return appointment.gender === searchDetails["gender"];
    })
    setFilterAppointData(filterappointData)
   }
   else{
    setFilterAppointData(filterappointData);
   }
  }
 const getAppointmentData = async() => {
  await getOnlineAPI(
    `/onlineappointment/onlineAppointments?&frdate=${fromDate.toISOString()}&todate=${toDate.toISOString()}`
      )
    .then((response) => {
     response.data.appointments = response.data.appointments.filter( function (appointment) {
        return appointment.district_name === District_Dropdown;
      })
      const appointList = createAppointmentList(response.data.appointments);
        setFilterAppointData(appointList);
        setAppointData(appointList);
        setLoading(false);
    })
 }

  const handleClick = (event, data) => {
   if(event.target.innerHTML !== "Arrived"){
   
    const patientId = data.row.uuid;

    let visit = {
      visitType: "7b0f5697-27e3-40c4-8bae-f4049abfb4ed",
    };
    
    const getVisitAttrs = async(data) =>{
      console.log(data);
      if(data.length === 1){
        setVisitId(data[0].uuid);
      }else{
        await data.map((result) => {
          console.log(result);
           getAPI("/visit/"+result.uuid)
          .then((resp) => {
            if(resp.data.attributes.length > 0)
            {
              console.log(resp.data);
              setVisitId(result.uuid);
            }
          })
        })
      }
    return visitId;
    };
    
    getAPI("/onlineappointment/onlinePatientVisits?patientId="+patientId)
    .then((response) => {
      let visits = response.data.visits;
      getVisitAttrs(visits);
      getAPI("/visit/"+visitId)
        .then((resp) => {          
          let attributes =[];
          attributes = resp.data.attributes;
          console.log(attributes);
         visit.attributes = attributes;
          visit.patient = data.row.uuid;
          visit.location = resp.data.location.uuid;          
          postAPI("/visit", visit)
            .then((visitResponse) => {
              console.log(visitResponse);
              statusAppointment( data.row.appointmentId,"CONFIRM");
              getAppointmentData();
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
   getAppointmentData();
  },[]);

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
              
            <GridItem item xs={12} sm={6} md={3}>
            
                <FormControl fullWidth variant="outlined" >
                  <InputLabel id="select-gender">Gender</InputLabel>
                  <Select
                          labelId="select-gender"
                          variant="outlined"
                          fullWidth
                          margin="dense"
                          className={classes.field}
                          onChange={(e) => keyUpFun(e, "clicked")}
                          >
                            <MenuItem value="M">Male</MenuItem>
                            <MenuItem value="F">Female</MenuItem>
                          </Select>
                          </FormControl>
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

      
      <DataGrid
          loading={loading}
          rows={filterappointData}
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
