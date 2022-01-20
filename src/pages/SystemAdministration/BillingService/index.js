import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Link } from "react-router-dom";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { billingRoutes } from "../../../routes/billingroutes";

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
function BillingMgmt() {
    const classes = useStyles();
    
    return (
      <Card className={classes.root}>
        <CardHeader        
          title="Billing Management"
          className={classes.title}
        />
        <CardContent>
        
        {billingRoutes.map((prop, key) => {
          return (
            <Typography key={key}> 
                <Button                    
                    component={Link}
                    to={prop.layout + prop.path}                 
                  >
                    {prop.title}
                  </Button>
             </Typography>
          )
        })
          }</CardContent>
      </Card>
    );
}

export default BillingMgmt
