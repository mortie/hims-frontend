import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { GridContainer, GridItem } from "../../../components/Grid";
import Typography from '@material-ui/core/Typography';


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

export default function DateType(props) {
    const classes = useStyles();
    var data = props.datedata;
    console.log(" Data ", data)
    var uuid = data.uuid;
      var newDate = new Date();
  var todayDate = [
    newDate.getFullYear(),
    ('0' + (newDate.getMonth() + 1)).slice(-2),
    ('0' + newDate.getDate()).slice(-2),
  ].join('-').toString();


    const handleDateChange = (event,cVal) => {
    var btnvalue = event.target.value
    var cVal = {
      "name": uuid,
      "value":btnvalue
    }
    props.onChange(event,cVal)
  };

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
          inputProps={{ max: todayDate }}

          InputLabelProps={{
          shrink: true,
          }}
          className={classes.field}
          onChange = {handleDateChange}
          />
</GridItem>
</GridContainer>
    );
}