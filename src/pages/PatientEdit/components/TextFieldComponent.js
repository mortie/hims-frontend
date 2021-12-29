import React from "react";
import { TextField } from "@material-ui/core";
import { GridItem } from "../../../components";

function AutocompleteComponent({
  display,
  labelName,
  formErrors,
  formValues,
  autoFocus,
  classes,
  onTextChange,
  validateText,
}) {
  const errors = formErrors[display] ? true : false;
  return (
    <>
      <GridItem item xs={12} sm={6} md={4}>
        <TextField
          id={display}
          variant="outlined"
          label={labelName}
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
    </>
  );
}

export default AutocompleteComponent;
