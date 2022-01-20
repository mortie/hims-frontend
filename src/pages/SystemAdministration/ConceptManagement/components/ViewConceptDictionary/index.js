import React from 'react';
import {
    makeStyles,
    List,
    Paper,
    Grid,
    ListSubheader} from "@material-ui/core/";
import styles from "../../styles";
import ConceptList from "./conceptList";
import SearchConcept from "./searchConcept";

const useStyles = makeStyles(styles);
function ViewConceptDictionary() {
    const classes = useStyles();
    return (
       <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader id="nested-list-subheader" className={classes.header}>
            View Concept Dictionary
          </ListSubheader>
        }
        className={classes.root}
      >  
        <Paper>
            <Grid>
                <SearchConcept/>
                <ConceptList/>
            </Grid>
        </Paper>    
        </List>

    )
}

export default ViewConceptDictionary
