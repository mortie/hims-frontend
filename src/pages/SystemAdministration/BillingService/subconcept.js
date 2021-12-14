import React,{useState} from 'react';
import { getAPI } from "../../../services/index";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Labtest from './labtest'

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
function Subconcept(props) {

  const conceptName = props.name;
  const classes = useStyles();
  var [searchData, setsearchData] = useState([]);
  const [test, setTest] = React.useState(null);

  const openLabTest = (name) => {
    if(test === name){
      setTest(null);
    }
    else{
      setTest(name);
    }
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
        <div>
        
           {searchData.map((item) =>
            <>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={() => openLabTest(item.display)}>
                  <ListItemText primary={item.display} />
                </ListItem>
              </List>
              {test === item.display && ( <Labtest name={item.display}/>)}
              </>
        )}
        </div>
    )
}

export default Subconcept
