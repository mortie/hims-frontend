import React from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { GridItem } from "../../../components";
import {District_Dropdown} from "../../../utils/constants"
function AutocompleteComponent({
  display,
  labelName,
  answers,
  formErrors,
  formValues,
  autoFocus,
  classes,
  onAutocompleteChange,
  onAutocompleteAddressChange,
  validateAutocomplete,
  onAutocompleteDistrictChange,

}) {

  const errors = formErrors[display] ? true : false;
  const [value, setValue] = React.useState(answers[0]);
  const [districtvaluedrop, setdistrictvaluedrop] = React.useState(District_Dropdown==='Shimla'?answers[8]:answers[10]);
  const [inputValue, setInputValue] = React.useState('');
  //const [inputValuedstrict, setinputValuedstrict] = React.useState('');
  if(display === 'State')
  {
  return (
    <>
      <GridItem item xs={12} sm={6} md={4}>
        <Autocomplete
          id={display}
          options={answers}
          getOptionLabel={(option) => option.name}
          onChange={(e, newValue) => {
            setValue(newValue);
            onAutocompleteAddressChange(display, newValue);
            //setdistrictvaluedrop("")
          }}
         
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onBlur={(e) => validateAutocomplete(display, formValues[display])}
          value={value}
          getOptionSelected={(option, value) => option.name === value.name}
          className={classes.field}
          autoHighlight={true}
        
          renderInput={(params) => (
            <TextField
              {...params}
              error={errors}
              helperText={formErrors[display]}
              label={labelName}
              variant="outlined"
              autoFocus={autoFocus}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
      </GridItem>

    </>
  );
          }
          else if(display === 'District')
          {
            return (
              <>
                <GridItem item xs={12} sm={6} md={4}>
                  <Autocomplete
                    id={display}
                    options={answers}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, newValue) => {
                      onAutocompleteDistrictChange(display, newValue);
                      setdistrictvaluedrop(newValue)
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    onBlur={(e) => validateAutocomplete(display, formValues[display])}
                    value={districtvaluedrop}
                    getOptionSelected={(option, value) => option.name === value.name}
                    className={classes.field}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={errors}
                        helperText={formErrors[display]}
                        label={labelName}
                        variant="outlined"
                        autoFocus={autoFocus}
                      />
                    )}
                  />
                </GridItem>
              </>
            );
          }
          else if(display === 'Town/City')
          {
            return (
              <>
                <GridItem item xs={12} sm={6} md={4}>
                  <Autocomplete
                    id={display}
                    options={answers}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, newValue) => {
                      onAutocompleteChange(display, newValue);
                    }}
                    onBlur={(e) => validateAutocomplete(display, formValues[display])}
                    value={formValues[display]}
                    getOptionSelected={(option, value) => option.name === value.name}
                    className={classes.field}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={errors}
                        helperText={formErrors[display]}
                        label={labelName}
                        variant="outlined"
                        autoFocus={autoFocus}
                      />
                    )}
                  />
                </GridItem>
              </>
            );
          }

          else{
            return (
              <>
                <GridItem item xs={12} sm={6} md={4}>
                  <Autocomplete
                    id={display}
                    options={answers}
                    getOptionLabel={(option) => 
                      {
                        if(option.display ==="MLC Yes*" || option.display ==="Referred-Yes")
                        {
                          return "Yes";
                        }
                        else if(option.display === "MLC No" || option.display ==="Referred-No")
                        {
                          return "No";
                        }
                        else{
                          return option.display;
                        }
                      }
                    }
                    onChange={(e, newValue) => {
                      onAutocompleteChange(display, newValue);
                    }}
                    onBlur={(e) => validateAutocomplete(display, formValues[display])}
                    value={formValues[display]}
                    getOptionSelected={(option, value) => option.uuid === value.uuid}
                    className={classes.field}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={errors}
                        helperText={formErrors[display]}
                        label={labelName}
                        variant="outlined"
                        autoFocus={autoFocus}
                      />
                    )}
                  />
                </GridItem>
              </>
            );

          }
}

export default AutocompleteComponent;
