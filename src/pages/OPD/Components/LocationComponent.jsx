import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core'
import { useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { LocationContext } from '../Contexts/LocationContext'
import { getAllLocationsAction } from '../../../actions/locationActions'
import { Autocomplete } from '@material-ui/lab'

function Location({ getAllLocationsAction, loadingLocations, locations }) {
    useEffect(() => {
        getAllLocationsAction();
    }, [])

    const { location, changeLocation } = useContext(LocationContext)


    return (
        <div>
            {loadingLocations ?
                <div>Loading locations</div> : ""
            }
            {locations ?
                <Autocomplete
                    id="location"
                    options={locations}
                    getOptionLabel={(option) => (option.display)}
                    onChange={(event, value) => { changeLocation(value) }}
                    value={location}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="location"
                            variant="outlined"
                            size="small"
                            margin="normal"
                        />
                    )} />
                :
                <div>Location not loaded</div>
            }
        </div>
    )
}


const mapStateToProps = state => {
    return {
        loadingLocations: state.locations.loadingLocations,
        locations: state.locations.locations,
    }
}

const mapDispatchToProps = {
    getAllLocationsAction

}


export default connect(mapStateToProps, mapDispatchToProps)(Location);