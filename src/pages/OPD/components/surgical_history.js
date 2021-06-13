import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

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

export default function DatePickers(props) {
  const classes = useStyles();
    var data = props.answer
    var [successcheck, setSuccesscheck] = useState(false);
      const handleChange = (event) => {
    //   setValue(event.target.value);
      setSuccesscheck(true)
  };
    console.log(" Data : ", data)
    if (data.datatype.display == "Date") {
        return (
            <div>
            <form className={classes.container} noValidate>
                <TextField
                    id="date"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChange}

                />
                </form>
                <br></br>
                            {successcheck &&
        <Alert severity="success">Saved Successfully!</Alert>
                }
                </div>

        )
    }
    else if (data.datatype.display == "Text") {
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