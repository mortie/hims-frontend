import React,{useState} from 'react';
import { getAPI, postAPI } from "../../../services/index";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { GridContainer, GridItem } from "../../../components/Grid";
import { TextField,
  makeStyles,} from "@material-ui/core";

import styles2 from "./styles";

const useStyles = makeStyles(styles2);


const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  


function Labtest(props) {
  const classes = useStyles();
  
  const [formValues, setFormValues] = useState([]);
  const conceptName = props.name;
  var [formData, setformData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const saveValues = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(formData);
    let concepts = {};
    for(var i=0;i<=formData.length-1;i++){
      var ename = formData[i].uuid;
      
      concepts["conUuid"] = ename ;
      concepts["price"] = data.get(ename) ;
      concepts["disable"] = "false" ;
      console.log(data.get(ename));
      let billservice = {
        "servicesDetails":[
          concepts
        ]
      };
      console.log(billservice)
    postAPI(`/services/billable`,billservice)
    .then((response) => {
      var res = response;
        console.log(res);
    })
    }
    handleClose();
  };
  
  React.useEffect(() => {
    getAPI(
  `/concept?q=${conceptName}&v=custom:(answers:(uuid,display,description))`
)
  .then((response) => {
    var res = response.data.results[0].answers;
      setformData(res);      
  })
  .catch((error) => {console.log(error);  });

  getAPI(
    `/services/billable`
  )
    .then((response) => {
      var res = response.data;
        setFormValues(res);      
    })
    .catch((error) => {console.log(error);  });

  handleClickOpen();
}, []);
    return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <form onSubmit={saveValues}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.name} (Price)
        </DialogTitle>
        <DialogContent dividers>
        <GridContainer>
        {formData.map((item) =>
            <GridItem item xs={12}>
            <TextField
                id={item.uuid}
                variant="outlined"
                margin="dense"
                fullWidth
                label={item.display}
                name={item.uuid}
                defaultValue ={formValues[item.uuid]?formValues[item.uuid]:""}
                className={classes.field}
            />


            </GridItem>
        )}
        </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary" type="submit">
            Save
          </Button>
        </DialogActions>

        </form>
        
      </Dialog>
    </div>
    )
}

export default Labtest
