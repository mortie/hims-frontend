import React, { useState } from "react";
import {
    Paper,
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

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { getAPI, postAPI,getaddressAPI } from "../../services/index";
import AvailableTimeSlots from "./../PatientRegistration/components/AvailableTimeSlots";



import { GridContainer, GridItem } from "../../components/Grid";
import styles from "./../PatientRegistration/styles";
const useStyles = makeStyles(styles);

export default function DepartmentRevisit(props) {
      const classes = useStyles();
  var appointmentTypes = props.appointmentTypes;
    var departmentName = props.departmentName;
    var mlcUuid = props.mlcUuid;
    var formValues = props.formValues;
    var formErrors = props.formErrors;
    var Autocomplete = props.Autocomplete;
  
    function validateAutocomplete(display, value) {
        props.validateAutocomplete(display, value)
    }

    function onAutocompleteChange(display, newValue) {
        props.onAutocompleteChange(display, newValue)
    }

  const getTimeSlots = (type) => {
    props.getTimeSlots(type)
  }

    return (

      <TableRow>
        <TableCell colSpan={2} className="MuiTableCell-alignLeft">
          <Typography>DEPARTMENT NAME</Typography>
        </TableCell>
      <TableCell colSpan={2}>
                <GridItem >
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
        "Department",
        formValues["Department"]
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
        label={departmentName}
        variant="outlined"
        error={formErrors["Department"] ? true : false}
        helperText={formErrors["Department"]}
        fullWidth
        />
        )}
        />
        </GridItem>
      </TableCell>
      </TableRow>

    );
}
