import React,{ useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function TextType(props) {
    const classes = useStyles();
    var data = props.textdata;
    var [successcheck, setSuccesscheck] = useState(false);
    var [value,setValue] = useState()

    const handleChange = (event) => {
        setValue(event.target.value);
        setSuccesscheck(true)
    };

    return (
        <div>
            <TextField
            id="outlined-multiline-static"
            label={data.display}
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