import React, { useState , useEffect} from 'react';
import { getAPI } from "../../../services/index";
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Subconcept from './subconcept'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function BillingMgmt() {
  const [data, setData] = React.useState([]);
    const classes = useStyles();
  const [open, setOpen] = React.useState(null);

  const handleClick = (name) => {
    if(open === name){
      setOpen(null);
    }
    else{
      setOpen(name);
    }
  };
  
  useEffect(() => {
    let url1 =
    "/concept?q=services order&v=custom:(answers:(uuid,display,datatype:(display),answers:(uuid,display),description:(display)))";
  getAPI(url1)
    .then((response) => {
     
      if(!data.includes(response.data.results[0].answers)){
        setData(response.data.results[0].answers);
      }
      
    })
    .catch((error) => console.log(error));

   }, []);
    return (
        <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Billing Concept
        </ListSubheader>
      }
      className={classes.root}
    >
       {data.map((item) =>
        <>
            <ListItem button onClick={() => handleClick(item.display)}>
              <ListItemText primary={item.display} />
        {open === item.display ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      
          <Collapse in={open === item.display} timeout="auto" unmountOnExit>
            <Subconcept name={item.display}/>
          </Collapse>
      
      </>
      )}
      
    </List>
    )
}

export default BillingMgmt
