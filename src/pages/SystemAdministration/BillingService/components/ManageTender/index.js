import React from 'react'
import {
    makeStyles,
    List,
    ListSubheader} from "@material-ui/core/";
import styles from "../../styles";

const useStyles = makeStyles(styles);
function ManageTender() {
   
    const classes = useStyles();
    return (
        
        <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader id="nested-list-subheader" className={classes.header}>
           Manage Tender
          </ListSubheader>
        }
        className={classes.root}
      >
                
        </List>
         
    )
}

export default ManageTender
