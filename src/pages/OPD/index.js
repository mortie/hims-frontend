import React, { useState, useEffect } from "react";
import { getAPI } from "../../services";
import { DataGrid } from "@material-ui/data-grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { GridContainer, GridItem } from "../../components/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ControlledAccordions from "./patient_history";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    minWidth: 120,
    maxWidth: 300,
  },
  root: {
    flexGrow: 1,
  },
}));

const col = [
  { field: "id", headerName: "PatientID", width: 130 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "gender", headerName: "Gender", width: 130 },
  { field: "age", headerName: "Age", width: 160 },
  // { field: 'location', headerName: 'Location', width: 160 },
  // { field: 'visit', headerName: 'Visit Type', width: 160 },
  // { field: 'lastseen', headerName: 'Last Seen', width: 300 },
  {
    field: "Triage",
    headerName: "Triage",
    type: "string",
    width: 130,
    renderCell: (params) => (
      <Button
        // onClick = {handleOpen}
        variant="contained"
        color="primary"
      >
        Triage
      </Button>
    ),
  },

  {
    field: "History",
    headerName: "History",
    type: "string",
    width: 130,
    renderCell: (params) => (
      <Button variant="contained" color="primary">
        History
      </Button>
    ),
  },
];

const patientData = [];

export default function DataGridDemo() {
  const [list, setList] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fields, setFields] = React.useState([]);
  const [historyfields, setHistoryfields] = React.useState([]);
  const [showhistory, setShowhistory] = React.useState(false);
  const [selectValue, setValues] = React.useState([]);
  const [gender, setGender] = React.useState("");
  const [id, setIdValue] = React.useState("");

  const [state, setState] = useState({
    height: {
      uuid: "uuid",
      value: 45,
    },
  });

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const url =
      "/visit?includeInactive=false&v=custom:(uuid,display,patient:(uuid,display,person:(gender,age)),visitType:(display),location:(display),startDatetime,encounters:(display,encounterDatetime))";
    const requests = getAPI(url);
    requests.then((data) => {
      if (data.status == "200") {
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
            id: id,
            name: name,
            // 'location':location,
            // 'lastseen': lastSeen,
            // 'visit': visitType,
            gender: gender,
            age: age,
          };
          patientData.push(item);
        }
      }

      setList(patientData);
    });

    let url1 =
      "/concept?q=Vital Signs&v=custom:(answers:(uuid,display,datatype:(display),answers:(uuid,display)))";
    getAPI(url1)
      .then((response) => {
        setFields(response.data.results[0].answers);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let patient_history_url = `/concept?q=Patient History&v=custom:(answers:(display,answers:(uuid,display,datatype:(display),synonyms:(display),answers:(uuid,display,datatype:(display),answers:(uuid,display,datatype:(display),answers:(uuid,display,datatype:(display)))))`;
    getAPI(patient_history_url)
      .then((response) => {
        setHistoryfields(response.data.results[0].answers);
      })
      .catch((error) => console.log(error));
  }, []);

  const onChange = (event, key) => {
    console.log("target", event.target.value);
    console.log("label", key);
  };

  const getFeilds = () => {
    console.log("Date ", selectedDate);
    return (
      <>
        {" "}
        {fields.map((field) => {
          const { uuid, display, datatype, answers } = field;
          // console.log("field", field);
          if (datatype.display === "Coded") {
            let item = [];
            for (let i = 0; i < answers.length; i++) {
              let valueWithKey = { uuid: uuid, display: answers[i].display };
              // item.push(answers[i].display);
              item.push(valueWithKey);
            }
            // console.log("coded item ", item);
            return (
              <GridItem item xs={12} sm={4} md={4} key={uuid}>
                <FormControl className={classes.formControl}>
                  <TextField
                    style={{ width: 228 }}
                    autoFocus
                    multiline="true"
                    select
                    variant="outlined"
                    id={uuid}
                    label={display}
                    rowsMax={4}
                    onChange={(e) => onChange(e, uuid)}
                    // onChange={getValue}
                  >
                    {item.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name.display}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                {display === "height" && <h1></h1>}
              </GridItem>
            );
          }

          if (datatype.display === "Numeric") {
            return (
              <GridItem item xs={12} sm={4} md={4} key={uuid}>
                <FormControl className={classes.formControl}>
                  <TextField
                    autoFocus
                    variant="outlined"
                    id={uuid}
                    label={display}
                    type="Numeric"
                    rowsMax={4}
                    className={classes.textField}
                    size="small"
                    onChange={(e) => onChange(e, uuid)}
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    // onChange={getValue}
                  />
                </FormControl>
              </GridItem>
            );
          }
          if (gender === "F") {
            return (
              <GridItem item xs={12} sm={4} md={4} key={uuid}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="date"
                    variant="outlined"
                    label={display}
                    margin="normal"
                    // onChange={getValue}
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    maxDate={new Date()}
                    onChange={(e) => onChange(e, uuid)}
                  />
                </FormControl>
              </GridItem>
            );
          }
        })}
      </>
    );
  };

  // const onChange = (event) => {
  //   selectValue.push(event.target.value);
  //   console.log(selectValue);
  // };

  const searchOnKey = (event) => {
    let key = event.target.value;

    if (key.length >= 3) {
      let filteredList = list.filter((element) => {
        if (
          element.id.trim().indexOf(key) > -1 ||
          element.name.trim().indexOf(key) > -1
        ) {
          return element;
        }
      });
      setList(filteredList);
    } else {
      setList(patientData);
    }
  };

  const handleOpen = (event) => {
    setGender(event.row.gender);
    setIdValue(event.row);
    // console.log("ID ",event.row.id)
    // console.log("Gender ",event.row.gender)
    setOpen(true);
    console.log("HANDLE OPEN :", event);
    var showField = event.field;
    if (showField == "History") {
      // fetchPatientHistory()
      setShowhistory(true);
    } else {
      setShowhistory(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (patientData.length > 0) {
    return (
      <div className={classes.root}>
        <Container component="main" maxWidth="lg">
          <div style={{ height: 500, width: "90%" }}>
            <form className={classes.root} noValidate autoComplete="off">
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
              />{" "}
              &nbsp; &nbsp;
            </form>
            &nbsp;
            <DataGrid
              // onCellClick	={handleOpen}
              onCellClick={(event) => handleOpen(event)}
              rows={list}
              columns={col}
              pageSize={5}
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
              {!showhistory && (
                <div>
                  <DialogTitle id="form-dialog-title">Vital Signs</DialogTitle>
                  <DialogContent>
                    <GridContainer>{getFeilds()}</GridContainer>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                      Save
                    </Button>
                  </DialogActions>
                </div>
              )}
              {showhistory && (
                <div>
                  <DialogTitle id="form-dialog-title">
                    Patient History
                  </DialogTitle>
                  <DialogContent>
                    <GridContainer>
                      <ControlledAccordions historyfields={historyfields} />
                    </GridContainer>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                      Save
                    </Button>
                  </DialogActions>
                </div>
              )}
            </Dialog>
          </div>
        </Container>
      </div>
    );
  } else {
    return "Loading...";
  }
}
