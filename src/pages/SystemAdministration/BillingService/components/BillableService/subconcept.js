import React,{useState} from 'react';
import { getAPI, postAPI } from "../../../../../services/index";
import {ListItemText,ListItem,List,Checkbox} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Labtest from './labtest';
import { GridContainer, GridItem } from '../../../../../components';
import ExpandLess from '@material-ui/icons/ArrowRightOutlined';
import ExpandMore from '@material-ui/icons/ArrowDropDownOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginLeft:'80%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
function Subconcept(props) {

  const conceptName = props.name;
  const locationType = props.locationType;
  const classes = useStyles();
  var [searchData, setsearchData] = useState([]);
  const [test, setTest] = React.useState(null);
  const [checked, setChecked] = React.useState(props.checkedValue);

  const openLabTest = (name) => {
    if(test === name){
      setTest(null);
    }
    else{
      setTest(name);
    }
  };
  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };
  React.useEffect(() => {
    getAPI(
  `/concept?q=${conceptName}&v=custom:(answers:(display,description))`
)
  .then((response) => {
    var res = response.data.results[0].answers;
      console.log(res);
      setsearchData(res);
  })
  .catch((error) => {
   
    console.log(error);
  });
}, []);
    return (
        <div className={classes.subcontent}>
        
           {searchData.map((item,key) =>
           
           <GridContainer key={key}>
           
          <GridItem item>
          <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={() => openLabTest(item.display)}>
                {test === item.display ? <ExpandLess /> : <ExpandMore />}
                  <Checkbox
                  checked={checked}
                  onChange={handleChecked}
                   size="small"
                        inputProps={{ 'aria-label': 'checkbox with small size' }}/>
                  <ListItemText primary={item.display} />
                </ListItem>
              </List>
              {test === item.display && ( <Labtest name={item.display} checkedValue={checked} locationType={locationType}/>)}
              
          </GridItem>
        </GridContainer>
              
        )}
        </div>
    )
}

export default Subconcept
