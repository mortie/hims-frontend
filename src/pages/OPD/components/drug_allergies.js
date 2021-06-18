import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DrugHistory(props) {
  const classes = useStyles();
    var data = props.answer;
    var dataType = props.answer.datatype.display
    console.log(" DAta To render : ", data)

    var [successcheck, setSuccesscheck] = useState(false);
      const handleChange = (event) => {
    //   setValue(event.target.value);
      setSuccesscheck(true)
  };
    console.log(" Data : ", data)
        if (dataType == "Coded") {
        return (
            <div>

            <FormControl component="fieldset" className="medication">
                    <RadioGroup aria-label="gender" name="gender1" className="medi" onChange={handleChange}>
                                  {data.answers.map((smoker, index) => (
                    <FormControlLabel value={smoker.display} control={<Radio />} label={smoker.display} className="yesClass" />
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
    else if (data.datatype.display == "Text" || data.datatype.display == "N/A") {
        return (
            <div>
        <TextField
          id="outlined-multiline-static"
          label="Comments"
          multiline
          rows={1}
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