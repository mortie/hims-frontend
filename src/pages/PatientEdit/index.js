import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAPI, postAPI,getaddressAPI } from "../../services/index";
import { Autocomplete } from "@material-ui/lab";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { GridContainer, GridItem } from "../../components/Grid";
import BasicDetails from "./components/Demographics";
import PrintPatientRegistration from "./components/PrintPatientRegistration";
import AvailableTimeSlots from "./components/AvailableTimeSlots";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import moment from "moment";

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
import TextFieldComponent from "./components/TextFieldComponent";
import {
  HOSPITAL_DISTRICT,
  HOSPITAL_NAME,
  MPI_ID,
  PATIENT_UPDATED,
  PERSON_UPDATED,
  District_Dropdown,
  BASE_URL
} from "../../utils/constants";
import { useSnackbar } from "notistack";


const useStyles = makeStyles(styles);

const initialSate = {
  "First Name*": "",
  "Middle Name": "",
  "Last Name*": "",
  "Age*": "",
  "Date of Birth": null,
  "Gender*": null,
  "Phone Number*": null,
  "State" :"Himachal Pradesh",
  "District":District_Dropdown
};

export default function PatientEdit(props) {
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
  const [addressfields, setaddessfields]=useState([]);
  const [districtfields, setdistrictfields]=useState([]);
  const [cityfields, setcityfields]=useState([]);
  const [stateisselected, setstateisselected] = useState(false);
  const [patiendID, setPatientID] = useState(props.match.params.id);
  let [pUuid, setPUuid] = useState("");
  let [registeredDetails, setRegisteredDetails] = useState([]);
  let [nationalID, setNationnalID] = useState([]);
  let [bloodG, setBloodG] = useState([]);
  let [occpList, setOccpList] = useState([]);
  let [mrsList, setMrsList] = useState([]);
  let [nation, setNation] = useState([])
  let [rela, setRela] = useState([]);
  const [value, setValue] = useState();
    const { enqueueSnackbar } = useSnackbar();


  const [error, setError] = useState(false);


    const onAgeEdit = (name,value) => {

    const regex = /^[0-9]+(y|Y|m|M|w|W|d|D)$/;

    if (value === "") {
      setError(false);
      return;
    }

    if (!regex.test(value)) {
      setError(true);
      return;
    }

    setError(false);

    const age = value.slice(0, -1);
    const lastCharacter = value[value.length - 1];
    let dob = moment().format("DD/MM/yyyy");

    switch (lastCharacter.toLowerCase()) {
      case "y":
        dob = moment().subtract(age, "years");
        break;
      case "m":
        dob = moment().subtract(age, "months");
        break;
      case "w":
        dob = moment().subtract(age, "weeks");
        break;
      case "d":
        dob = moment().subtract(age, "days");
        break;
      default:
        break;
    }

    formValues["Age*"] = value
    formValues["Date of Birth"] = new Date(dob)

  };


  useEffect(() => {
    getAPI(
      `/concept?q="Registration Attribute"&v=custom:(answers:(display,answers:(uuid,display,datatype:(display),synonyms:(display),names:(display,conceptNameType),answers:(uuid,display,datatype:(display),names:(display,conceptNameType),answers:(uuid,display,datatype:(display),names:(display,conceptNameType),answers:(uuid,display,datatype:(display),names:(display,conceptNameType)))))`
    )
      .then((response) => {
        const stapsWithContent = response.data.results[0].answers.filter(
          (stepWithContent) =>
            stepWithContent.answers.length >= 1 && stepWithContent
        );
        var idToRemoveList = ["Visit Info","Payment Info"]

        var finalLabels = stapsWithContent.filter((item) => !idToRemoveList.includes(item.display));
        setsteps([
          "Demographics",
          ...finalLabels.map((step) => step.display),
        ]);
        setStepsWithContent(finalLabels);
        var grouplist = []
        var nationalIDlist = []
        var occList = [];
        var mrList = [];
        var natList = [];
        var relList = [];
response.data.results.forEach(function(respData) {
respData.answers.map((result) => {
            result.answers.map((element) => {
              const { uuid, display, answers, datatype, synonyms, names } =
                element;
              if (display == "National ID*") {
                answers.map((nation) => {
                  nationalIDlist.push(nation)
                })
                setNationnalID(nationalIDlist)
              }
              else if (display == "Blood Group") {
                answers.map((group) => {
                  grouplist.push(group)
                })
                setBloodG(grouplist)
              }
              else if (display == "Occupation") {
                answers.map((occ) => {
                  occList.push(occ)
                })
                setOccpList(occList)
              }
              else if (display == "Marital Status") {
                answers.map((mr) => {
                  mrList.push(mr)
                })
                setMrsList(mrList)
              }
              else if (display == "Nationality") {
                answers.map((nat) => {
                  natList.push(nat)
                })
                setNation(natList)
              }
              else if (display == "Relationship") {
                answers.map((rela) => {
                  relList.push(rela)
                })
              }
            }

  )
                  setRela(relList)


})
  console.log(" >>>",rela)

})

      })
      .catch((error) => console.log(error));

    getAPI("/idgen/nextIdentifier?source=1")
      .then((response) => {
        if (patiendID) {
    setIdentifier(patiendID)
}
else {
   setIdentifier(response.data.results[0].identifierValue);
}

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

    const getAddress = async () => {
        const url = `/addresslist?address_name=address-hierarchy`;
        try{
          let address = (await getaddressAPI(url)).data;
          return address;
        }
        catch(error)
        {
          return null;
        }
      //return patient

    }
    getAddress();

    const fetchAddressData=  async () => {

      let fetchstateprovience=(await getAddress());
      setaddessfields([...fetchstateprovience.state_province]);
      //setdistrictfields(fetchstateprovience.state_province['county_district']);fetchstateprovience.state_province
      const newarr=fetchstateprovience.state_province.filter((item)=>{
        if(item.selected)
        {
          setdistrictfields([...item.county_district]);
        }
      });
      fetchstateprovience.state_province.map((item)=>{
        item.county_district.map((items)=>{
          if(items.name === District_Dropdown)
          {
            setcityfields(items.city_village)
          }
        });
      });

    }
    fetchAddressData();
  //  const getshortnameData= async () => {
  //   const url = "/conceptDetails/concept?concept=f2230777-cb6e-40f9-a249-ce262ed4a62c";
  //   try{
  //     let responsedata = (await getAPI(url)).data;
  //     console.log(responsedata.shortName);
  //   }
  //   catch(error)
  //   {
  //     return null;
  //   }
  //  }
  //  getshortnameData();

    getaddressAPI("/patient_search?name="+patiendID)
      .then((response) => {
        console.log(" Registered Data>>> ", response.data[0])

        var pResponse = response.data[0];
        setPUuid(pResponse.uuid)
        var nameR = pResponse.name;
        var firstN = "";
        var middleN = "";
        var lastN = "";
        var nameL = nameR.split(" ")
        if (nameR) {
            firstN = nameL[0]
          if (nameL.length == 3) {
            middleN = nameL[1]
            lastN = nameL[2]
          }
          else if (nameL.length == 2) {
            lastN = nameL[1]
          }
          else {
            lastN = nameL[-1]
          }
        }
        formValues["First Name*"] = firstN
        formValues["Middle Name"] = middleN
        formValues["Last Name*"] = lastN
        var ageV = pResponse.age + "y"
        onAgeEdit("Age*",ageV)

        if (response.data[0].gender == "M") {
          formValues["Gender*"] = { name: "Male", value: pResponse.gender }
        }
        else if (response.data[0].gender == "F") {
          formValues["Gender*"] = { name: "Female", value: pResponse.gender }
        }
        else {
          formValues["Gender*"] = { name: "Others", value: pResponse.gender }
        }
        formValues["Phone Number*"] = pResponse.person_attributes["Phone Number*"]
        formValues["Relative Name*"] = pResponse.person_attributes["Relative Name*"]
        formValues["Next of Kin Phone Number*"] = pResponse.person_attributes["Next of Kin Phone Number*"]


        formValues["Town/City"] = { name: pResponse.address["City Village"] }
        formValues["Postal Address"] = pResponse.address["Address1"]
        formValues["Postal Code"] = pResponse.address["Postal Code"]
        formValues["State"] = pResponse.address["State Province"]

        setRegisteredDetails(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });



  }, []);

  useEffect(() => {

        setValue({});

    getaddressAPI("/patient_search?name="+patiendID)
      .then((response) => {
        console.log(" Registered Data>>> ", response.data[0])

        var pResponse = response.data[0];
        setPUuid(pResponse.uuid)

        console.log(" Blood G ",bloodG,nationalID,mrsList,rela)
          if (pResponse.person_attributes["Blood Group"]) {
            bloodG.map((gr) => {
              if (gr.display == pResponse.person_attributes["Blood Group"]) {
                formValues["Blood Group"] = gr
              }
            })
          }
          if (pResponse.person_attributes["Aadhar*"]) {
            nationalID.map((nt) => {
              if (nt.display == "Aadhar*") {
                formValues["National ID*"] = nt
                formValues["Aadhar*"] = pResponse.person_attributes["Aadhar*"]
              }
            })
          }
          if (pResponse.person_attributes["Occupation"]) {
            occpList.map((oc) => {
              if (oc.display == pResponse.person_attributes["Occupation"]) {
                formValues["Occupation"] = oc
              }
            })
          }
          if (pResponse.person_attributes["Marital Status"]) {
            mrsList.map((mrs) => {
              if (mrs.display == pResponse.person_attributes["Marital Status"]) {
                formValues["Marital Status"] = mrs
              }
            })
          }
          if (pResponse.person_attributes["Nationality"]) {
            nation.map((nt) => {
              if (nt.display == pResponse.person_attributes["Nationality"]) {
                formValues["Nationality"] = nt
              }
            })
        }
        if (pResponse.person_attributes["Relationship"]) {
            rela.map((relas) => {
              if (relas.display == pResponse.person_attributes["Relationship"]) {
                formValues["Relationship"] = relas
              }
            })
          }




        setRegisteredDetails(response.data.results);
                setValue({});

      })
      .catch((error) => {
        console.log(error);
      });



  }, [activeStep]);



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
              const { uuid, display, answers, datatype, synonyms, names } =
                element;

              const labelName = getLabelName(names) || display;
              if (!formValues.hasOwnProperty(display)) {
                setFormValues({
                  ...formValues,
                  [display]: datatype.display === "Text" ? "" : null,
                });
              }
              if (datatype.display === "Text") {
                return (
                  <TextFieldComponent
                    key={uuid}
                    display={display}
                    labelName={labelName}
                    formValues={formValues}
                    formErrors={formErrors}
                    classes={classes}
                    autoFocus={index === 0}
                    onTextChange={
                      checkSynonym(synonyms, "email")
                        ? onEmailChange
                        : onTextChange
                    }
                    validateText={
                      checkSynonym(synonyms, "email")
                        ? validateEmail
                        : validateText
                    }
                  />
                );
              }

              if (datatype.display === "Numeric") {
                if (checkSynonym(synonyms, "mobile")) {
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
                        specialLabel={labelName}
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
                      label={labelName}
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

                if(display === 'State')
                {
                  return (
                    <React.Fragment>
                      <AutocompleteComponent
                        display={display}
                        labelName={getLabelName(names) || display}
                        answers={addressfields}
                        formErrors={formErrors}
                        formValues={formValues}
                        autoFocus={index === 0}
                        classes={classes}
                        onAutocompleteAddressChange={onAutocompleteAddressChange}
                        validateAutocomplete={validateAutocomplete}

                      />

                    </React.Fragment>
                  );
                }
                else if(display === 'District')
                {
                  return (
                    <AutocompleteComponent
                    display={display}
                    labelName={getLabelName(names) || display}
                    answers={districtfields}
                    formErrors={formErrors}
                    formValues={formValues}
                    autoFocus={index === 0}
                    classes={classes}
                    onAutocompleteDistrictChange={onAutocompleteDistrictChange}
                    validateAutocomplete={validateAutocomplete}
                  />
                  );

                }
                else if(display === 'Town/City')
                {
                  return (
                    <AutocompleteComponent
                    display={display}
                    labelName={getLabelName(names) || display}
                    answers={cityfields}
                    formErrors={formErrors}
                    formValues={formValues}
                    autoFocus={index === 0}
                    classes={classes}
                    onAutocompleteChange={onAutocompleteChange}
                    validateAutocomplete={validateAutocomplete}

                  />
                  );

                }
                else{
                  return (

                    <React.Fragment key={uuid}>
                      <AutocompleteComponent
                        display={display}
                        labelName={getLabelName(names) || display}
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
                          labelName={
                            getLabelName(formValues[display].names) ||
                            formValues[display].display
                          }
                          answers={formValues[display].answers}
                          formErrors={formErrors}
                          formValues={formValues}
                          autoFocus={true}
                          classes={classes}
                          onAutocompleteChange={onAutocompleteChange}
                          validateAutocomplete={validateAutocomplete}
                        />
                      )}

                      {formValues[display]?.datatype?.display === "Text" && (
                        <TextFieldComponent
                          display={formValues[display].display}
                          labelName={
                            getLabelName(formValues[display].names) ||
                            formValues[display].display
                          }
                          formValues={formValues}
                          formErrors={formErrors}
                          classes={classes}
                          autoFocus={index === 0}
                          onTextChange={onTextChange}
                          validateText={validateText}
                        />
                      )}

                      {formValues[formValues[display]?.display]?.datatype
                        ?.display === "Coded" && (
                        <AutocompleteComponent
                          display={
                            formValues[formValues[display]?.display]?.display
                          }
                          labelName={
                            getLabelName(
                              formValues[formValues[display]?.display]?.names
                            ) || formValues[formValues[display]?.display]?.display
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
                      ]?.datatype?.display === "Numeric" && (
                        <TextFieldComponent
                          display={
                            formValues[
                              formValues[formValues[display]?.display]?.display
                            ]?.display
                          }
                          labelName={
                            getLabelName(
                              formValues[
                                formValues[formValues[display]?.display]?.display
                              ]?.names
                            ) ||
                            formValues[
                              formValues[formValues[display]?.display]?.display
                            ]?.display
                          }
                          formValues={formValues}
                          formErrors={formErrors}
                          classes={classes}
                          autoFocus={index === 0}
                          onTextChange={onTextChange}
                          validateText={validateText}
                        />
                      )}
                    </React.Fragment>
                  );
                }
              }
              return null;
            })}

          </>
        )}
      </GridContainer>
    );
  }

  function getLabelName(names) {
    const shortName = names.filter((name) => name.conceptNameType === "SHORT");
    return shortName.length ? shortName[0].display : null;
  }
  // function getSpecifiyFielddata(field,obj) {
  //   if(field === 'State')
  //   {
  //     return [...obj.state_province];
  //   }
  //   else if(field === 'District')
  //   {

  //     return [...obj.state_province];
  //   }
  //   else{
  //     let arrvillage=[];
  //     obj.state_province.map((elem)=>{
  //     elem.county_district.map((items)=>{
  //      items.city_village.map((viallage)=>{
  //       arrvillage.push(viallage);
  //      });
  //     });
  //     });
  //     return arrvillage;
  //   }
  // }
  function getTimeSlots(type) {
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
      console.log(" Auto compelteee : ", newValue, display);
      setFormValues({
        ...formValues,
        [newValue.display]: null,
        [display]: newValue,
      });
    } else if (newValue?.datatype?.display === "Text") {
            console.log(" Auto compelteee  Test: ", newValue, display);

      setFormValues({
        ...formValues,
        [newValue.display]: "",
        [display]: newValue,
      });
    } else {
            console.log(" Auto compelteee ELSE : ", newValue, display);

      setFormValues({ ...formValues, [display]: newValue });
    }

    validateAutocomplete(display, newValue);
  }
  function onAutocompleteAddressChange(display, newValue) {


       setFormValues({ ...formValues, [display]: newValue });
       setstateisselected(true);
       if(newValue?.county_district)
       {
         setdistrictfields(newValue["county_district"]);
       }
       else{

       }

     validateAutocomplete(display, newValue);
   }
   function onAutocompleteDistrictChange(display, newValue) {

       setFormValues({ ...formValues, [display]: newValue });
       if(newValue?.city_village)
       {
         setcityfields(newValue["city_village"]);
       }
       else{

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

    if (name.slice(-1) === "*") {
      if (!value || value === "") {
        setFormErrors({ ...formErrors, [name]: "This field is required" });
      }
      else {
        const errors = formErrors;
        delete errors[name];
        setFormErrors(errors);
      }
      if(name === "First Name*" || name === "Last Name*" || name === "Relative Name*")
      {
        validateName(name,value);
      }
      if(name === "Aadhar*")
      {
        validateAadhar(name,value);
      }
    }
  }
  function validateName(name,value)
  {
   const regexname = /^[a-zA-Z\s]*$/;
     if (!regexname.test(value)) {
        setFormErrors({ ...formErrors, [name]: "Only alphabets are allowed" });
      }
  }
  function validateAadhar(name,value)
  {

     if (value.length  > 12 || value.length < 12) {
        setFormErrors({ ...formErrors, [name]: "Only 12 digits are allowed" });
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

  function checkSynonym(synonyms, synonym) {
    const result = synonyms.filter(
      (synm) => synm.display.toLowerCase() === synonym
    );

    return result.length;
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
            cityVillage: formValues["Town/City"]===null?"":formValues["Town/City"].name,
            stateProvince: formValues["State"],
            postalCode: formValues["Postal Code"],
            countyDistrict: formValues["District"]===District_Dropdown?District_Dropdown:formValues["District"].name,
          },
        ],
        attributes: [
          {
            attributeType: HOSPITAL_NAME,
            value: "Deendyal Upadhyay Zonal Hospital",
          },
          {
            attributeType: PERSON_UPDATED,
            value: "PERNO",
          },
          {
            attributeType: PATIENT_UPDATED,
            value: "PATNO",
          },
          {
            attributeType: MPI_ID,
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

    // let location = timeSlots.filter(
    //   (element) => selectedTimeSlot === element.uuid
    // );

    // let visit = {
    //   visitType: "7b0f5697-27e3-40c4-8bae-f4049abfb4ed",
    //   location: location[0].appointmentBlock.location.uuid,
    //   attributes: getAttributes(visitAttributeTypes),
    // };

    postAPI("/patient/"+pUuid, patient)
      .then((patientResponse) => {
        console.log("Patient Values :", patientResponse);
        var successmsj = "success"
        enqueueSnackbar("Patient Data Edited Successfully.", {successmsj});


        // visit.patient = patientResponse.data.uuid;
        // postAPI("/visit", visit)
        //   .then((visitResponse) => {
        //             console.log(" Visit Data :",visitResponse)

        //     postAPI("/appointmentscheduling/appointment", {
        //       appointmentType: formValues["Department*"].uuid,
        //       patient: patientResponse.data.uuid,
        //       reason: "New Registration",
        //       status: "Scheduled",
        //       timeSlot: selectedTimeSlot,
        //       visit:visitResponse.data.uuid,
        //     })
        //       .then((appointmentResponse) => {

        //         setRegistrationSuccessData({
        //           appointmentData: appointmentResponse.data,
        //           visitData: visitResponse.data,
        //         });
        //       })
        //       .catch((appointmentRequestError) => {
        //         console.log(appointmentRequestError);
        //       });
        //   })
        //   .catch((visitRequestError) => {
        //     console.log(visitRequestError);
        //   });
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
                        Object.keys(formErrors).length > 0
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
