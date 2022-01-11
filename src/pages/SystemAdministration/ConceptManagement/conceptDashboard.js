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

export default function ConceptDashboard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader        
        title="Concept Management"
        className={classes.title}
      />
      <CardContent>      
          <Typography > <Button component={Link}>View Concept Dictionary</Button></Typography>
          <Typography > <Button component={Link}>Manage Concept Drugs</Button></Typography>
          <Typography > <Button component={Link}>Manage Proposed Concepts</Button></Typography>
          <Typography > <Button component={Link}>Manage Concept Classes</Button></Typography>
          <Typography > <Button component={Link}>Manage Concept Datatypes</Button></Typography>
          <Typography > <Button component={Link}>Manage Concept Sources</Button></Typography>
          <Typography > <Button component={Link}>Manage Concept Stop Word</Button></Typography>
          <Typography > <Button component={Link}>Manage Reference Terms</Button></Typography>
          <Typography > <Button component={Link}>Manage Concept Attribute Types</Button></Typography>
      </CardContent>
    </Card>
  );
}
