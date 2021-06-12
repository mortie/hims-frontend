import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { useSnackbar } from "notistack";
import {
  makeStyles,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  InputAdornment,
  Paper,
  Select,
  InputLabel,
  Chip,
  LinearProgress,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { GridOverlay, DataGrid } from "@material-ui/data-grid";
import { Alert, Autocomplete } from "@material-ui/lab";
import { getAPI, postAPI } from "../../services";
import { getAuthenticatedUser } from "../../utils/authentication";
import { calculateAge } from "../../utils/commons";
import { GridContainer, GridItem } from "../../components/Grid";
import ControlledAccordions from "./patient_history";
import opdStyles from "./styles";

const useStyles = makeStyles(opdStyles);

const initialState = {
  "5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA": "", // height
  "5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA": "", // weight
  "d7d7dc30-13d5-4661-942e-f69fd1701079": "", // BMI
  "5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA": "", // Systolic
  "5086AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA": "", // Diastolic
};

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

function CustomNoRowsOverlay() {
  return (
    <GridOverlay>
      <Alert severity="info">
        <strong>No records found.</strong>
      </Alert>
    </GridOverlay>
  );
}

const col = [
  { field: "visitUuid", hide: true },
  { field: "uuid", hide: true },
  { field: "patientName", hide: true },
  { field: "id", headerName: "PatientID", width: 125 },
  {
    field: "name",
    headerName: "Name",
    width: 250,
    renderCell: (params) => params.value,
  },
  { field: "gender", headerName: "Gender" },
  { field: "age", headerName: "Age", width: 125 },

  { field: "location", headerName: "Location", width: 150 },
  { field: "visitTime", headerName: "Time" },
  {
    field: "Triage",
    headerName: "Triage",
    type: "string",
    renderCell: (params) => (
      <Button variant="text" color="primary">
        Vitals
      </Button>
    ),
  },

  {
    field: "History",
    headerName: "History",
    type: "string",
    renderCell: (params) => (
      <Button variant="text" color="primary">
        History
      </Button>
    ),
  },
];

export default function Triage() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [filteredPatientList, setFilteredPatientList] = useState([]);
  const [patientsList, setPatientsList] = useState([]);
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState([]);
  const [historyfields, setHistoryfields] = useState([]);
  const [showhistory, setShowhistory] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [patient, setPatient] = useState({});
  const [vitalValues, setVitalValues] = useState(initialState);
  const [providerUuid, setProviderUuid] = useState(null);
  const [vitalSaved, setVitalSaved] = useState(false);
  const [location, setLocation] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(true);
  const locations = useSelector((state) => state.locations.locations);

  useEffect(() => {
    setLoading(true);
    const url =
      "/visit?includeInactive=false&v=custom:(uuid,patient:(uuid,display,person:(gender,age,birthdate)),visitType:(display),location:(display),startDatetime,encounters:(uuid,encounterDatetime,encounterType:(display),obs:(uuid,display)))";
    getAPI(url).then((response) => {
      const { results } = response.data;
      const patientList = results.map((result) => {
        const { uuid, display, person } = result.patient;
        const vitalEncounters = result.encounters.filter(
          (encounter) => encounter.encounterType.display === "Vitals"
        );

        return {
          visit: result.uuid,
          uuid: uuid,
          patientName: display.split("-")[1],
          id: display.split("-")[0],
          // name: (
          //   <>
          //     {display.split("-")[1]}
          //     {vitalEncounters.length > 0 && (
          //       <Chip
          //         size="small"
          //         style={{ marginLeft: 2 }}
          //         color="primary"
          //         label="submitted"
          //       />
          //     )}
          //   </>
          // ),
          name: display.split("-")[1],
          gender: person.gender,
          visitTime: moment(result.startDatetime).format("hh:mm A"),
          location: result.location.display,
          age: calculateAge(person.birthdate),
        };
      });
      setPatientsList(patientList);
      setFilteredPatientList(patientList);
      setLoading(false);
    });
  }, [vitalSaved]);

  useEffect(() => {
    let url1 =
      "/concept?q=Vital Signs&v=custom:(answers:(uuid,display,datatype:(display),answers:(uuid,display)))";
    getAPI(url1)
      .then((response) => {
        setFields(response.data.results[0].answers);
      })
      .catch((error) => console.log(error));

    getAPI(
      `/provider?q=${
        getAuthenticatedUser().display
      }&v=custom:(uuid,person:(uuid))`
    )
      .then((response) => {
        const { results } = response.data;
        const provider = results.filter(
          (result) => result.person.uuid === getAuthenticatedUser().person.uuid
        );
        provider.length && setProviderUuid(provider[0].uuid);
      })
      .catch((error) => {
        console.log(error);
      });

    let patient_history_url = `/concept?q=Patient History&v=custom:(answers:(display,answers:(uuid,display,datatype:(display),synonyms:(display),answers:(uuid,display,datatype:(display),answers:(uuid,display,datatype:(display),answers:(uuid,display,datatype:(display)))))`;
    getAPI(patient_history_url)
      .then((response) => {
        setHistoryfields(response.data.results[0].answers);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVitalValues({ ...vitalValues, [name]: value });
  };

  const handleDateChange = (date, value) => {
    let edd = date.clone().add(7, "days").add(9, "months");
    setVitalValues({
      ...vitalValues,
      "1fea6d3a-8167-4039-b345-b28c347053e1": date,
      "c225630f-8a65-46a3-8848-f45716d7d45d": edd,
    });
  };

  const handleLocationChange = (event, value) => {
    setLoading(true);
    setLocation(value);
    setFilteredPatientList(getFilteredPatientList(value, searchKey));
    setLoading(false);
  };

  const searchOnKey = (event) => {
    const key = event.target.value;
    setLoading(true);
    setSearchKey(key);
    setFilteredPatientList(getFilteredPatientList(location, key.toLowerCase()));
    setLoading(false);
  };

  const getFilteredPatientList = (location, key) => {
    let filteredList = location
      ? patientsList.filter((patient) => patient.location === location.display)
      : patientsList;

    filteredList =
      key.length >= 3
        ? filteredList.filter(
            (patient) =>
              patient.patientName.toLowerCase().includes(key) ||
              patient.id.toLowerCase().includes(key)
          )
        : filteredList;

    return filteredList;
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (
      name === "5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" ||
      name === "5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    ) {
      const weight = vitalValues["5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"];
      const height = vitalValues["5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"] / 100;
      if (height && weight) {
        setVitalValues({
          ...vitalValues,
          "d7d7dc30-13d5-4661-942e-f69fd1701079": (
            weight /
            (height * height)
          ).toFixed(2),
        });
      }
    }
  };

  const handleOpen = (event) => {
    if (!providerUuid) return;
    const { row, field } = event;
    row.uuid !== patient.uuid && setVitalValues(initialState);
    setIsFemale(row.gender === "F");
    setPatient(row);
    setOpen(true);
    setVitalSaved(false);

    field === "History" ? setShowhistory(true) : setShowhistory(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveVitals = () => {
    const encounter = {
      encounterType: "67a71486-1a54-468f-ac3e-7091a9a79584",
      encounterProviders: [
        {
          provider: providerUuid,
          encounterRole: "240b26f9-dd88-4172-823d-4a8bfeb7841f",
        },
      ],
      patient: patient.uuid,
      visit: patient.visit,
      obs: getObs(),
    };

    postAPI("/encounter", encounter)
      .then((response) => {
        enqueueSnackbar("Vitals saved successfully.");
        setOpen(false);
        setVitalSaved(true);
      })
      .catch((error) => console.log(error));
  };

  const getObs = () => {
    let obs = [];
    for (const key in vitalValues) {
      if (Object.hasOwnProperty.call(vitalValues, key)) {
        const value = vitalValues[key];
        obs.push({
          concept: key,
          value: typeof value !== "object" ? value : value.toISOString(),
        });
      }
    }
    return obs;
  };

  const getFeilds = () => {
    return (
      <>
        {fields.map((field) => {
          const { uuid, display, datatype, answers } = field;

          if (datatype.display === "Coded") {
            return (
              <GridItem item xs={12} sm={6} md={3} key={uuid}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                >
                  <InputLabel id={display}>{display}</InputLabel>
                  <Select
                    labelId={display}
                    id={uuid}
                    name={uuid}
                    value={vitalValues[uuid]}
                    onChange={handleChange}
                    label={display}
                  >
                    {answers.map((answer) => (
                      <MenuItem key={answer.uuid} value={answer.uuid}>
                        {answer.display}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
            );
          }

          if (datatype.display === "Numeric") {
            return (
              <GridItem item xs={12} sm={6} md={3} key={uuid}>
                <TextField
                  variant="outlined"
                  id={uuid}
                  name={uuid}
                  label={display}
                  value={vitalValues[uuid]}
                  type="number"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  margin="normal"
                  disabled={display === "BMI"}
                />
              </GridItem>
            );
          }
          if (isFemale) {
            return (
              <GridItem item xs={12} sm={6} md={3} key={uuid}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    fullWidth
                    size="small"
                    name={uuid}
                    margin="normal"
                    disableFuture={display === "LMP"}
                    disabled={display === "EDD"}
                    allowKeyboardControl
                    autoOk
                    inputVariant="outlined"
                    openTo="date"
                    format="DD/MM/yyyy"
                    label={display}
                    value={vitalValues[uuid]}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
              </GridItem>
            );
          }
        })}
      </>
    );
  };

  return (
    <div>
      {!providerUuid && (
        <Alert severity="info">
          <strong>This is not a provider account.</strong> You can not enter
          vitals. If you think this is a mistake, please contact your
          administrator.
        </Alert>
      )}
      <Paper>
        <GridContainer>
          <GridItem item xs={12} sm={6} md={9}>
            <TextField
              label="Search patient by name or ID"
              id="value"
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth
              type="search"
              autoFocus
              onChange={searchOnKey}
              className="value"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="fas fa-search" />
                  </InputAdornment>
                ),
              }}
            />
          </GridItem>
          <GridItem item xs={12} sm={6} md={3}>
            <Autocomplete
              options={locations || []}
              getOptionLabel={(option) => option.display}
              onChange={handleLocationChange}
              value={location}
              // getOptionSelected={(option, value) =>
              //   option.value === value.value
              // }
              defaultValue={location}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Department"
                  size="small"
                  margin="normal"
                  variant="outlined"
                />
              )}
            />
          </GridItem>
        </GridContainer>
        <DataGrid
          loading={loading}
          onCellClick={(event) => handleOpen(event)}
          rows={filteredPatientList}
          disableColumnMenu
          columns={[
            { field: "visitUuid", hide: true },
            { field: "uuid", hide: true },
            {
              field: "patientName",
              hide: true,
            },
            { field: "id", headerName: "PatientID", width: 125 },
            {
              field: "name",
              headerName: "Name",
              width: 250,
              // renderCell: (params) => params.value,
              sortComparator: (v1, v2, param1, param2) =>
                param2.getValue('age') - param1.getValue('age')
            },
            { field: "gender", headerName: "Gender" },
            { field: "age", headerName: "Age", width: 125 },

            { field: "location", headerName: "Location", width: 150 },
            { field: "visitTime", headerName: "Time" },
            {
              field: "Triage",
              headerName: "Triage",
              type: "string",
              renderCell: (params) => (
                <Button variant="text" color="primary">
                  Vitals
                </Button>
              ),
              sortable: false,
            },

            {
              field: "History",
              headerName: "History",
              type: "string",
              renderCell: (params) => (
                <Button variant="text" color="primary">
                  History
                </Button>
              ),
              sortable: false,
            },
          ]}
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

      <div>
        <Dialog
          maxWidth="md"
          fullWidth
          scroll="paper"
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          {!showhistory && (
            <div>
              <DialogTitle id="form-dialog-title" disableTypography>
                <h2 style={{ margin: 0 }}>Vital Signs</h2>
                <p
                  style={{ margin: 0 }}
                >{`${patient.name}, ${patient.age}, ${patient.gender}`}</p>
              </DialogTitle>
              <DialogContent dividers>
                <GridContainer>{getFeilds()}</GridContainer>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={saveVitals} color="primary">
                  Save
                </Button>
              </DialogActions>
            </div>
          )}
          {showhistory && (
            <div>
              <DialogTitle id="form-dialog-title">Patient History</DialogTitle>
              <DialogContent dividers>
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
    </div>
  );
}
