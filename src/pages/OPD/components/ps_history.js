import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
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
    width: 200,
  },
}));

export default function PS_History(props) {
  const classes = useStyles();
    var data = props.answer;
    var dataType = props.answer.datatype.display

    var [successcheck, setSuccesscheck] = useState(false);
      const handleChange = (event) => {
    //   setValue(event.target.value);
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