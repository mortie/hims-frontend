import React,{ useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

export default function RadioButtonsGroup(props) {
    var data = props.question;
    var dataType = props.question.datatype.display
    const [value, setValue] = React.useState('no');
      var [successcheck, setSuccesscheck] = useState(false);


  const handleChange = (event) => {
      setValue(event.target.value);
      setSuccesscheck(true)
  };
    if (dataType == "Coded") {
        return (
            <div>
            <FormControl component="fieldset" className="medication">
                <RadioGroup aria-label="gender" name="gender1" className="medi" value={value} onChange={handleChange}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" className="yesClass" />
                    <FormControlLabel value="no" control={<Radio />} label="No" className="noClass"/>
                </RadioGroup>
                </FormControl>
                <br></br>
                <br></br>
                  {successcheck &&
        <Alert severity="success">Saved Successfully!</Alert>
                }
                </div>
        );
    }
    else if (dataType == "Text") {
        return (
            <div>
        <TextField
          id="outlined-multiline-static"
          label="Comments"
          multiline
          rows={2}
                variant="outlined"
                    className="commentClass"
                    onChange={handleChange}
                />
                <br></br>
                <br></br>
                      {successcheck &&
        <Alert severity="success">Saved Successfully!</Alert>
                }
                </div>
        )
    }
}