import React, { useState } from "react";
import { GridOverlay, DataGrid } from "@material-ui/data-grid";
import { getAPI } from "../../services/index";
import {  postAPI,statusAppointment } from "../../services/index";
import { Alert } from "@material-ui/lab";
import clsx from "clsx";
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
  

function searchOnKey(){
    
}


export default function InfiniteLoadingGrid() {
  var [searchData, setsearchData] = useState([]);
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [btnValue, setBtnValue]= React.useState('Check In');
  let [appointData, setAppointData]= React.useState([]);
  const [visitAttributeTypes, setVisitAttributeTypes] = useState();
  const [visits, setVisits] = useState([]);
  
  const fromDate = new Date();
    const toDate = new Date(
      fromDate.getFullYear(),
      fromDate.getMonth(),
      (fromDate.getDate()+2),
      23,
      59,
      59
    );
    
  const columns = [
    { field: 'uuid',headerName: 'Uid', hide: true },
    { field: 'hospitalId', hide: true },
    { field: 'appointmentId', hide: true },
    { field: 'appointmentStatus', hide: true },
    { field: "id", headerName: "No.", width: 120 },
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
        if(cellValues.row.appointmentStatus != "BOOKED"){
          return "ARRIVED";
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
 

  
  const handleClick = (event, data) => {

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

    
getAPI("/onlineappointment/onlinePatientVisits?patientId="+patientId)
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
          })
      })
      
    })
    .catch((error) => {
      console.log(error);
    });
    
    event.target.text = "Arrived";    
    return ;
  };

  
  React.useEffect(() => {
   setLoading(true);
    getAPI(
      `/onlineappointment/onlineAppointments?&frdate=${fromDate.toISOString()}&todate=${toDate.toISOString()}&v=default`
    )
      .then((response) => {
        var res = response.data;
        
        let rows = [];
          for (let i = 0; i < res.appointments.length; i++) { 
            let rObj = {}
            rObj["id"] = (i+1);
            rObj["uuid"] = res.appointments[i].patient_id;
            rObj["appointmentId"] = res.appointments[i].appointment_id;
            rObj["appointmentStatus"] = res.appointments[i].appointment_status;
            rObj["hospitalId"] = res.appointments[i].hospital_appointment_id;
            rObj["name"] = res.appointments[i].patient_name;
            rObj["phone"] = res.appointments[i].patient_mobile;
            rObj["gender"] = res.appointments[i].patient_gender;
            rObj["age"] = res.appointments[i].patient_age;
            rObj["district"]= res.appointments[i].district_name;
            rObj["hospital"]= res.appointments[i].hospital_name;
            rObj["appointmentTime"] = new Date(res.appointments[i].appointment_date).toLocaleTimeString();
            
            rows.push(rObj);
          }
          
          setLoading(false);
        setsearchData(rows);
      })
      .catch((error) => {
       
        console.log(error);
      });
   
      
  },[]);

  return (
    <>
    <Paper className={classes.paper}>
        <form noValidate id="searchForm">
          <GridContainer>
            <GridItem item xs={12} sm={6} md={3}>
              <TextField
                
                name="firstName"
                variant="outlined"
                margin="dense"
                required
                fullWidth
                type="text"
                id="firstName"
                label="Name"
                autoFocus
                onKeyUp={(e) => searchOnKey(e, "firstName", "press")}
                className={classes.field}
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
                onKeyUp={(e) => searchOnKey(e, "phone", "press")}
                value={classes.phone}
                type="number"
                className={classes.field}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
              />
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
              <TextField
               
                variant="outlined"
                fullWidth
                margin="dense"
                required
                id="identifier"
                label="Identifier"
                name="identifier"
                autoComplete="lname"
                onKeyUp={(e) => searchOnKey(e, "identifier", "press")}
                value={classes.identifier}
                className={classes.field}
              />
            </GridItem>
           
            <GridItem item xs={12} sm={6} md={3}>
              <GridContainer>
                <GridItem item xs={12} sm={6} md={6}>
                  <TextField
                    id="standard-number"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    label="Age"
                    type="number"
                    className={classes.field}
                    onKeyUp={(e) => searchOnKey(e, "age", "press")}
                  />
                </GridItem>               
              </GridContainer>
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  style={{ marginBottom: "0px", fontSize: "12px" }}
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  value=""
                  onChange={(e) => searchOnKey(e, "gender", "press")}
                  row
                >
                  <FormControlLabel
                    value="F"
                    control={<Radio style={{ paddingRight: "2px" }} />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="M"
                    control={<Radio style={{ padding: "2px" }} />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="O"
                    control={<Radio style={{ padding: "2px" }} />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="primary"
                //onClick={(e) => searchOnKey(e, { searchDetails }, "clicked")}
                className={clsx(classes.button, classes.field)}
              >
                Search
              </Button>
              <Button
                variant="contained"
                //onClick={(e) => resetOnKey(e, { searchDetails }, "clicked")}
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
          rows={searchData}
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
