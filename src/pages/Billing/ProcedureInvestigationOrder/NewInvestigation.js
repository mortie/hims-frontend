import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ExpandLess from '@material-ui/icons/ArrowRightOutlined';
import ExpandMore from '@material-ui/icons/ArrowDropDownOutlined';

import DialogTitle from '@material-ui/core/DialogTitle';
import Subconcept from './subconcept';
import Grid from '@material-ui/core/Grid';import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';


const useStyles = makeStyles({
  root: {
    margin: 0,
    padding: 2,
  },
  closeButton: {
    position: 'absolute',
    right: 1,
    top: 1,
    color: grey,
  },
});
export default function NewInvestigation(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [listopen, setListOpen] = React.useState(null);
  const investigationList = props.investigationList;
 
  const handleClose = () => {
    setOpen(false);
  };
  const handleFirstClick = (name) => {
    if(listopen === name){
      setListOpen(null);
    }
    else{
      setListOpen(name);
    }
   
    console.log(listopen)
  };
 
  
  return (
    <div>
      
      <Dialog
        open={open === props.open?true:false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.root}
      >
        <DialogTitle id="alert-dialog-title">{"Select New Investigation"}</DialogTitle>
        <DialogContent>
        {investigationList.map((answer,key) =>
       
       <Grid key={key}>
                        <ListItem button onClick={() => handleFirstClick(answer.display)}>
                        {listopen === answer.display ? <ExpandLess /> : <ExpandMore />}
                        
                         <ListItemText primary={answer.display} />
                      </ListItem>
                      
                          <Collapse in={listopen === answer.display} timeout="auto" unmountOnExit>
                            <Subconcept answers={answer.answers} orderDtl ={props.orderDtl}/>
                          </Collapse>
                    
                      </Grid>
      
      )}
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}