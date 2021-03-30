import React, { useState, useEffect } from "react";
import { getAPI } from "../../services";
import { DataGrid } from '@material-ui/data-grid';
import Container from "@material-ui/core/Container";
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import { Typography } from '@material-ui/core';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const col = [
  { field: 'id', headerName: 'PatientID', width: 130 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'gender', headerName: 'Gender', width: 130 },
  { field: 'age', headerName: 'Age', width: 160 },
  // { field: 'location', headerName: 'Location', width: 160 },
  // { field: 'visit', headerName: 'Visit Type', width: 160 },
  // { field: 'lastseen', headerName: 'Last Seen', width: 300 },
];



const patientData = [];


export default function DataGridDemo() {

  const [list, setList] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  useEffect(() => {
    const url = "/visit?includeInactive=false&v=custom:(uuid,display,patient:(uuid,display,person:(gender,age)),visitType:(display),location:(display),startDatetime,encounters:(display,encounterDatetime))";
    const requests = getAPI(url);
    requests.then(data => {

      if (data.status == '200') {

        for (let i = 0; i < data.data.results.length; i++) {
          let item = {};
          let id = data.data.results[i].patient.display.split("-")[0];
          let name = data.data.results[i].patient.display.split("-")[1];
          // let visitType = data.data.results[i].visitType.display;
          let gender = data.data.results[i].patient.person.gender;
          let age = data.data.results[i].patient.person.age;
          // let lastSeen;
          // if (data.data.results[i].encounters.length > 0) {
          //   let date = data.data.results[i].encounters[0].encounterDatetime.split("T")[0];
          //   let time = data.data.results[i].encounters[0].encounterDatetime.split("T")[1].substring(0, 5);
          //   lastSeen = date + " -- " + time
          //   // console.log(" -------",lastSeen)

          // }
          // else {
          //   lastSeen = "--";
          // }


          item = {
            'id': id,
            'name': name,
            // 'location':location,
            // 'lastseen': lastSeen,
            // 'visit': visitType,
            'gender': gender,
            'age': age
          }
          patientData.push(item)
        }

      }

      setList(patientData)


    })

  }, []);


  const searchOnKey = (event) => {
    let key = event.target.value;

    if (key.length >= 3) {

      let filteredList = list.filter((element) => {
        if
          (element.id.trim().indexOf(key) > -1 || element.name.trim().indexOf(key) > -1) {
          return element
        }
      })
      setList(filteredList)

    } else {
      setList(patientData)
    }

  }

  const handleOpen = () => {
    setOpen(true);
    let url = "/concept?q=Vital Signs&v=custom:(answers:(uuid,display,datatype:(display),answers:(uuid,display)))"
    const requests = getAPI(url);
    requests.then(data => {
      console.log("data+++++++++++++", data)

      // if (data.status == '200') {

      //   for (let i = 0; i < data.data.results.length; i++) {
      //     let item = {};
      //     let id = data.data.results[i].patient.display.split("-")[0];
      //     let name = data.data.results[i].patient.display.split("-")[1];
      //     let visitType = data.data.results[i].visitType.display;
      //     let gender = data.data.results[i].patient.person.gender;
      //     let age = data.data.results[i].patient.person.age;
      // let lastSeen;
      // if (data.data.results[i].encounters.length > 0) {
      //   let date = data.data.results[i].encounters[0].encounterDatetime.split("T")[0];
      //   let time = data.data.results[i].encounters[0].encounterDatetime.split("T")[1].substring(0, 5);
      //   lastSeen = date + " -- " + time
      //   // console.log(" -------",lastSeen)

      // }
      // else {
      //   lastSeen = "--";
      // }


      //       item = {
      //         'id': id,
      //         'name': name,
      //         // 'location':location,
      //         // 'lastseen': lastSeen,
      //         'visit': visitType,
      //         'gender': gender,
      //         'age': age
      //       }
      //       patientData.push(item)
      //     }

      //   }

      //   setList(patientData)


    })

  };

  const handleClose = () => {
    setOpen(false);
  };

  if (patientData.length > 0) {
    return (
      <div className={classes.root}>
        <Container component="main" maxWidth="lg">
          <div style={{ height: 500, width: '90%' }}>
            <form
              className={classes.root}
              noValidate
              autoComplete="off">
              <TextField
                label="Name/Id"
                id="value"
                variant="outlined"
                size="small"
                type="search"
                autoFocus
                onChange={(e) => searchOnKey(e)}
                value={classes.value}
                className="value"
              /> &nbsp; &nbsp;
            </form>
        &nbsp;
          <DataGrid
              onRowClick={handleOpen}
              rows={list} columns={col} pageSize={7}
            />
          </div>
          <div>
            <Dialog
            maxWidth="md"
            fullWidth="true" 
            open={open} 
            onClose={handleClose} 
            aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Patient Details</DialogTitle>
              <DialogContent>
                {/* <DialogContentText>
                
          </DialogContentText> */}
          <div>
                <TextField
                  autoFocus
                  variant="outlined"
                  id="name"
                  label="Weight"
                  type="Numeric"
                  rowsMax={4}
                  size="small"
                />
                </div> &nbsp;&nbsp;
                <div>
                 <TextField
                  autoFocus
                  variant="outlined"
                  id="name"
                  label="Height"
                  rowsMax={4}
                  type="Numeric"
                  size="small"
                /> &nbsp;
                </div>&nbsp;
                <div>
                <TextField
                  autoFocus
                  variant="outlined"
                  id="name"
                  rowsMax={4}
                  label="Temprature"
                  type="Numeric"
                  size="small"
                /></div>
                &nbsp;
                <div>
                <TextField
                  autoFocus
                  variant="outlined"
                  id="name"
                  rowsMax={4}
                  label="BMI"
                  type="Numeric"
                  size="small"
                />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
          </Button>
                <Button onClick={handleClose} color="primary">
                  Subscribe
          </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Container>

      </div>

    )

  }

  else {
    return 'Loading...';
  }

}