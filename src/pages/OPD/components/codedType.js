import React,{ useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function CodedType(props) {
    const classes = useStyles();
    var data = props.codeddata;
    var [value,setValue] = useState()
    var [successcheck, setSuccesscheck] = useState(false);


    const handleChange = (event) => {
        setValue(event.target.value);
        setSuccesscheck(true)
    };

    return (
        <div>

        <FormControl component="fieldset" className="medication">
          <RadioGroup aria-label="gender" name="gender1" className="medi" >
          {data.answers.map((smoker, index) => (
            <FormControlLabel
              value={smoker.display}
              control={<Radio id={smoker.uuid} onChange={handleChange} />}
              label={smoker.display}
              className="yesClass"
              key={smoker.uuid}
            />
          ))}
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