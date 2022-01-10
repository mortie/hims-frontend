import { Box, Typography, AppBar, Tabs, Tab, makeStyles } from '@material-ui/core';
import { GridContainer, GridItem } from "../../../components/Grid";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import OpdQue from '../OpdQue';
const useStyles = makeStyles(styles);

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box p={3}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
    
      );
    }
  
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
 
  export default function VerticalTabComponent() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <div className={classes.root}>
         <GridContainer>
          < GridItem xs={12} sm={6} md={12}>
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="OPD Queue" />
          <Tab label="IPD Queue"  />
          <Tab label="Billing Ambulance"  />
          <Tab label="Billing Tender"  />
          <Tab label="Billing Miscellaneous Service"  />
          <Tab label="Search Patient System" />
        </Tabs>
        </GridItem>
        < GridItem xs={12} sm={6} md={12}>
        <TabPanel value={value} index={0}  className={classes.panelfirst}>
          <OpdQue></OpdQue>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <Typography variant="h6">IPD Queue</Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
        <Typography variant="h6">Billing Ambulance</Typography>

        </TabPanel>
        <TabPanel value={value} index={3}>
        <Typography variant="h6"> Billing Tender</Typography>
        </TabPanel>
        <TabPanel value={value} index={4}>
        <Typography variant="h6"> Billing Miscellaneous Service</Typography>
        </TabPanel>
        <TabPanel value={value} index={5}>
        <Typography variant="h6">Search Patient System</Typography>
        </TabPanel>
        </GridItem>
        </GridContainer>
      </div>
    );
   
  }