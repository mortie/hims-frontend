import React from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { GridItem } from "../../../components";

function AutocompleteComponent({
  display,
  answers,
  formErrors,
  formValues,
  autoFocus,
  classes,
  onAutocompleteChange,
  validateAutocomplete,
}) {
  const errors = formErrors[display] ? true : false;
  return (
    <>
      <GridItem item xs={12} sm={6} md={4}>
        <Autocomplete
          id={display}
          options={answers}
          getOptionLabel={(option) => option.display}
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
              label={display}
              variant="outlined"
              autoFocus={autoFocus}
            />
          )}
        />
      </GridItem>
    </>
  );
}

export default AutocompleteComponent;
