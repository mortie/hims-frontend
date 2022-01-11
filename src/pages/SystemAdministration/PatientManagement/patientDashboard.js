import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 10,
  },
  
  title: {
    backgroundColor: "#3EABC1",
    color: "#FFFFFF",
  },
}));

export default function PatientDashboard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader        
        title="Patient Management"
        className={classes.title}
      />
      <CardContent>
          <Typography > <Button component={Link}>Manage Patients</Button></Typography>          
          <Typography > <Button component={Link}>Find Patients to Merge</Button></Typography>
          <Typography > <Button component={Link}>Manage Identifier Types</Button></Typography>
          <Typography > <Button component={Link}>Manage Patient Identifier Sources</Button></Typography>
          <Typography > <Button component={Link}>Auto-Generation Options</Button></Typography>
          <Typography > <Button component={Link}>View Log Entries</Button></Typography>
      </CardContent>
    </Card>
  );
}
