import React, { useContext } from "react";
import { connect } from 'react-redux'
import { getAllLocationsAction } from '../../actions/locationActions'
import LocationContextProvider, { LocationContext } from './Contexts/LocationContext'
import {
  Button, MenuItem, Paper, Select,
} from "@material-ui/core";
import Location from "./Components/LocationComponent";
import PatientListContextProvider from "./Contexts/PatientListContext";
import {PatientList} from "./Components/";
import { DataGrid } from "@material-ui/data-grid";
import PatientContextProvider, { PatientContext } from "./Contexts/PatientContext";


function OPD() {
  return (
    <div>
      <LocationContextProvider>
        <PatientListContextProvider>
          <PatientContextProvider>
            <Paper>
              <PatientList/>
            </Paper>
          </PatientContextProvider>
        </PatientListContextProvider>
      </LocationContextProvider>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    loadingLocations: state.locations.loadingLocations,
    locations: state.locations.locations,
    selectedLocation: state.locations.selectedLocation
  }
}

const mapDispatchToProps = {
  getAllLocationsAction,

}


export default connect(mapStateToProps, mapDispatchToProps)(OPD);
