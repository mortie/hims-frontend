import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

    const handleClose = () => {
      
    setAnchorEl(null);
  };

    const gotopage = (event) => {
console.log("BUTTON CLICKED")

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
        onClick={gotopage}      
      >
        <StyledMenuItem>
          <ListItemIcon>
            <AddCircleOutlineIcon fontSize="small" className="AddCirclebtm" />
          </ListItemIcon>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}