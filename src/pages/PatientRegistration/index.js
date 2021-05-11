import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAPI, postAPI } from "../../services/index";
import { Autocomplete } from "@material-ui/lab";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { GridContainer, GridItem } from "../../components/Grid";
import BasicDetails from "./components/Demographics";
import PrintPatientRegistration from "./components/PrintPatientRegistration";
import AvailableTimeSlots from "./components/AvailableTimeSlots";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import {
  Paper,
  TextField,
  makeStyles,
  useTheme,
  Stepper,
  Step,
  StepButton,
  Button,
  FormHelperText,
  MobileStepper,
} from "@material-ui/core";
import styles from "./styles";
import AutocompleteComponent from "./components/AutocompleteComponent";

const useStyles = makeStyles(styles);

const initialSate = {
  "First Name*": "",
  "Middle Name": "",
  "Last Name*": "",
  "Age*": "",
  "Date of Birth": null,
  "Gender*": null,
  "Phone Number*": null,
};

export default function PatientRegistration() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setsteps] = useState(["Demographics"]);
  const [stepsWithContent, setStepsWithContent] = useState();
  const [formValues, setFormValues] = useState(initialSate);
  const [formErrors, setFormErrors] = useState({});
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [identifier, setIdentifier] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [timeSlotsLoading, setTimeSlotsLoading] = useState(false);
  const [personAttributeTypes, setPersonAttributeTypes] = useState();
  const [visitAttributeTypes, setVisitAttributeTypes] = useState();
  const [registrationSuccessData, setRegistrationSuccessData] = useState(null);

  useEffect(() => {
    getAPI(
      `/concept?q="Registration Attribute"&v=custom:(answers:(display,answers:(uuid,display,datatype:(display),synonyms:(display),answers:(uuid,display,datatype:(display),answers:(uuid,display,datatype:(display),answers:(uuid,display,datatype:(display)))))`
    )
      .then((response) => {
        const stapsWithContent = response.data.results[0].answers.filter(
          (stepWithContent) =>
            stepWithContent.answers.length >= 1 && stepWithContent
        );
        setsteps([
          "Demographics",
          ...stapsWithContent.map((step) => step.display),
        ]);
        setStepsWithContent(stapsWithContent);
      })
      .catch((error) => console.log(error));

    getAPI("/idgen/nextIdentifier?source=1")
      .then((response) => {
        setIdentifier(response.data.results[0].identifierValue);
      })
      .catch((error) => console.log(error));

    getAPI("/appointmentscheduling/appointmenttype?v=custom:(uuid,display)")
      .then((response) => {
        setAppointmentTypes(response.data.results);
      })
      .catch((error) => console.log(error));

    getAPI("/personattributetype?v=custom:(uuid,display)")
      .then((response) => {
        setPersonAttributeTypes(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

    getAPI("/visitattributetype?v=custom:(uuid,display,datatypeClassname)")
      .then((response) => {
        setVisitAttributeTypes(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function getStepContent(step) {
    return (
      <GridContainer>
        {step === 0 ? (
          <BasicDetails
            classes={classes}
            identifier={identifier}
            formErrors={formErrors}
            formValues={formValues}
            setFormValues={setFormValues}
            onTextChange={onTextChange}
            onAutocompleteChange={onAutocompleteChange}
            onPhoneChange={onPhoneChange}
            onDateOfBirthChange={onDateOfBirthChange}
            validateText={validateText}
            validateAutocomplete={validateAutocomplete}
            validatePhone={validatePhone}
          />
        ) : (
          <>
            {stepsWithContent[step - 1].answers.map((element, index) => {
              const { uuid, display, answers, datatype, synonyms } = element;
              const error = formErrors[display] ? true : false;
              if (!formValues.hasOwnProperty(display)) {
                setFormValues({
                  ...formValues,
                  [display]: datatype.display === "Text" ? "" : null,
                });
              }
              if (datatype.display === "Text") {
                if (checkSynonym(synonyms) === "email") {
                  return (
                    <GridItem key={uuid} item xs={12} sm={6} md={4}>
                      <TextField
                        id={display}
                        variant="outlined"
                        label={display}
                        name={display}
                        fullWidth
                        className={classes.field}
                        error={formErrors[display]}
                        helperText={formErrors[display] && formErrors[display]}
                        value={formValues[display]}
                        onChange={onEmailChange}
                        onBlur={validateEmail}
                        autoFocus={index === 0}
                      />
                    </GridItem>
                  );
                }
                return getTextFieldComponent(uuid, display, error, index === 0);
              }

              if (datatype.display === "Numeric") {
                if (checkSynonym(synonyms) === "mobile") {
                  return (
                    <GridItem key={uuid} item xs={12} sm={6} md={4}>
                      <PhoneInput
                        containerStyle={{
                          marginTop: 8,
                          color: formErrors[display]
                            ? "red"
                            : "rgba(0, 0, 0, 0.54)",
                        }}
                        inputProps={{
                          name: display,
                          autoFocus: index === 0 ? true : false,
                        }}
                        inputStyle={{
                          width: "100%",
                        }}
                        inputClass={formErrors[display] && classes.phoneField}
                        country={"in"}
                        specialLabel={display}
                        value={formValues[display]}
                        onChange={onPhoneChange}
                        onBlur={(e, data) =>
                          validatePhone(e, data, formValues[display])
                        }
                        containerClass={classes.field}
                      />
                      <FormHelperText
                        className={classes.phoneFieldHelperText}
                        error
                      >
                        {formErrors[display]}
                      </FormHelperText>
                    </GridItem>
                  );
                }
                return (
                  <GridItem key={uuid} item xs={12} sm={6} md={4}>
                    <TextField
                      type="number"
                      variant="outlined"
                      label={display}
                      name={display}
                      value={formValues[display]}
                      autoFocus={index === 0 ? true : false}
                      onChange={onTextChange}
                      className={classes.field}
                      fullWidth
                    />
                  </GridItem>
                );
              }

              if (datatype.display === "Coded") {
                return (
                  <React.Fragment key={uuid}>
                    <AutocompleteComponent
                      display={display}
                      answers={answers}
                      formErrors={formErrors}
                      formValues={formValues}
                      autoFocus={index === 0}
                      classes={classes}
                      onAutocompleteChange={onAutocompleteChange}
                      validateAutocomplete={validateAutocomplete}
                    />

                    {formValues[display]?.datatype?.display === "Coded" && (
                      <AutocompleteComponent
                        display={formValues[display].display}
                        answers={formValues[display].answers}
                        formErrors={formErrors}
                        formValues={formValues}
                        autoFocus={true}
                        classes={classes}
                        onAutocompleteChange={onAutocompleteChange}
                        validateAutocomplete={validateAutocomplete}
                      />
                    )}

                    {formValues[display]?.datatype?.display === "Text" &&
                      getTextFieldComponent(
                        formValues[display].uuid,
                        formValues[display].display,
                        error,
                        true
                      )}

                    {formValues[formValues[display]?.display]?.datatype
                      ?.display === "Coded" && (
                      <AutocompleteComponent
                        display={
                          formValues[formValues[display]?.display]?.display
                        }
                        answers={
                          formValues[formValues[display]?.display]?.answers
                        }
                        formErrors={formErrors}
                        formValues={formValues}
                        autoFocus={true}
                        classes={classes}
                        onAutocompleteChange={onAutocompleteChange}
                        validateAutocomplete={validateAutocomplete}
                      />
                    )}

                    {formValues[
                      formValues[formValues[display]?.display]?.display
                    ]?.datatype?.display === "Numeric"
                      ? getTextFieldComponent(
                          formValues[
                            formValues[formValues[display]?.display]?.display
                          ]?.uuid,
                          formValues[
                            formValues[formValues[display]?.display]?.display
                          ]?.display,
                          error,
                          true
                        )
                      : null}
                  </React.Fragment>
                );
              }
              return null;
            })}
            {isLastStep() ? (
              <GridItem item xs={12} sm={6} md={4}>
                <Autocomplete
                  id="Department*"
                  options={appointmentTypes}
                  getOptionLabel={(option) => option.display}
                  onChange={(e, newValue) => {
                    onAutocompleteChange("Department*", newValue);
                    getTimeSlots(newValue);
                  }}
                  onBlur={(e) =>
                    validateAutocomplete(
                      "Department*",
                      formValues["Department*"]
                    )
                  }
                  value={formValues["Department*"]}
                  getOptionSelected={(option, value) =>
                    option.uuid === value.uuid
                  }
                  defaultValue={formValues["Department*"]}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="Department*"
                      label="Department*"
                      variant="outlined"
                      error={formErrors["Department*"] ? true : false}
                      helperText={formErrors["Department*"]}
                    />
                  )}
                />
              </GridItem>
            ) : null}
          </>
        )}
      </GridContainer>
    );
  }

  function getTextFieldComponent(uuid, display, error, autoFocus) {
    const errors = formErrors[display] ? true : false;
    return (
      <GridItem key={uuid} item xs={12} sm={6} md={4}>
        <TextField
          id={display}
          variant="outlined"
          label={display}
          name={display}
          fullWidth
          className={classes.field}
          error={errors}
          helperText={errors && formErrors[display]}
          value={formValues[display]}
          onChange={(e) => onTextChange(e)}
          onBlur={validateText}
          autoFocus={autoFocus}
        />
      </GridItem>
    );
  }

  function getTimeSlots(type) {
    setSelectedTimeSlot(null);
    const fromDate = new Date();
    const toDate = new Date(
      fromDate.getFullYear(),
      fromDate.getMonth(),
      fromDate.getDate(),
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
          setTimeSlots(response.data.results);
        })
        .catch((error) => {
          setTimeSlotsLoading(false);
          console.log(error);
        });
    }
  }

  function onTextChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    validateText(e);
  }

  function onEmailChange(e) {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });

    validateEmail(e);
  }

  function onAutocompleteChange(display, newValue) {
    if (newValue?.datatype?.display === "Coded") {
      setFormValues({
        ...formValues,
        [newValue.display]: null,
        [display]: newValue,
      });
    } else if (newValue?.datatype?.display === "Text") {
      setFormValues({
        ...formValues,
        [newValue.display]: "",
        [display]: newValue,
      });
    } else {
      setFormValues({ ...formValues, [display]: newValue });
    }

    validateAutocomplete(display, newValue);
  }

  function onPhoneChange(value, data, event, formattedValue) {
    const { name } = event.target;
    // const rawValue = value.slice(data.dialCode.length);
    setFormValues({ ...formValues, [name]: value });
    validatePhone(event, data, value);
  }

  function onDateOfBirthChange(name, dob) {
    setFormValues({ ...formValues, [name]: dob });
  }

  function validate() {
    let errors = {};
    for (const key in formValues) {
      if (Object.hasOwnProperty.call(formValues, key)) {
        if (
          key.slice(-1) === "*" &&
          (!formValues[key] || formValues[key] === "")
        ) {
          errors[key] = "This field is required";
        }
      }
    }
    return errors;
  }

  function validateText(e) {
    const { name, value } = e.target;
    console.log(name + " " + value);
    if (name.slice(-1) === "*") {
      if (!value || value === "") {
        console.log(name);
        setFormErrors({ ...formErrors, [name]: "This field is required" });
      } else {
        const errors = formErrors;
        delete errors[name];
        setFormErrors(errors);
      }
    }
  }

  function validateEmail(e) {
    const { name, value } = e.target;
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
    if (value !== "" && !regex.test(value)) {
      setFormErrors({ ...formErrors, [name]: "Invalid email address" });
    } else {
      const errors = formErrors;
      delete errors[name];
      setFormErrors(errors);
    }
  }

  function validateAutocomplete(key, value = null) {
    if (key.slice(-1) === "*") {
      if (value) {
        const errors = formErrors;
        delete errors[key];
        setFormErrors(errors);
      } else {
        setFormErrors({ ...formErrors, [key]: "This field is required" });
      }
    }
  }

  function validatePhone(e, data, value = "91") {
    const { name } = e.target;
    const phoneNumber = value ? value.slice(data.dialCode.length) : "";
    if (phoneNumber === "") {
      setFormErrors({ ...formErrors, [name]: "This field is required" });
    } else if (phoneNumber.length !== 10) {
      setFormErrors({ ...formErrors, [name]: "Invalid phone number" });
    } else {
      const errors = formErrors;
      delete errors[name];
      setFormErrors(errors);
    }
  }

  function checkSynonym(synonyms) {
    let synonym = "";
    synonyms.forEach((synm) => {
      if (synm.display.toLowerCase() === "mobile") {
        synonym = synm.display.toLowerCase();
      } else if (synm.display.toLowerCase() === "email") {
        synonym = synm.display.toLowerCase();
      }
    });
    return synonym;
  }

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    let errors = validate();
    if (Object.keys(errors).length > 0 || Object.keys(formErrors).length > 0) {
      setFormErrors({ ...formErrors, ...errors });
      return;
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    let errors = validate();
    if (Object.keys(errors).length > 0 || Object.keys(formErrors).length > 0) {
      setFormErrors({ ...formErrors, ...errors });
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    let errors = validate();
    if (Object.keys(errors).length > 0 || Object.keys(formErrors).length > 0) {
      setFormErrors({ ...formErrors, ...errors });
      return;
    }
    setActiveStep(step);
  };

  const submitRegistrationForm = () => {
    let patient = {
      person: {
        names: [
          {
            givenName: formValues["First Name*"],
            middleName: formValues["Middle Name"],
            familyName: formValues["Last Name*"],
          },
        ],
        gender: formValues["Gender*"].value,
        age: parseInt(formValues["Age*"].slice(0, -1)),
        birthdate: formValues["Date of Birth"].toISOString(),
        addresses: [
          {
            preferred: true,
            address1: formValues["Postal Address"],
            cityVillage: formValues["Town/City"],
            stateProvince: formValues["State"],
            postalCode: formValues["Postal Code"],
            countyDistrict: formValues["District"],
          },
        ],
        attributes: [
          {
            attributeType: "75f95cc0-aff4-4025-9f69-27029d186e95",
            value: "PERNO",
          },
          {
            attributeType: "4ea2ceb4-2edf-454f-af76-ef7e8d777901",
            value: "NA",
          },
          ...getAttributes(personAttributeTypes),
        ],
      },
      identifiers: [
        {
          identifier: identifier,
          identifierType: "05a29f94-c0ed-11e2-94be-8c13b969e334",
        },
      ],
    };

    let location = timeSlots.filter(
      (element) => selectedTimeSlot === element.uuid
    );

    let visit = {
      visitType: "7b0f5697-27e3-40c4-8bae-f4049abfb4ed",
      location: location[0].appointmentBlock.location.uuid,
      attributes: getAttributes(visitAttributeTypes),
    };

    postAPI("/patient", patient)
      .then((patientResponse) => {
        visit.patient = patientResponse.data.uuid;
        postAPI("/visit", visit)
          .then((visitResponse) => {
            postAPI("/appointmentscheduling/appointment", {
              appointmentType: formValues["Department*"].uuid,
              patient: patientResponse.data.uuid,
              reason: "New Registration",
              status: "Scheduled",
              timeSlot: selectedTimeSlot,
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
      })
      .catch((patientRequestError) => console.log(patientRequestError));
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

  return (
    <>
      <MobileStepper
        variant="dots"
        steps={steps.length}
        position="static"
        activeStep={activeStep}
        className={classes.mobileStepper}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <div className={classes.root}>
        <Stepper
          nonLinear
          activeStep={activeStep}
          className={classes.desktopStepper}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepButton
                  onClick={handleStep(index)}
                  style={{ paddingTop: 5, paddingBottom: 5 }}
                >
                  {label}
                </StepButton>
                {/* <StepLabel>{label}</StepLabel> */}
              </Step>
            );
          })}
        </Stepper>
        <div>
          {
            <Paper className={classes.paper}>
              {getStepContent(activeStep)}
              {isLastStep() && formValues["Department*"] && (
                <AvailableTimeSlots
                  loading={timeSlotsLoading}
                  timeSlots={timeSlots}
                  classes={classes}
                  selectedTimeSlot={selectedTimeSlot}
                  setSelectedTimeSlot={setSelectedTimeSlot}
                />
              )}
              <GridContainer>
                <GridItem item xs={12} sm={4} md={1}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                    fullWidth
                  >
                    Back
                  </Button>
                </GridItem>
                <GridItem item xs={12} sm={4} md={1}>
                  <Button
                    color="secondary"
                    component={Link}
                    to="/app/patient-search"
                    className={classes.button}
                    fullWidth
                  >
                    Cancel
                  </Button>
                </GridItem>
                <GridItem item xs={12} sm={4} md={1}>
                  {isLastStep() ? (
                    <Button
                      disabled={
                        Object.keys(formErrors).length > 0 || !selectedTimeSlot
                      }
                      variant="contained"
                      color="primary"
                      onClick={submitRegistrationForm}
                      className={classes.button}
                      fullWidth
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                      fullWidth
                    >
                      Next
                    </Button>
                  )}
                </GridItem>
              </GridContainer>
            </Paper>
          }
        </div>
      </div>
      {registrationSuccessData && (
        <PrintPatientRegistration data={registrationSuccessData} />
      )}
    </>
  );
}
