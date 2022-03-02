import React, { useState, useEffect } from 'react'
import clsx from "clsx";
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
import { getAPI, postAPI } from '../../../../../services';

const useStyles = makeStyles(styles);
function ManageLocation() {
  let [category, setCategory] = useState({});
  let [categories, setCategories] = useState([]);
  let [dataLoaded, setDataLoaded] = useState(false);
  let [unassignedLocations, setUnassignedLocations] = useState(null);
  let [currentCategoryLocations, setCurrentCategoryLocations] = useState([]);
  let [assignedLocations, setAssignedLocations] = useState({});
  let [hasChanged, setHasChanged] = useState(false);
  let [currentlySaving, setCurrentlySaving] = useState(false);

  let [movements, setMovements] = useState({});

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

  function setState(locations, categories, mappings) {
    let locationsByUUID = {};
    for (let location of locations) {
      locationsByUUID[location.uuid] = location;
    }

    let categoriesByUUID = {};
    for (let category of categories) {
      categoriesByUUID[category.uuid] = category;
    }

    let locationsByCategoryUUID = {};
    for (let categoryUUID in mappings) {
      locationsByCategoryUUID[categoryUUID] = [];
      for (let mapping of mappings[categoryUUID]) {
        locationsByCategoryUUID[categoryUUID].push(locations[mapping.locationUuid]);
      }
    }

    let mappingByLocationUUID = {};
    for (let categoryUUID in mappings) {
      for (let mapping of mappings[categoryUUID]) {
        let locationUUID = mapping.locationUuid;
        mappingByLocationUUID[locationUUID] = categoryUUID;
      }
    }

    let unassignedLocations = [];
    let assignedLocations = {};
    assignedLocations[categories[0].uuid] = [];
    for (let location of locations) {
      if (mappingByLocationUUID[location.uuid]) {
        let categoryUUID = mappingByLocationUUID[location.uuid];
        if (assignedLocations[categoryUUID] == null) {
          assignedLocations[categoryUUID] = [];
        }
        assignedLocations[categoryUUID].push(location);
      } else {
        unassignedLocations.push(location);
      }
    }

    sortAndSetLocations(setCurrentCategoryLocations, assignedLocations[categories[0].uuid]);
    sortAndSetLocations(setUnassignedLocations, unassignedLocations);
    setAssignedLocations(assignedLocations);

    setCategory(categories[0]);
    setCategories(categories);
  }

  function resetState() {
    setDataLoaded(false);
    let locations, categories, mappings;

    Promise.all([
      Location.getAll({}).then(locs => locations = locs),
      Category.getAll({}).then(cats => categories = cats),
      getAPI("/categoryLocation/mapping")
        .then(res => mappings = res.data),
    ]).then(() => {
      setState(locations, categories, mappings);
      setDataLoaded(true);
    });
  }

  useEffect(() => {
    resetState();
  }, []);

  function addLocation(location) {
    let idx = unassignedLocations.indexOf(location);
    if (idx < 0) return;
    unassignedLocations.splice(idx, 1);
    sortAndSetLocations(setUnassignedLocations, unassignedLocations);
    currentCategoryLocations.push(location);
    sortAndSetLocations(setCurrentCategoryLocations, currentCategoryLocations);

    let movement = movements[location.uuid] || {from: null};
    movement.to = category.uuid;
    if (movement.to == movement.from) {
      movement = null;
      delete movements[location.uuid];
    } else {
      movements[location.uuid] = movement;
    }

    setHasChanged(Object.keys(movements).length > 0);
  }

  function removeLocation(location) {
    let idx = currentCategoryLocations.indexOf(location);
    if (idx < 0) return;
    currentCategoryLocations.splice(idx, 1);
    sortAndSetLocations(setCurrentCategoryLocations, currentCategoryLocations);
    unassignedLocations.push(location);
    sortAndSetLocations(setUnassignedLocations, unassignedLocations);

    let movement = movements[location.uuid] || {from: category.uuid};
    movement.to = null;
    if (movement.to == movement.from) {
      delete movements[location.uuid];
    } else {
      movements[location.uuid] = movement;
    }

    setHasChanged(Object.keys(movements).length > 0);
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

  async function save() {
    setCurrentlySaving(true);

    let deletes = {};
    let inserts = {};
    for (let locationUUID in movements) {
      let movement = movements[locationUUID];
      if (movement.from != null) {
        if (deletes[movement.from] == null) {
          deletes[movement.from] = [locationUUID];
        } else {
          deletes[movement.from].push(locationUUID);
        }
      }

      if (movement.to != null) {
        if (inserts[movement.to] == null) {
          inserts[movement.to] = [locationUUID];
        } else {
          inserts[movement.to].push(locationUUID);
        }
      }
    }

    for (let categoryUUID in deletes) {
      await postAPI("/categoryLocation/mapping", {
        priceCategoryConUuid: categoryUUID,
        locationUuids: deletes[categoryUUID],
        deleted: true,
      });
    }

    for (let categoryUUID in inserts) {
      await postAPI("/categoryLocation/mapping", {
        priceCategoryConUuid: categoryUUID,
        locationUuids: inserts[categoryUUID],
        deleted: false,
      });
    }

    setMovements({});
    setHasChanged(false);
    setCurrentlySaving(false);
  }

  let blockInput = !dataLoaded || currentlySaving;

  function Locations() {
    return (
      <Grid container spacing={1}>
        <Grid item style={{flexGrow: 1, width: "50%"}}>
          <Paper>
            <List subheader={
              <ListSubheader>Unassigned locations</ListSubheader>}
            >
              {unassignedLocations.length == 0 && <ListItem>No items</ListItem>}
              {unassignedLocations.map((location, idx) => (
                <ListItem
                  key={location.uuid}
                  style={{justifyContent: "space-between"}}
                  divider={idx != unassignedLocations.length - 1}
                >
                  {location.display}
                  <Button onClick={() => addLocation(location)} disabled={currentlySaving}>
                    <Icon className="fa fa-chevron-right" />
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item style={{flexGrow: 1, width: "50%"}}>
          <Paper>
            <List subheader={
              <ListSubheader style={{textAlign: "right"}}>
                Locations assigned to {category.display}
              </ListSubheader>}
            >
              {currentCategoryLocations.length == 0 && <ListItem>No items</ListItem>}
              {currentCategoryLocations.map((location, idx) => (
                <ListItem
                  key={location.uuid}
                  style={{justifyContent: "space-between"}}
                  divider={idx != currentCategoryLocations.length - 1}
                >
                  <Button onClick={() => removeLocation(location)} disabled={currentlySaving}>
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
      <Grid container spacing={1}>
        <Grid item style={{flexGrow: 1}}>
          <FormControl
            variant="outlined"
            fullWidth
            margin="dense"
            className={classes.field}
            disabled={blockInput}
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
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            disabled={!hasChanged || currentlySaving}
            onClick={resetState}
            className={classes.field}
          >
            Reset
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disabled={!hasChanged || currentlySaving}
            onClick={save}
            className={clsx(classes.button, classes.field)}
          >
            Save
          </Button>
        </Grid>
      </Grid>

      <div style={{height: "5px"}}>
        {currentlySaving && <LinearProgress />}
      </div>

      {dataLoaded
        ? Locations()
        : <LinearProgress />}

      <Grid container spacing={1} style={{justifyContent: "flex-end"}}>
        <Grid item>
          <Button
            variant="contained"
            disabled={!hasChanged || currentlySaving}
            onClick={resetState}
            className={classes.field}
          >
            Reset
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disabled={!hasChanged || currentlySaving}
            onClick={save}
            className={clsx(classes.button, classes.field)}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </List>
  )
}

export default ManageLocation
