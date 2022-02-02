import React, { useState } from "react";
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

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { GridContainer, GridItem } from "../../components/Grid";
import styles from "./styles";

const useStyles = makeStyles(styles);


export default function MlcRevisit(props) {
  const classes = useStyles();
  var mlcTypes = props.mlcTypes;

  var mlcUuid = props.mlcUuid;
  var formValues = props.formValues;
  var formErrors = props.formErrors;
  var Autocomplete = props.Autocomplete;
  var mlcYesUuid = props.mlcYesUuid;
  var parentID = mlcYesUuid;

  var visitAttributeData = {
  attributeType: mlcUuid,
  value:"",
  }

  var dataType = "Coded"
  var surgical_level_1 = mlcTypes;
//   var uuid = data.uuid;
  var SURGICAL = "MLC Yes*"
  var NO_SURGICAL = "MLC No"
  var [showSurgical, setShowSurgical] = useState(false);
  var [showNonSurgical, setShowNonSurgical] = useState(false);
  var [surgicalUuid, setSurgicalUuid] = useState("");
  var [nonfamilyUuid,setNonfamilyUuid] = useState("")
  var [surgicalDetails, setSurgicalDetails] = useState([]);
  var [nonfamilyDetails, setNonfamilyDetails] = useState([]);
  var uuidList = [];
  var [allsurgicaluuid, setAllsurgicaluuid] = useState([]);
  var [mlcRequest, setMlcRequest] = useState(visitAttributeData)
  var mlcList = ["Poisoning", "Suicide", "Accident", "Burns"]

  surgical_level_1.forEach(function (item, index) {
      if (item.display == SURGICAL) {
        if (surgicalDetails.length == 0) {
          setSurgicalUuid(item.uuid)
          setSurgicalDetails(item.answers)
        }
      }
  });


    function validateAutocomplete() {
        props.validateAutocomplete()
    }

    function onAutocompleteChange() {
        props.onAutocompleteChange()
    }


    const handleChange = (event,cVal) => {
    var btnid = event.target.id
    var btnvalue = event.target.value
    var cVal = {
      "attributeType": mlcUuid,
      "value":btnvalue
    }


    if (btnvalue == SURGICAL) {
        // setParentID(btnid);
      setShowSurgical(true);
      setShowNonSurgical(false);
      surgicalDetails.forEach(function (itemva, index) {
        uuidList.push(itemva.uuid)
        setAllsurgicaluuid(uuidList);
        itemva.answers.forEach(function (itemvas, index) {
          uuidList.push(itemvas.uuid)
          setAllsurgicaluuid(uuidList);
          itemvas.answers.forEach(function (itemvasl, index) {
            uuidList.push(itemvasl.uuid)
            setAllsurgicaluuid(uuidList);
        });
        });
      });
      }
      else if (mlcList.includes(btnvalue)) {
      cVal = {
      "attributeType": parentID,
      "value":btnvalue
    }
      }
    else if (btnvalue == NO_SURGICAL) {
      setShowNonSurgical(true);
      setShowSurgical(false);
    //   props.onDelete(event,allsurgicaluuid)
    }
    props.onChange(event,cVal)
  };


    return (

        <TableRow>
        <TableCell colSpan={2} className="MuiTableCell-alignLeft">
        <Typography>MEDICO LEGAL CASE</Typography>
        </TableCell>
        <TableCell >
          <GridItem >
          <FormControl component="fieldset">
          <RadioGroup row aria-label="gender" name="row-radio-buttons-group" defaultValue={"MLC No"}>
          {mlcTypes.map((smoker, index) => (
          <FormControlLabel
          value={smoker.display}
          control={<Radio id={smoker.uuid}
          onChange={handleChange}
          />}
          label={smoker.display.split(" ")[1]}
          className="yesClass"
          id={smoker.uuid}
          />
          ))}
          </RadioGroup>

          <RadioGroup row aria-label="yes" name="row-radio-buttons-group">
          {showSurgical &&
          surgicalDetails.map((item2, index) => (
          <FormControlLabel
          value={item2.display}
          control={<Radio id={item2.uuid}
          onChange={handleChange}
          />}
          label={item2.display}
          className="yesClass"
          id={item2.uuid}
          />
          ))
          }
          </RadioGroup>


          </FormControl>

{/*
        <Autocomplete
        id="Medico Legal Case*"
        options={mlcTypes}
        getOptionLabel={(option) => option.display}
        onChange={(e, newValue) => {
        onAutocompleteChange("Medico Legal Case*", newValue);
        }}
        onBlur={(e) =>
        validateAutocomplete(
        "Medico Legal Case*",
        formValues["Medico Legal Case*"]
        )
        }
        value={formValues["Medico Legal Case*"]}
        getOptionSelected={(option, value) =>
        option.uuid === value.uuid
        }
        defaultValue={formValues["Medico Legal Case*"]}
        className={classes.field}
        renderInput={(params) => (
        <TextField
        {...params}
        name="Medico Legal Case*"
        label="Medico Legal Case"
        variant="outlined"
        error={formErrors["Medico Legal Case"] ? true : false}
        helperText={formErrors["Medico Legal Case"]}
        />
        )}
                    /> */}




        </GridItem>
            </TableCell>


        </TableRow>



    )
}
