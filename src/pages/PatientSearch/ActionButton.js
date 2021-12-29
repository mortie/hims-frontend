import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';

import PrintAction from "./PrintAction";
import RevisitAction from "./RevisitAction";
import axios from "axios";
import { getAPI, postAPI, getaddressAPI } from "../../services/index";
import { useHistory } from "react-router-dom";


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    cursor:'pointer !important',
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchSuccessData, setSearchSuccessData] = useState(null);
  const [searchRevisitData, setSearchRevisitData] = useState(null);

  var [isPrintBoxOpen, setIsPrintBoxOpen] = useState(false);
  var [isRevisitBoxOpen, setIsRevisitBoxOpen] = useState(false);
  let history = useHistory();


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
          setIsPrintBoxOpen(false)

  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsPrintBoxOpen(false)

  };

  const onEdit = () => {
    let path = `/app/edit-patient/` + props.patiendData.row.identifier;
    history.push(path);
}

  const onRevisit = () => {
    setIsRevisitBoxOpen(false)

  var printValues = props.patiendData.row
  var username = "bhavana";
  var password = "Admin123";
  var uuid = printValues.uuid

const headers =
  {
    Authorization: "Basic " + btoa(`${username}:${password}`),
  };
  const url1 = `https://ln3.hispindia.org/openmrs/ws/rest/v1/lastVisit/patient?patient=${uuid}`;
  axios
  .get(url1, { headers: headers })
    .then((response) => {
      var visitUuid = response.data.visitUuid;
      const url2 = `https://ln3.hispindia.org/openmrs/ws/rest/v1/lastVisitAppointmentDeatils/patient?visit=${visitUuid}`;

axios
  .get(url2, { headers: headers })
  .then((responseVisit) => {
      setIsRevisitBoxOpen(true)
      setSearchRevisitData({
      ...searchRevisitData,
      appointmentData: printValues,
      visitData: responseVisit,
    });
      }).catch(function (error) {
          console.log(error);
      });


      }).catch(function (error) {
          console.log(error);
      });

  }

  const onPrint = () => {
  setIsPrintBoxOpen(false)

  var printValues = props.patiendData.row
  var username = "bhavana";
  var password = "Admin123";
  var uuid = printValues.uuid

const headers =
  {
    Authorization: "Basic " + btoa(`${username}:${password}`),
  };
  const url1 = `https://ln3.hispindia.org/openmrs/ws/rest/v1/lastVisit/patient?patient=${uuid}`;
  axios
  .get(url1, { headers: headers })
    .then((response) => {
      var visitUuid = response.data.visitUuid;
      const url2 = `https://ln3.hispindia.org/openmrs/ws/rest/v1/lastVisitAppointmentDeatils/patient?visit=${visitUuid}`;

axios
  .get(url2, { headers: headers })
  .then((responseVisit) => {
      setIsPrintBoxOpen(true)
      setSearchSuccessData({
      ...searchSuccessData,
      appointmentData: printValues,
      visitData: responseVisit,
    });
      }).catch(function (error) {
          console.log(error);
      });


      }).catch(function (error) {
          console.log(error);
      });


}
  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
              onClick={handleClick}
              size="small"
      >
        Action
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}

      >
        <StyledMenuItem>
          <ListItemIcon>
            <AddCircleOutlineIcon fontSize="small" className="AddCirclebtm" onClick={onRevisit} />
          </ListItemIcon>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <EditIcon fontSize="small"  onClick={onEdit}/>
          </ListItemIcon>
        </StyledMenuItem>
        <StyledMenuItem onClick={onPrint}>
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
        </StyledMenuItem>
      </StyledMenu>
      {isPrintBoxOpen && searchSuccessData && (
       <PrintAction data={searchSuccessData} />
      )}
      {isRevisitBoxOpen && searchRevisitData && (
        <RevisitAction data={searchRevisitData} mlc={props.mlc} />
     )}


    </div>
  );
}