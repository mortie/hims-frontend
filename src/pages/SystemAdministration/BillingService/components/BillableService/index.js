import React, { useState , useEffect} from 'react';
import { getAPI } from "../../../../../services/index";
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Subconcept from './subconcept';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExpandLess from '@material-ui/icons/ArrowRightOutlined';
import ExpandMore from '@material-ui/icons/ArrowDropDownOutlined';
import { Checkbox } from '@material-ui/core';
import styles from "../../styles";

const useStyles = makeStyles(styles);
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Grid>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function BillableService() {
  const [data, setData] = React.useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = React.useState(false);
  const [checkedVal, setCheckedVal] = React.useState([]);
  const [category,setCategory] = React.useState([]);

  const handleClick = (name) => {
    if(open === name){
      setOpen(null);
    }
    else{
      setOpen(name);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChecked = (event) => {
    setChecked(event.target.checked);
    setCheckedVal(event.target.id,event.target.checked);
  };
  

  useEffect(() => {
    let url1 =
    "/concept?q=services ordered&v=custom:(answers:(uuid,display,answers:(uuid,display,datatype:(display),synonyms:(display),answers:(uuid,display,datatype:(display),answers:(uuid,display,datatype:(display),answers:(uuid,display,datatype:(display)))))";
  getAPI(url1)
    .then((response) => {
     
      console.log(response.data.results[0].answers)
      if(!category.includes(response.data.results[0].answers)){
        setCategory(response.data.results[0].answers);
      }
    })
    .catch((error) => console.log(error));

   }, []);

    return (

        <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader id="nested-list-subheader" className={classes.header}>
          Manage Billable Service
        </ListSubheader>
      }
      className={classes.root}
    >
        <Paper className={classes.root}>
      <Tabs
       value={value}
       onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        {category.map((item) =>
                <Tab label={item.display}/>
          )}
      </Tabs>
      {category.map((item,index) =>
                <TabPanel value={value} index={index}>
                  {item.answers.map((answer,key) =>
                        <Grid key={key}>
                        <ListItem button onClick={() => handleClick(answer.display)}>
                        {open === answer.display ? <ExpandLess /> : <ExpandMore />}
                        <Checkbox 
                        id={answer.uuid}
                        onChange={handleChecked}
                        size="small"
                        inputProps={{ 'aria-label': 'checkbox with small size' }} />
                         <ListItemText primary={answer.display} />
                      </ListItem>
                      
                          <Collapse in={open === answer.display} timeout="auto" unmountOnExit>
                            <Subconcept name={answer.display} checkedValue={checked} locationType={item.uuid}/>
                          </Collapse>
                    
                      </Grid>
                    )}
                </TabPanel>
          )}
</Paper>
       
      
    </List>
    )
}

export default BillableService
