import React,{useState,useEffect} from 'react';
import { getAPI, postAPI } from "../../../../../services/index";

import { 
  TextField,
  makeStyles,
  Checkbox,
  FormControlLabel,
  Grid
}from "@material-ui/core";

import styles2 from "../../styles";
import { GridContainer, GridItem } from '../../../../../components';

const useStyles = makeStyles(styles2);


const styles = (theme) => ({
    root: {
      margin: 10,
      padding: theme.spacing(2),
    },
    
  });
  
  

function Labtest(props) {
  const classes = useStyles();
  const locationType = props.locationType;
  const conceptName = props.name;
  const [formValues, setFormValues] = useState([]);
  const [formData, setformData] = useState([]);
  const [checked, setChecked] = React.useState(props.checkedValue);
  const [checkedVal, setCheckedVal] = React.useState([]);

  console.log(formValues)
  const saveValues = (e) => {
    e.preventDefault();
    let concepts = {};
    
    var ename = e.target.id;
    console.log("checked "+checkedVal["checked_"+ename]);
            
      concepts["serviceConUuid"] = ename ;
      concepts["priceCategoryConUuid"] = locationType ;
      concepts["price"] = e.target.value ;
      concepts["enable"] = true ;
      console.log(e.target.value);
      let billservice = {
        "servicesDetails":[
          concepts
        ]
      }
      console.log(billservice)
    postAPI(`/services/billable`,billservice)
    .then((response) => {
      var res = response;
        console.log(res);
        e.target.style.color = 'Green';
        e.target.style.background = 'LightBlue';
    })
    .catch((error) => {
      e.target.style.color = 'Red';
      e.target.style.background = 'Pink';
    })
    
  }
  const handleChecked = (event) => {
    let cheChk = [];
    setChecked(event.target.checked);
    //cheChk["checked_"+event.target.id] = event.target.checked;
    //setCheckedVal(cheChk);
  };
  
  React.useEffect(() => {
    console.log(conceptName);
    getAPI(
  `/concept?q=${conceptName}&v=custom:(answers:(uuid,display,description))`
)
  .then((response) => {
    var res = response.data.results[0].answers;
      setformData(res);      
  })
  .catch((error) => {console.log(error);  });

  console.log(locationType);
  getAPI(
    `/services/billable`
  )
    .then((response) => {
      var res = response.data;
      if(res[locationType])    {setFormValues(res[locationType]);}  
      
    })
    .catch((error) => {console.log(error);  });
      console.log(formValues)
}, [conceptName]);

    
    return (
      
    <Grid className={classes.subcontent}> 
    <GridContainer >
        {formData.map((item,key) =>
          
          <GridContainer key={key}>          
            <GridItem item >
            <Checkbox
            id={"checked_"+item.uuid} 
            onChange={handleChecked}
            size="small"
            inputProps={{ 'aria-label': 'checkbox with small size' }} 
            className={classes.checkbox}/>
            
            </GridItem>
            <GridItem item xs={12} sm={12} md={6}>
            <TextField
                id={item.uuid}
                margin="dense"
                fullWidth
                label={item.display}
                name={item.uuid}
                defaultValue ={formValues[item.uuid]?formValues[item.uuid].price:""}
                className={classes.field}
                disabled = {formValues[item.uuid]?formValues[item.uuid].enable:false}
                onChange={saveValues}
            />
            </GridItem>
            
            </GridContainer>
            )}
        
        </GridContainer>
   
    </Grid>
    )
}

export default Labtest
