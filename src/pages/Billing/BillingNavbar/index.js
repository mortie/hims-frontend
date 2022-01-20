import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BillingTabHomeComponent from '../BillingTabHomeComponent';
import OpdQue from '../OpdQue';
import {Link,Route} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,

    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    hyperlinkcolor: {
      '&:hover': {
         color: "#fff",
      },
    },
  }));
export default function BillingNavbar() {
    const classes = useStyles();

    return (
            <>
        <Route
          path="/"
          render={(history) => (
            <AppBar position='relative'>
              <Tabs
                value={
                  history.location.pathname !== "/"
                    ? history.location.pathname
                    : false
                }
                variant="scrollable"
              >
                {console.log(history.location.pathname)}
                <Tab
                  value="/app/billing/home"
                  label="Home"
                  component={Link}
                  to="/app/billing/home"
                  className={classes.hyperlinkcolor}
                />
                <Tab
                  value="/app/billing/outpatientbillingqueue"
                  label="Billing"
                  component={Link}
                  to="/app/billing/outpatientbillingqueue"
                  className={classes.hyperlinkcolor}
                />
                <Tab
                  label="Reports"
                  className={classes.hyperlinkcolor}
                />
              </Tabs>
            </AppBar>
          )}
        />

      

            </>
       
    )
}
