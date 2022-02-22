import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Icon,
  List,
  ListItem,
  Paper,
  Button,
  Grid,
  LinearProgress,
  ListSubheader} from '@material-ui/core/';
import styles from "../../styles";
import { Location, Category } from '../../../../../services/data';
import { getAPI } from '../../../../../services';

const useStyles = makeStyles(styles);
function ManageLocation() {
  var [category, setCategory] = useState({});
  var [categories, setCategories] = useState([]);
  var [categoriesLoaded, setCategoriesLoaded] = useState(false);
  var [locationsLoaded, setLocationsLoaded] = useState(false);
  var [unassignedLocations, setUnassignedLocations] = useState(null);
  let [currentCategoryLocations, setCurrentCategoryLocations] = useState([]);
  let [assignedLocations, setAssignedLocations] = useState({});

  function updateAssignedLocations() {
    let newLocations = {...assignedLocations};
    newLocations[category.uuid] = [...currentCategoryLocations];
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

    Category.getAll({}).then(categories => {
      setCategory({...categories[0]});
      setCategories(categories);
      setCategoriesLoaded(true);
    });
  }, []);

  function addLocation(location) {
    let idx = unassignedLocations.indexOf(location);
    if (idx < 0) return;
    unassignedLocations.splice(idx, 1);
    sortAndSetLocations(setUnassignedLocations, unassignedLocations);
    currentCategoryLocations.push(location);
    sortAndSetLocations(setCurrentCategoryLocations, currentCategoryLocations);
  }

  function removeLocation(location) {
    let idx = currentCategoryLocations.indexOf(location);
    if (idx < 0) return;
    currentCategoryLocations.splice(idx, 1);
    sortAndSetLocations(setCurrentCategoryLocations, currentCategoryLocations);
    unassignedLocations.push(location);
    sortAndSetLocations(setUnassignedLocations, unassignedLocations);
  }

  function changeCategory(newCategory) {
    setCategory({...newCategory});
    updateAssignedLocations();
    if (assignedLocations[newCategory.uuid]) {
      setCurrentCategoryLocations([...assignedLocations[newCategory.uuid]]);
    } else {
      setCurrentCategoryLocations([]);
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
                  <Button onClick={() => addLocation(location)}>
                    <Icon className="fa fa-chevron-right" />
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item style={{flexGrow: 1, width: "50%"}}>
          <Paper>
            <List subheader={<ListSubheader>Locations assigned to {category.display}</ListSubheader>}>
              {currentCategoryLocations.length == 0 && <ListItem>No items</ListItem>}
              {currentCategoryLocations.map((location, idx) => (
                <ListItem
                  key={location.uuid}
                  style={{justifyContent: "space-between"}}
                  divider={idx != currentCategoryLocations.length - 1}
                >
                  <Button onClick={() => removeLocation(location)}>
                    <Icon className="fa fa-chevron-left" />
                  </Button>
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
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="categoryLabel"
          label="Category"
          value={category.uuid || ""}
          onChange={(e) => changeCategory(categories[e.target.value])}
        >
          {categories.map(cat =>
            <MenuItem key={cat.uuid} value={cat.uuid}>{cat.display}</MenuItem>)}
        </Select>
      </FormControl>

      {locationsLoaded && categoriesLoaded
        ? Locations()
        : <LinearProgress />
      }
    </List>
  )
}

export default ManageLocation
