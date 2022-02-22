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

  makeStyles,
} from "@material-ui/core";
import TextField from '@mui/material/TextField';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



import { GridContainer, GridItem } from "../../components/Grid";
import styles from "./styles";
    const useStyles = makeStyles(styles);


export default function PcRevisit(props) {
    const classes = useStyles();

    var patientCategoryTypes = props.patientCategoryTypes;
    var formValues = props.formValues;
    var formErrors = props.formErrors;
    var Autocomplete = props.Autocomplete;

  var data = props.answer;
  var pcUuid = props.pcUuid
  var paidUuid = props.paidUuid;
  var prUuid = props.prUuid;
  var freeUuid = props.freeUuid;
  var patientC = props.patientC
  var patientC1 = props.patientC1
  var patientC2 = props.patientC2
    //   var dataType = props.answer.datatype.display
    var pc_level_1 = patientCategoryTypes;

    var savedValues = props.savedValues;
    //   var uuid = data.uuid;
    var PAID_CATEGORY = "Paid category*"
    var PROGRAMS = "Programs*"
    var FREE_CATEGORY = "Free category*"


    var [showPc, setShowPc] = useState(false);
    var [showPcSub, setShowPcSub] = useState(false);
    var [showPrograms, setShowPrograms] = useState(false);
    var [showSubPrograms, setShowSubPrograms] = useState(false);
    var [showFree, setShowFree] = useState(false)
    var [showFreeSub, setShowFreeSub] = useState(false)
    var [showCash, setShowCash] = useState(false);

    var paid_list = ["General Category*", "Insurance*"]
    var programList = ["Antenatal*", "Immunization*", "MDR*", "Non MDR*"]
    var free_list = ["BPL*", "MS Recommended", "FDSI", "Staff"]
    var cash = "Cash"
  var [drugUuid, setDrugUuid] = useState("");
    var [nondrugUuid, setNonDrugUuid] = useState("")

    var [pcDetails, setPcDetails] = useState([]);
    var [pcSubDetails, setPcSubDetails] = useState([]);
    var [programDetails, setProgramDetails] = useState([]);
    var [programSubDetails, setProgramSubDetails] = useState([]);
    var [freeDetails, setFreeDetails] = useState([]);
  var [freeSubDetails, setFreeSubDetails] = useState([]);
  var [parentID, setParentID] = useState("");
  var [subParentID, setSubParentID] = useState("");
  var [cashID, setCashID] = useState("");


  var uuidList = [];
  var [alldruguuid, setAlldruguuid] = useState([]);

    var [concetVal, setConcetVal] = useState({ "concept": "", "value": "" });


    function validateAutocomplete() {
        props.validateAutocomplete()
    }

    function onAutocompleteChange() {
        props.onAutocompleteChange()
    }

    pc_level_1.forEach(function (item, index) {
    if (item.display == PAID_CATEGORY) {
      if (pcDetails.length == 0) {
        setDrugUuid(item.uuid)
          setPcDetails(item.answers)
          item.answers.forEach(function (item2, index2) {
              if (paid_list.includes(item2.display)) {
                    setPcSubDetails(item2.answers)
              }
          })
      }
    }
    else if (item.display == PROGRAMS) {

      if (programDetails.length == 0) {
        setNonDrugUuid(item.uuid)
          setProgramDetails(item.answers)
            item.answers.forEach(function (item6, index2) {
              if (programList.includes(item6.display)) {
                    setProgramSubDetails(item6.answers)
              }
          })

      }
    }
    else if (item.display == FREE_CATEGORY) {
      if (freeDetails.length == 0) {
        setNonDrugUuid(item.uuid)
          setFreeDetails(item.answers)
            item.answers.forEach(function (item8, index2) {
              if (free_list.includes(item8.display)) {
                    setFreeSubDetails(item8.answers)
              }
          })

      }
    }
  });

  const handleCash = (event, cVal) => {
        var btnvalue = event.target.value

        var cVal = {
      "attributeType": cashID,
      "value":btnvalue
        }
        props.onChange(event,cVal)

  }

  const handleChange = (event,cVal) => {
    var btnid = event.target.id
    var btnvalue = event.target.value
    var cVal = {
      "attributeType": pcUuid,
      "value":btnvalue
    }
  if (btnvalue == PAID_CATEGORY) {
      setParentID(paidUuid)
      setShowPc(true);
        setShowPrograms(false);
        setShowFree(false);
        setShowPcSub(false)
        setShowSubPrograms(false);
        setShowFreeSub(false);
        setShowCash(false);

      pcDetails.forEach(function (itemva, index) {
        uuidList.push(itemva.uuid)
        setAlldruguuid(uuidList);
      });
    }
        else if (btnvalue == cash) {
            cVal = {
      "attributeType": subParentID,
      "value":btnvalue
            }
          setCashID(btnid)
        setShowPc(false);
        setShowPrograms(false);
        setShowFree(false);
        setShowPcSub(false)
        setShowSubPrograms(true);
        setShowFreeSub(false);
        setShowCash(true);
      pcDetails.forEach(function (itemva, index) {
        uuidList.push(itemva.uuid)
        setAlldruguuid(uuidList);
      });
        }
        else if (btnvalue == "Free") {
                      cVal = {
      "attributeType": subParentID,
      "value":btnvalue
                      }
                  setShowCash(false);

        }
      else if (btnvalue == "Credit") {
                      cVal = {
      "attributeType": subParentID,
      "value":btnvalue
                      }
                  setShowCash(false);

          }
        else if (paid_list.includes(btnvalue)) {
                cVal = {
      "attributeType": parentID,
      "value":btnvalue
                }
        setSubParentID(btnid)
        setShowPc(false);
        setShowPrograms(false);
        setShowFree(false);
        setShowPcSub(true);
        setShowSubPrograms(false);
        setShowFreeSub(false);
        setShowCash(false);

      pcDetails.forEach(function (itemva, index) {
        uuidList.push(itemva.uuid)
        setAlldruguuid(uuidList);
      });
    }
        else if (programList.includes(btnvalue)) {
                          cVal = {
      "attributeType": parentID,
      "value":btnvalue
                          }
                  setSubParentID(btnid)
        setShowPc(false);
        setShowPrograms(false);
        setShowFree(false);
        setShowPcSub(false);
        setShowSubPrograms(true);
                setShowFreeSub(false);
        setShowCash(false);

      pcDetails.forEach(function (itemva, index) {
        uuidList.push(itemva.uuid)
        setAlldruguuid(uuidList);
      });
    }
        else if (free_list.includes(btnvalue)) {
                          cVal = {
      "attributeType": parentID,
      "value":btnvalue
                          }
                  setSubParentID(btnid)
        setShowPc(false);
        setShowPrograms(false);
        setShowFree(false);
        setShowPcSub(false);
        setShowSubPrograms(false);
        setShowFreeSub(true);
                setShowCash(false);

      pcDetails.forEach(function (itemva, index) {
        uuidList.push(itemva.uuid)
        setAlldruguuid(uuidList);
      });
    }
        else if (btnvalue == PROGRAMS) {
                setParentID(prUuid)

      setShowPrograms(true);
        setShowPc(false);
                setShowFree(false);
        setShowPcSub(false)
        setShowSubPrograms(false);
        setShowFreeSub(false);
        setShowCash(false);

      programDetails.forEach(function (itemva, index) {
        uuidList.push(itemva.uuid)
        setAlldruguuid(uuidList);
      });
    }
        else if (btnvalue == FREE_CATEGORY) {
                setParentID(freeUuid)

      setShowPrograms(false);
        setShowPc(false);
        setShowFree(true);
                setShowPcSub(false)
        setShowSubPrograms(false);
        setShowFreeSub(false);
        setShowCash(false);

      freeDetails.forEach(function (itemva, index) {
        uuidList.push(itemva.uuid)
        setAlldruguuid(uuidList);
      });
    //   props.onDelete(event,alldruguuid)
    }
    else {
                setShowCash(false);

          }

    props.onChange(event,cVal)
      };


    return (


        <TableRow>
              <TableCell >
                <Typography>PATIENT CATEGORY</Typography>
            </TableCell>
              <TableCell colSpan={2}>
                <GridItem >


          <FormControl component="fieldset">
              <RadioGroup row aria-label="gender"
                name="row-radio-buttons-group"
                defaultValue={patientC}
              >
          {patientCategoryTypes.map((smoker, index) => (
          <FormControlLabel
          value={smoker.display}
          control={<Radio
          id={smoker.uuid}
          onChange={handleChange}

          />}
          label={smoker.display}
          className="yesClass"
          id={smoker.uuid}
          />
          ))}
          </RadioGroup>



              <RadioGroup row aria-label="yes"
                defaultValue={patientC1}
                name="row-radio-buttons-group">
          {showPc &&
          pcDetails.map((item2, index) => (
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

        {showPcSub &&
          pcSubDetails.map((item5, index) => (
          <FormControlLabel
          value={item5.display}
          control={<Radio id={item5.uuid}
          onChange={handleChange}
          />}
          label={item5.display}
          className="yesClass"
          id={item5.uuid}
          />
          ))
        }


          {showPrograms &&
              programDetails.map((item3, index) => (
                            <FormControlLabel
          value={item3.display}
          control={<Radio id={item3.uuid}
          onChange={handleChange}
          />}
          label={item3.display}
          className="yesClass"
          id={item3.uuid}
          />
              ))
                            }



        {showSubPrograms &&
          programSubDetails.map((item7, index) => (
          <FormControlLabel
          value={item7.display}
          control={<Radio id={item7.uuid}
          onChange={handleChange}
          />}
          label={item7.display}
          className="yesClass"
          id={item7.uuid}
              >
              </FormControlLabel>

          ))
                            }


        {showFreeSub &&
          freeSubDetails.map((item9, index) => (
          <FormControlLabel
          value={item9.display}
          control={<Radio id={item9.uuid}
          onChange={handleChange}
          />}
          label={item9.display}
          className="yesClass"
          id={item9.uuid}
              >
        </FormControlLabel>
          ))

        }

                      {showFree &&
              freeDetails.map((item4, index) => (
                            <FormControlLabel
          value={item4.display}
          control={<Radio id={item4.uuid}
          onChange={handleChange}
          />}
          label={item4.display}
          className="yesClass"
          id={item4.uuid}
          />
              ))
                            }


                        </RadioGroup>


          <RadioGroup row aria-label="yes" name="row-radio-buttons-group">

                            {showCash &&
                                <TextField
                                    id="filled-number"
                                    label="Amount"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                  variant="filled"
                  onChange={handleCash}
                                />
                            }
</RadioGroup>
          </FormControl>




                {/* <Autocomplete
                  id="Patient Category*"
                  options={patientCategoryTypes}
                  getOptionLabel={(option) => option.display}
                  onChange={(e, newValue) => {
                    onAutocompleteChange("Patient Category*", newValue);
                    // getTimeSlots(newValue);
                  }}
                  onBlur={(e) =>
                    validateAutocomplete(
                      "Patient Category*",
                      formValues["Patient Category*"]
                    )
                  }
                value={formValues["Patient Category*"]}
                  getOptionSelected={(option, value) =>
                    option.uuid === value.uuid
                  }
                defaultValue={formValues["Patient Category*"]}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="Patient Category*"
                      label="Patient Category"
                      variant="outlined"
                      error={formErrors["Patient Category"] ? true : false}
                      helperText={formErrors["Patient Category"]}
                    />
                  )}
                    /> */}




              </GridItem>
              </TableCell>

                    </TableRow>

    )
}
