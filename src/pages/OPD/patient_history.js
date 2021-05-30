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
import BasicEditingGrid from './components/immunization_history'



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
const { Option } = Select;

const ControlledAccordions = (props) => {
  const classes = useStyles();
  var [immunization, setImmunization] = useState({});
  var [value, setValue] = useState("");

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

  const itemList = props.historyfields.map((item, index) => (
    <Panel header={item.display} key={index}>
      {/* {getFeilds(item)} */}
      <BasicEditingGrid
      rows = {item}
      />
    </Panel>
  ));

  return(
    <Collapse accordion>
      {itemList}
  </Collapse>)
}

export default ControlledAccordions;