import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { GridContainer, GridItem } from "../../../components/Grid";
import Typography from '@material-ui/core/Typography';


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

export default function SurgicalHistory(props) {
    const classes = useStyles();
  var data = props.answer
  var uuid = data.uuid;
    var [successcheck, setSuccesscheck] = useState(false);
    const handleChange = (event,cVal) => {
      setSuccesscheck(true)
      props.onChange(event,cVal)
    };

    const handleDateChange = (event,cVal) => {
    var btnvalue = event.target.value
    var cVal = {
      "name": uuid,
      "value":btnvalue
    }
    setSuccesscheck(false);
    props.onChange(event,cVal)
  };

    if (data.datatype.display == "Date") {
      return (
          <GridContainer>
            <GridItem item xs={12} sm={6} md={6}>
                <Typography variant="body1" className={classes.type}>
                {data.display}
                </Typography>
            </GridItem>
            <GridItem item xs={12} sm={6} md={6}>
          <TextField
          variant="outlined"
          label={data.display}
          type="date"
          margin="dense"
          name="surgicalDate"
          id="surgicalDate"
          defaultValue=""
          maxDate={new Date()}
          InputLabelProps={{
          shrink: true,
          }}
          className={classes.field}
          onChange = {handleDateChange}
          />
</GridItem>
</GridContainer>
      )
    }
    else if (data.datatype.display == "Text") {
      return (
        <div>
          <TextType textdata={data}
          onChange = {handleChange}
          />
          {/* {successcheck &&
          <Alert severity="success">Saved Successfully!</Alert>
          } */}
        </div>
      )
    }
}