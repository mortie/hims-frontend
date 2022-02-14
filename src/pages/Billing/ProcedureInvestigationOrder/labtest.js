import React,{useState} from 'react';
import { getAPI, postAPI } from "../../../services";

import {
  Checkbox,
  Grid,
  ListItemText,
  makeStyles,
}from "@material-ui/core";
import { GridContainer , GridItem} from '../../../components';

  const useStyles = makeStyles({
    test: {
      padding:20
    },
  }); 
  

function Labtest(props) {
  const classes = useStyles();
  const answers = props.answers;
  //const [formValues, setFormValues] = useState([]);
  const [addInvestigation, setAddInvestigation] = useState([]);

  
  const saveValues = (e) => {
    e.preventDefault();
    
    let orderpayload = {
      patient: props.id,
      location: props.extraData[0].locationUuid,
      investigations: addInvestigation,
      procedures: [],
  }
    postAPI("/orders/patient",orderpayload).then((res)=>
      console.log(res)
    ).catch((e)=>console.log(e))
  }
  const handleChecked = (event,uuid) => {
    if(!addInvestigation.includes(uuid)){
      addInvestigation.add(uuid);
    }
  };
    return (
      
    <Grid > 
    
    <GridContainer className={classes.test}>
        {answers.map((item,key) =>
          
          <GridContainer key={key} className={classes.test}>          
            <GridItem item className={classes.test}>
            <Checkbox
            id={"checked_"+item.uuid} 
            onChange={() =>handleChecked(item.uuid)}
            size="small"
            inputProps={{ 'aria-label': 'checkbox with small size' }} 
            />
            
            </GridItem>
            <GridItem item xs={12} sm={12} md={6}>
                <ListItemText primary={item.display} />              
            </GridItem>
            
            </GridContainer>
            )}
        
        </GridContainer>
   
    </Grid>
    )
}

export default Labtest
