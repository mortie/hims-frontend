import React,{ useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

import CodedType from './codedType'
import TextType from './textType'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function MedicationHistory(props) {
    const classes = useStyles();
    var data = props.question;
  var dataType = props.question.datatype.display
      var [value,setValue] = useState()

  var [successcheck, setSuccesscheck] = useState(false);

    const handleChange = (event) => {
    setValue(event.target.value);
    setSuccesscheck(true)
    };

  if (dataType == "Coded") {
    return (
        <div>
          <CodedType codeddata={data} />
          {successcheck &&
          <Alert severity="success">Saved Successfully!</Alert>
          }
        </div>
      )
    }
  else if (dataType == "Text") {
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