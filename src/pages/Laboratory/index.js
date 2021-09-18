import { Box, Typography, AppBar, Tabs, Tab, Card, Grid } from '@material-ui/core';
import React, { useState } from 'react'
import PropTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
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

function Laboratory() {
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const [value, setValue] = useState(0);
    return (
        <div>
            <h3>Laboratory Screen</h3>
            <AppBar position="static">
                <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="Tabs">
                    <Tab label="Clinical notes" />
                    <Tab label="Dashboard" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid sm={4}><Card>Testing</Card></Grid>
            </TabPanel>

        </div>
    )
}

export default Laboratory
