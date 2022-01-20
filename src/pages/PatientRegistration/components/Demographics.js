import React, { useState } from "react";
import {
  TextField,
  Tooltip,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { GridItem } from "../../../components/Grid";
import { calculateAge } from "../../../utils/commons";

const genderOptions = [
  { name: "Male", value: "M" },
  { name: "Female", value: "F" },
  { name: "Others", value: "O" },
];

function Demographics(props) {
  const {
    identifier,
    formValues,
    classes,
    onTextChange,
    onAutocompleteChange,
    onPhoneChange,
    setFormValues,
    formErrors,
    validateText,
    validateAutocomplete,
    validatePhone,
  } = props;
  const [error, setError] = useState(false);

  const handleDateChange = (date, value) => {
    let age = undefined;
    if (date?._isValid) {
      console.log(date);
      age = calculateAge(date);
    }

    setFormValues({
      ...formValues,
      "Date of Birth": date,
      "Age*": age ? age : formValues["Age*"],
    });
  };

  const onAgeChange = (e) => {
    const { name, value } = e.target;
    const regex = /^[0-9]+(y|Y|m|M|w|W|d|D)$/;

    setFormValues({ ...formValues, [name]: value });
    validateText(e);

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
    setFormValues({
      ...formValues,
      "Age*": value,
      "Date of Birth": new Date(dob),
    });
  };

  return (
    <>
      <GridItem item xs={12} sm={12} md={12}>
        <Typography variant="subtitle1">
          Patient Identifier : {identifier}
        </Typography>
      </GridItem>
      <GridItem item xs={12} sm={6} md={4}>
        <Tooltip title="First Name of the person" arrow>
          <TextField
            name="First Name*"
            variant="outlined"
            label="First Name*"
            value={formValues["First Name*"]}
            autoFocus
            onChange={onTextChange}
            onBlur={validateText}
            className={classes.field}
            fullWidth
            error={formErrors["First Name*"] ? true : false}
            helperText={formErrors["First Name*"]}
          />
        </Tooltip>
      </GridItem>
      <GridItem item xs={12} sm={6} md={4}>
        <TextField
          name="Middle Name"
          variant="outlined"
          label="Middle Name"
          value={formValues["Middle Name"]}
          onChange={onTextChange}
          className={classes.field}
          fullWidth
        />
      </GridItem>
      <GridItem item xs={12} sm={6} md={4}>
        <TextField
          name="Last Name*"
          variant="outlined"
          label="Last Name*"
          value={formValues["Last Name*"]}
          onChange={onTextChange}
          onBlur={validateText}
          className={classes.field}
          fullWidth
          error={formErrors["Last Name*"] ? true : false}
          helperText={formErrors["Last Name*"]}
        />
      </GridItem>
      <GridItem item xs={12} sm={6} md={4}>
        <Tooltip
          title="Example: for 10 years enter 10y or for 10 months enter 10m or for 10 days enter 10d"
          arrow
        >
          <TextField
            name="Age*"
            variant="outlined"
            label="Age*"
            placeholder="Enter age in 20y or 10m or 20d"
            value={formValues["Age*"]}
            onChange={onAgeChange}
            onBlur={validateText}
            className={classes.field}
            fullWidth
            error={error || formErrors["Age*"] ? true : false}
            helperText={error ? "Invalid Input" : formErrors["Age*"]}
          />
        </Tooltip>
      </GridItem>
      <GridItem item xs={12} sm={6} md={4}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            fullWidth
            name="Date of Birth"
            style={{ marginTop: 8 }}
            disableFuture
            allowKeyboardControl
            autoOk
            inputVariant="outlined"
            openTo="year"
            format="DD/MM/yyyy"
            label="Date of Birth"
            views={["year", "month", "date"]}
            value={formValues["Date of Birth"]}
            onChange={handleDateChange}
            className={classes.field}
          />
        </MuiPickersUtilsProvider>
      </GridItem>
      <GridItem item xs={12} sm={6} md={4}>
        <Autocomplete
          className={classes.field}
          style={{ marginTop: 8 }}
          options={genderOptions.map((gender) => gender)}
          getOptionLabel={(option) => option.name}
          onChange={(e, newValue) => {
            onAutocompleteChange("Gender*", newValue);
          }}
          onBlur={(e) => validateAutocomplete("Gender*", formValues["Gender*"])}
          value={formValues["Gender*"]}
          getOptionSelected={(option, value) => option.value === value.value}
          defaultValue={formValues["Gender*"]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Gender*"
              variant="outlined"
              error={formErrors["Gender*"] ? true : false}
              helperText={formErrors["Gender*"]}
            />
          )}
        />
      </GridItem>
      <GridItem item xs={12} sm={6} md={4}>
        <PhoneInput
          containerStyle={{
            marginTop: 8,
            color: formErrors["Phone Number*"] ? "red" : "rgba(0, 0, 0, 0.54)",
          }}
          inputProps={{
            name: "Phone Number*",
          }}
          countryCodeEditable={false}
          inputStyle={{ width: "100%" }}
          inputClass={formErrors["Phone Number*"] && classes.phoneField}
          country={"in"}
          specialLabel="Phone Number*"
          value={formValues["Phone Number*"]}
          onChange={onPhoneChange}
          onBlur={(e, data) =>
            validatePhone(e, data, formValues["Phone Number*"])
          }
          containerClass={classes.field}
        />
        <FormHelperText className={classes.phoneFieldHelperText} error>
          {formErrors["Phone Number*"]}
        </FormHelperText>
      </GridItem>
    </>
  );
}

export default Demographics;
