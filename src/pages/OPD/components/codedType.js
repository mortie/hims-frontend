import React,{ useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

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