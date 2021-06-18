import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Collapse } from 'antd';
import { Select } from 'antd';
import { GridContainer, GridItem } from "../../components/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ImmunizationTable from './components/immunization_history'
import RadioButtonsGroup from './components/medication_history'
import DatePickers from './components/surgical_history'
import PS_History from './components/ps_history'
import FamilyHistory from './components/family_history'
import AllergyHistory from './components/allergy_history'



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

const { Panel } = Collapse;

const ControlledAccordions = (props) => {
  const classes = useStyles();
  var [immunization, setImmunization] = useState({});
  var [value, setValue] = useState("");
  var IMMUNIZATION_HISTORY = "Immunization History"
  var MEDICATION_HISTORY = "Medication History"
  var SURGICAL_HISTORY = "Surgical History"
  var PS_HISTORY = "Personal and Social History"
  var FAMILY_HISTORY = "Family History"
  var ALLERGY_HISTORY = "Allergies History"
  var patientData = props.rowdata;

  const onChange = (event, key) => {
    setImmunization({
      ...immunization,
      [key]:event.target.value.display
    })
  };

    const getFeilds = (item) => {
    return (
      <>
        {item.answers.map((field) => {
          const { uuid, display, datatype, answers } = field;
          if (datatype.display === "Coded") {
            let item = [];
            for (let i = 0; i < answers.length; i++) {
              let valueWithKey = { uuid: uuid, display: answers[i].display };
              item.push(valueWithKey);
            }
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
                    // rowsMax={4}
                    onChange={(e) => onChange(e,uuid)}
                    // onChange={getValue}
                  >
                    {item.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name.display}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </GridItem>
            );
          }

          else if (datatype.display === "Text") {
            return (
              <GridItem item xs={12} sm={4} md={4} key={uuid}>
                <FormControl className={classes.formControl}>
                  <TextField
                    autoFocus
                    variant="outlined"
                    id={uuid}
                    label={display}
                    type="Text"
                    rowsMax={4}
                    className={classes.textField}
                    size="small"
                    onChange={(e) => onChange(e,uuid)}
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    // onChange={getValue}
                  />
                </FormControl>
              </GridItem>
            );
          }
        })}
      </>
    );
  }

  const itemImmuneList = (items) => {
    return items.answers.map((item1, index) => (
      <Panel header={item1.display} key={index}>
        <ImmunizationTable
          rows={item1}
          patientData={patientData}
        />
      </Panel>
    ))
  };

  const itemMedicationList = (items) => {
    return items.answers.map((item1, index) => (
      <Panel header={item1.display} key={index}>
        <RadioButtonsGroup question = {item1}/>
      </Panel>
    ))
  };

  const itemSurgicalList = (items) => {
    return items.answers.map((item1, index) => (
      <Panel header={item1.display} key={index}>
        <DatePickers answer={item1}/>
      </Panel>
    ))
  };

  const itemSocialList = (items) => {
    return items.answers.map((item1, index) => (
      <Panel header={item1.display} key={index}>
        <PS_History answer={item1}/>
      </Panel>
    ))
  };

  const itemFamilyList = (items) => {
    return items.answers.map((item1, index) => (
      <Panel header={item1.display} key={index}>
        <FamilyHistory answer={item1}/>
      </Panel>
    ))
  };

  const itemAllergyList = (items) => {
    return items.answers.map((item1, index) => (
      <Panel header={item1.display} key={index}>
        <AllergyHistory answer={item1}/>
      </Panel>
    ))
  };

return(
  <Collapse accordion>
    {props.historyfields.map((item, index) => (
      <Panel header={item.display} key={index}>
        <Collapse>
          {item.display == IMMUNIZATION_HISTORY &&
            itemImmuneList(item)
          }
          {item.display == MEDICATION_HISTORY &&
            itemMedicationList(item)
          }
          {item.display == SURGICAL_HISTORY &&
            itemSurgicalList(item)
          }
          {item.display == PS_HISTORY &&
            itemSocialList(item)
          }
          {item.display == FAMILY_HISTORY &&
            itemFamilyList(item)
          }
          {item.display == ALLERGY_HISTORY &&
            itemAllergyList(item)
          }
        </Collapse>
      </Panel>
    ))}
  </Collapse>
)
}

export default ControlledAccordions;