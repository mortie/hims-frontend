import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  List,
  ListItem,
  Paper,
  Button,
  Grid,
  LinearProgress,
  ListSubheader} from "@material-ui/core/";
import styles from "../../styles";
import { Location } from '../../../../../services/data';

function Locations(locations) {
}

const useStyles = makeStyles(styles);
function ManageLocation() {
  var [view, setView] = useState("general");
  var [locationsLoaded, setLocationsLoaded] = useState(false);
  var [unassignedLocations, setUnassignedLocations] = useState(null);
  let [currentViewLocations, setCurrentViewLocations] = useState([]);
  let [assignedLocations, setAssignedLocations] = useState({});

  function updateAssignedLocations() {
    let newLocations = {...assignedLocations};
    newLocations[view] = [...currentViewLocations];
    setAssignedLocations(newLocations);
  }

  function sortAndSetLocations(setter, locations) {
    locations.sort((a, b) => {
      if (a.display < b.display) return -1;
      else return 1;
    });

    setter([...locations]);
  }

  useEffect(() => {
    Location.getAll({}).then(locations => {
      sortAndSetLocations(setUnassignedLocations, locations);
      setLocationsLoaded(true);
    });
  }, []);

  function addLocation(location) {
    let idx = unassignedLocations.indexOf(location);
    if (idx < 0) return;
    unassignedLocations.splice(idx, 1);
    sortAndSetLocations(setUnassignedLocations, unassignedLocations);
    currentViewLocations.push(location);
    sortAndSetLocations(setCurrentViewLocations, currentViewLocations);
  }

  function removeLocation(location) {
    let idx = currentViewLocations.indexOf(location);
    if (idx < 0) return;
    currentViewLocations.splice(idx, 1);
    sortAndSetLocations(setCurrentViewLocations, currentViewLocations);
    unassignedLocations.push(location);
    sortAndSetLocations(setUnassignedLocations, unassignedLocations);
  }

  function changeView(newView) {
    updateAssignedLocations();
    setView(newView);
    if (assignedLocations[newView]) {
      setCurrentViewLocations([...assignedLocations[newView]]);
    } else {
      setCurrentViewLocations([]);
    }
  }

  function Locations() {
    return (
      <Grid container spacing={1}>
        <Grid item style={{flexGrow: 1, width: "50%"}}>
          <Paper>
            <List subheader={<ListSubheader>Unassigned locations</ListSubheader>}>
              {unassignedLocations.length == 0 && <ListItem>No items</ListItem>}
              {unassignedLocations.map((location, idx) => (
                <ListItem
                  key={location.uuid}
                  style={{justifyContent: "space-between"}}
                  divider={idx != unassignedLocations.length - 1}
                >
                  {location.display}
                  <Button onClick={() => addLocation(location)}>&gt;</Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item style={{flexGrow: 1, width: "50%"}}>
          <Paper>
            <List subheader={<ListSubheader>Locations assigned to {view}</ListSubheader>}>
              {currentViewLocations.length == 0 && <ListItem>No items</ListItem>}
              {currentViewLocations.map((location, idx) => (
                <ListItem
                  key={location.uuid}
                  style={{justifyContent: "space-between"}}
                  divider={idx != currentViewLocations.length - 1}
                >
                  <Button onClick={() => removeLocation(location)}>&lt;</Button>
                  {location.display}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  const classes = useStyles();
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader id="nested-list-subheader" className={classes.header}>
          Manage Location
        </ListSubheader>
      }
      className={classes.root}
    >
      <FormControl
        variant="outlined"
        fullWidth
        margin="dense"
        className={classes.field}
      >
        <InputLabel id="view">View</InputLabel>
        <Select
          labelId="viewLabel"
          label="View"
          value={view}
          onChange={(e) => changeView(e.target.value)}
        >
          <MenuItem value="general">General</MenuItem>
          <MenuItem value="private">Private</MenuItem>
          <MenuItem value="emergency">Emergency</MenuItem>
        </Select>
      </FormControl>

      {locationsLoaded
        ? Locations()
        : <LinearProgress />
      }
    </List>
  )
}

export default ManageLocation
