import { Box, Typography, AppBar, Tabs, Tab, Card, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BillingTabHomeComponent from '../BillingTabHomeComponent';
import VerticalTabComponent from '../VerticalTabComponent';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
   console.log(props);
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={2}>
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

function TabPanelComponent() {
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const [value, setValue] = useState(0);
    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="Tabs">
                    <Tab label="Home" />
                    <Tab label="Billing" />
                    <Tab label="Reports" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <h3>Today's Status</h3>
                <BillingTabHomeComponent></BillingTabHomeComponent>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <VerticalTabComponent></VerticalTabComponent>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <h4>Reports</h4>
            </TabPanel>

        </div>
    )
}

export default TabPanelComponent;
