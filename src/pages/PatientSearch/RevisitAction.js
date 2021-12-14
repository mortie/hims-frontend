import React, { useRef, useEffect, useState } from "react";
import { getAPI, postAPI, getaddressAPI } from "../../services/index";
import axios from "axios";

import moment from "moment";
import { useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
    Typography,
    TextField,
  makeStyles,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { GridContainer, GridItem } from "../../components/Grid";
// import styles from "./styles";
import MlcRevisit from './MlcRevisit';
import PcRevisit from './PatientCategoryRevisit';
import DepartmentRevisit from './DepartmentRevisit';
import AvailableTimeSlots from "./../PatientRegistration/components/AvailableTimeSlots";
import PrintAction from "./PrintAction";
import PrintPatientRegistration from "./../PatientRegistration/components/PrintPatientRegistration";


import styles from "./../PatientRegistration/styles";
import { useSnackbar } from "notistack";


const useStyles = makeStyles(styles);


export default function RevisitAction({ data,mlc }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(true);
  const history = useHistory();
  const ref = useRef();
  const { appointmentData, visitData } = data;
  const { registrationDate, departmentName,reportingPlace,doctorName,reportingTime } = visitData.data;
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [mlcTypes, setMlcTypes] = useState([]);
  const [mlcYesTypes, setmlcYesTypes] = useState([]);
  var [yesmlc, setYesmlc] = useState(false);
  const [patientCategoryTypes, setPatientCategoryTypes] = useState([]);
  var [items, setItems] = useState({});
  var [mlcUuid, setMlcUuid] = useState("");
  var [mlcYesUuid, setMlcYesUuid] = useState("");
  var [pcUuid, setPcUuid] = useState("")
  var [paidUuid, setPaidUuid] = useState("");
  var [prUuid, setPrUuid] = useState("");
  var [freeUuid, setFreeUuid] = useState("");
  const [revisitValues, setRevisitValues] = useState({});
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [timeSlotsLoading, setTimeSlotsLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isMlc, setIsMlc] = useState(false)
  const [isPc, setIsPc] = useState(false)
  const [visitAttributeTypes, setVisitAttributeTypes] = useState();
  const [registrationSuccessData, setRegistrationSuccessData] = useState(null);


  const initialSate = {
    "Department*": { departmentName },
    "Medico Legal Case*": "",
    "Patient Category*": "",
    "MLC Yes*":"",
  };

  const [formValues, setFormValues] = useState(initialSate);
  const [formErrors, setFormErrors] = useState({});


  function validateAutocomplete(key, value = null) {
    if (key.slice(-1) === "*") {
      if (value) {
        const errors = formErrors;
        delete errors[key];
        setFormErrors(errors);
      }
      else {
        setFormErrors({ ...formErrors, [key]: "This field is required" });
      }
    }
  }


  const {
  name,
  gender,
  age,
  } = appointmentData;
  //   const {
  //     startDate,
  //     endDate,
  //     provider,
  //     location,
  //     types,
  //   } = appointmentData.timeSlot.appointmentBlock;


  const handlePrint = useReactToPrint({
    content: () => ref.current,
    onAfterPrint: () => handleClose()
  });

  const handleClose = () => {
    setOpen(false);
    history.push({ pathname: "/app/patient-search" });
  };

  const getGenderString = (gender) => {
    if (gender === "M") return "Male";
    if (gender === "F") return "Female";
    if (gender === "O") return "Others";
  };

  function onAutocompleteChange(display, newValue) {

    if (newValue.display == "MLC Yes*") {
      setYesmlc(true)
    }
    else {
      setYesmlc(false)
    }
    if (newValue?.datatype?.display === "Coded")
    {
      setFormValues({
      ...formValues,
      [newValue.display]: null,
      [display]: newValue,
      });
    }
    else if (newValue?.datatype?.display === "Text")
    {
      setFormValues({
      ...formValues,
      [newValue.display]: "",
      [display]: newValue,
      });
    }
    else {
      setFormValues({ ...formValues, [display]: newValue });
    }
      validateAutocomplete(display, newValue);
  }

const getAge = (birthdate) => {
    let difference = moment.duration(moment().diff(birthdate));
    if (difference.years() >= 1) return `${difference.years()} year(s)`;
    if (difference.months() >= 1) return `${difference.months()} month(s)`;
    if (difference.weeks() >= 1) return `${difference.weeks()} week(s)`;
    if (difference.days() >= 1) return `${difference.days()} day(s)`;
};

  useEffect(() => {
    getAPI(
    `/concept?q="Registration Attribute"&v=custom:(answers:(display,answers:(uuid,display,datatype:(display),synonyms:(display),names:(display,conceptNameType),answers:(uuid,display,datatype:(display),names:(display,conceptNameType),answers:(uuid,display,datatype:(display),names:(display,conceptNameType),answers:(uuid,display,datatype:(display),names:(display,conceptNameType)))))`
    )
    .then((response) => {

    var visitinfo = response.data.results[0].answers.map((item1, index) => {
    if (item1.display == "Visit Info") {

    var abc = item1.answers.map((item2, index) => {
    if (item2.display == "Medico Legal Case*") {
    setMlcTypes(item2.answers)
    setItems({
    ...item2,
    item2
    })

    // setMlcUuid(item2.uuid)

    item2.answers.map((item4, index) => {
    if (item4.display == "MLC Yes*") {
    setmlcYesTypes(item4.answers)
    }
    })
    }
    })
    }
    else if (item1.display == "Payment Info") {

    item1.answers.map((item3, index) => {
    if (item3.display == "Patient Category*") {

    setPatientCategoryTypes(item3.answers)


    }
    })

    }
    return item1
    })

    })
    .catch((error) => console.log(error));

  getAPI("/appointmentscheduling/appointmenttype?v=custom:(uuid,display)")
  .then((response) => {
  setAppointmentTypes(response.data.results);
  })
    .catch((error) => console.log(error));

  getAPI("/visitattributetype?v=custom:(uuid,display,datatypeClassname)")
    .then((response) => {
      setVisitAttributeTypes(response.data.results);
      var abc = response.data.results.map((item2, index) => {
      if (item2.display == "Medico Legal Case*")
      {
        setMlcUuid(item2.uuid)
      }
      else if (item2.display == "MLC Yes*") {
        setMlcYesUuid(item2.uuid)
      }
      else if (item2.display == "Patient Category*") {
        setPcUuid(item2.uuid)
      }
      else if (item2.display == "Paid category*") {
        setPaidUuid(item2.uuid)
      }
      else if (item2.display == "Programs*") {
        setPrUuid(item2.uuid)
      }
      else if (item2.display == "Free category*") {
        setFreeUuid(item2.uuid)
      }
      })
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  const handleRevisitChange = (event,visitConcept) => {
    const { attributeType, value } = visitConcept;
    if (attributeType == mlcUuid) {
      if (value) {
        setIsMlc(true)
      }
    }
    else if (attributeType == pcUuid) {
      if (value) {
        setIsPc(true);
      }
    }
    setRevisitValues({ ...revisitValues, [attributeType]: value });
  };

  const getAttributes = (attributeTypes) => {
    return attributeTypes
      .map((element) => {
        return (
          formValues[element.display] && {
            attributeType: element.uuid,
            value:
              typeof formValues[element.display] === "object"
                ? formValues[element.display]?.display
                : formValues[element.display],
          }
        );
      })
      .filter((element) => element && element);
  };

  const getRevisitObs = () => {
    let obs = [];
    for (const key in revisitValues) {
    if (Object.hasOwnProperty.call(revisitValues, key)) {
    const value = revisitValues[key];
    obs.push({
    attributeType: key,
    value: typeof value !== "object" ? value : value.toISOString(),
    });
    }
    }
    return obs;
  };


  const saveRevisit = () => {
    let patientUuid = appointmentData.uuid;
    enqueueSnackbar("Revisit saved successfully.");
    setOpen(false);

    getAPI(
    `/lastVisit/patient?patient=${patientUuid}`
    )
    .then((response) => {
    console.log("Response",response);
    })
    .catch((error) => {
    console.log(error);
    });


    let location = timeSlots.filter(
    (element) => selectedTimeSlot === element.uuid
    );


    let visit = {
    visitType: "7b0f5697-27e3-40c4-8bae-f4049abfb4ed",
    location: location[0].appointmentBlock.location.uuid,
    // attributes: getAttributes(visitAttributeTypes),
    attributes: getRevisitObs(),
    };

    visit.patient = patientUuid;
    console.log(" Visit Data :", visit)

    postAPI("/visit", visit)
    .then((visitResponse) => {
    postAPI("/appointmentscheduling/appointment", {
      appointmentType: formValues["Department*"].uuid,
      patient: patientUuid,
      reason: "Revisit",
      status: "Scheduled",
      timeSlot: selectedTimeSlot,
      visit:visitResponse.data.uuid,
    })
    .then((appointmentResponse) => {

    setRegistrationSuccessData({
      appointmentData: appointmentResponse.data,
      visitData: visitResponse.data,
    });
    })
    .catch((appointmentRequestError) => {
    console.log(appointmentRequestError);
    });
    })
    .catch((visitRequestError) => {
      console.log(visitRequestError);
    });
  };

    const getTimeSlots = (type) => {
    setSelectedTimeSlot(null);
    const fromDate = new Date();
    const toDate = new Date(
      fromDate.getFullYear(),
      fromDate.getMonth(),
      (fromDate.getDate()),
      23,
      59,
      59
    );
    if (type) {
      setTimeSlotsLoading(true);
      getAPI(
        `/appointmentscheduling/timeslot?appointmentType=${
          type.uuid
        }&fromDate=${fromDate.toISOString()}&toDate=${toDate.toISOString()}&v=default`
      )
        .then((response) => {
          setTimeSlotsLoading(false);
          let res = response.data.results;

            res = res.filter(function(item) {
              return item.appointmentBlock.provider !== null
          })
          setTimeSlots(res);
        })
        .catch((error) => {
          setTimeSlotsLoading(false);
          console.log(error);
        });
    }
  }



  return (
    <>
      {registrationSuccessData && (
        <PrintPatientRegistration data={registrationSuccessData} />
      )}
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        Patient Revisit
      </DialogTitle>
      <DialogContent dividers ref={ref}>
        <Table>
        <TableBody>


          <MlcRevisit
            visitAttributeTypes = {visitAttributeTypes}
            mlcUuid = {mlcUuid}
            mlcTypes={mlcTypes}
            mlcYesUuid = {mlcYesUuid}
            formValues={formValues}
            formErrors={formErrors}
            Autocomplete={Autocomplete}
            onAutocompleteChange={onAutocompleteChange}
            validateAutocomplete={validateAutocomplete}
            onChange={handleRevisitChange}
          />

          <PcRevisit
            pcUuid={pcUuid}
            paidUuid={paidUuid}
            prUuid={prUuid}
            freeUuid = {freeUuid}
            patientCategoryTypes={patientCategoryTypes}
            formValues={formValues}
            formErrors={formErrors}
            Autocomplete={Autocomplete}
            onAutocompleteChange={onAutocompleteChange}
            validateAutocomplete={validateAutocomplete}
            onChange={handleRevisitChange}
          />

          <DepartmentRevisit
            departmentName = {departmentName}
            appointmentTypes={appointmentTypes}
            formValues={formValues}
            formErrors={formErrors}
            Autocomplete={Autocomplete}
            onAutocompleteChange={onAutocompleteChange}
            validateAutocomplete={validateAutocomplete}
            onChange={handleRevisitChange}
            getTimeSlots={getTimeSlots}
          />


          <TableRow>
            <TableCell colSpan={3} className="MuiTableCell-alignLeft">
              <AvailableTimeSlots
              loading={timeSlotsLoading}
              timeSlots={timeSlots}
              classes={classes}
              selectedTimeSlot={selectedTimeSlot}
              setSelectedTimeSlot={setSelectedTimeSlot}
              />
            </TableCell>
          </TableRow>

          <TableRow>
              <TableCell colSpan={2} className="MuiTableCell-alignLeft">
                <Typography>UHID</Typography>
              </TableCell>
              <TableCell >
                <Typography>
                &nbsp;&nbsp;&nbsp;{appointmentData.identifier}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell colSpan={2} className="MuiTableCell-alignLeft">
                <Typography>PATIENT'S NAME</Typography>
              </TableCell>
              <TableCell >
                <Typography >&nbsp;&nbsp;&nbsp;{name}</Typography>
            </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} className="MuiTableCell-alignLeft">
                <Typography>REGISTRATION DATE</Typography>
              </TableCell>
              <TableCell >
                <Typography >
                  &nbsp;&nbsp;&nbsp;{registrationDate}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <Typography>GENDER</Typography>
              </TableCell>
              <TableCell >
                <Typography>&nbsp;&nbsp;&nbsp;{getGenderString(gender)}</Typography>
            </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography>AGE</Typography>
              </TableCell>
              <TableCell >
                <Typography>&nbsp;&nbsp;&nbsp;{age}</Typography>
              </TableCell>

              </TableRow>
              <TableRow>
              <TableCell colSpan={2}>
                <Typography>REPORTING PLACE</Typography>
              </TableCell>
              <TableCell >
                <Typography>&nbsp;&nbsp;&nbsp;{ reportingPlace }</Typography>
            </TableCell>
            </TableRow>
          <TableRow>
              <TableCell colSpan={2}>
                <Typography>DOCTOR NAME</Typography>
              </TableCell>
              <TableCell >
                <Typography>&nbsp;&nbsp;&nbsp;{ doctorName }</Typography>
              </TableCell>
              {/* <TableCell >
                <Typography>REPORTING TIME</Typography>
              </TableCell>
              <TableCell>
                <Typography>{`${moment(startDate).format(
                  "hh:mm a"
                )} to ${moment(endDate).format("hh:mm a")}`}</Typography>
                            <Typography>{ reportingTime }</Typography>
              </TableCell> */}
          </TableRow>
        </TableBody>

        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
      <Button
        disabled={!isMlc || !isPc}
        onClick={saveRevisit}
        variant="contained"
        color="primary">
          Save
        </Button>
      </DialogActions>
  </Dialog>
</>
  );
}
