import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';


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
  <TextField
                variant="outlined"
                label={data.display}
                type="date"
                margin="dense"
                name="lvd"
                id="lvd"
                defaultValue=""
                maxDate={new Date()}
                InputLabelProps={{
                  shrink: true,
                }}

                className={classes.field}
                onChange={(e) => handleChange(e)}
        />
          <br></br>
          </div>
)
    }
    else if (data.datatype.display == "Text") {
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