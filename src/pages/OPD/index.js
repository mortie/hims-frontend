import React, { useState, useEffect } from "react";
import { getAPI } from "../../services";
import { DataGrid } from "@material-ui/data-grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
// import Grid from '@material-ui/core/Grid';
import { GridContainer, GridItem } from "../../components/Grid";
import Grid from "@material-ui/core/Grid";
// import CustomizedMenus from "./ActionButton";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { UpdateOutlined } from "@material-ui/icons";

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
      <Button variant="contained" color="primary" >
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
      <Button variant="contained" color="primary" >
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
  const [age, setAge] = React.useState("");
  const [fields, setFields] = React.useState([]);
  const [selectValue, setValues] = React.useState([]);
  const [TypeValues, setTypeValues] = React.useState([]);
  // const [height,setHeight] = React.useState("")

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  // const [personName, setPersonName] = React.useState([]);

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

  const getFeilds = () => {
    return (
      <>
        {" "}
        {fields.map((field) => {
          const { uuid, display, datatype, answers } = field;
          if (datatype.display === "Coded") {
            let item = [];
            for (let i = 0; i < answers.length; i++) {
              item.push(answers[i].display);
            }

            console.log("coded item ", item);
            return (
              <GridItem item xs={12} sm={6} md={4} key={uuid}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-customized-select-label">
                    {display}
                  </InputLabel>
                  <Select
                    style={{ width: 250 }}
                    // labelId="demo-simple-select-required-label"
                    variant="outlined"
                    autoFocus="true"
                    autoWidth="true"
                    onChange={getValue}
                  >
                    {item.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* <FormHelperText>Required</FormHelperText> */}
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
                    id="name"
                    label={display}
                    type="Numeric"
                    rowsMax={4}
                    size="small"
                  />
                </FormControl>
              </GridItem>
            );
          }

          if (datatype.display === "Date") {
            return (
              <TextField
                id="date"
                label={display}
                type="date"
                name="lvd"
                defaultValue=""
                className={classes.textField}
                maxDate={new Date()}
                InputLabelProps={{
                  shrink: true,
                }}
                onKeyUp={(e) => searchOnKey(e, "lvd", "press")}
              />
            );
          }
        })}
      </>
    );
  };

  const getValue = (event) => {
    selectValue.push(event.target.value);
    console.log("slected value ", selectValue);
  };

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

  const handleOpen = () => {
    setOpen(true);
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
              // onRowClick={handleOpen}
              rows={list}
              columns={col}
              pageSize={5}
            />
            <Button
              variant="contained"
              color="primary"
              href="#contained-buttons"
            >
              Link
            </Button>
          </div>
          <div>
            <Dialog
              maxWidth="md"
              fullWidth="true"
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
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
            </Dialog>
          </div>
        </Container>
      </div>
    );
  } else {
    return "Loading...";
  }
}
