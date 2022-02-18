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
  

function BillingNewTest(props) {
  const classes = useStyles();
  const answers = props.answers;
  const [open, setOpen] = useState(true);
  const [addInvestigation, setAddInvestigation] = useState([]);

  
  const saveValues = (e) => {
    e.preventDefault();
    
   
  }
  const handleChecked = (event,uuid) => {
    let orderpayload = {
      patient: props.orderDtl.id,
      location: props.orderDtl.extraData[0].locationUuid,
      investigations: addInvestigation,
      procedures: [],
  }
    if(!addInvestigation.includes(uuid)){
      orderpayload.investigations = uuid;
    }
    console.log(props.orderDtl);
    
    postAPI("/orders/patient",orderpayload).then((res)=>
      console.log(res)
    ).catch((e)=>console.log(e))
  };
 
    return (
   
    <GridContainer className={classes.test}>
        {answers.map((item,key) =>
          
          <GridContainer key={key} className={classes.test}>          
            <GridItem item className={classes.test}>
            <Checkbox
            id={"checked_"+item.uuid} 
            onChange={(e) =>handleChecked(e,item.uuid)}
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
   
    )
}

export default BillingNewTest
