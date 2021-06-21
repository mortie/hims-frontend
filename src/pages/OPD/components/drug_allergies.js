import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

import CodedType from './codedType'
import TextType from './textType'


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 500,
  },
   formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DrugHistory(props) {
  const classes = useStyles();
    var data = props.answer;
    var dataType = props.answer.datatype.display
    console.log(" DAta To render : ", data)

    var [successcheck, setSuccesscheck] = useState(false);
      const handleChange = (event) => {
      // setValue(event.target.value);
      setSuccesscheck(true)
  };
    console.log(" Data display : ", data.display)
        if (dataType == "Coded") {
        return (
            <div>

<FormControl
                variant="outlined"
                fullWidth
                className={classes.field}
                margin="dense"
              >
                <InputLabel id="lastVistSelectLabel">{data.display}</InputLabel>
                <Select
                  labelId="lastVistSelectLabel"
                  label={data.display}
                id="lastVistSelect"

                  onChange={(e) => handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {data.answers.map((smoker, index) => (
                  <MenuItem value={smoker.display}>{smoker.display}</MenuItem>
                ))}
                </Select>
              </FormControl>


                <br></br>
                <br></br>
                  {successcheck &&
        <Alert severity="success">Saved Successfully!</Alert>
                }
                </div>
        );
    }
    else if (data.datatype.display == "Text" || data.datatype.display == "N/A") {
    return (
      <div>
      <TextType textdata={data} />
      {successcheck &&
      <Alert severity="success">Saved Successfully!</Alert>
      }
      </div>
        )
    }
}