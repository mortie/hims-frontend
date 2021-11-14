import { RadioGroup, TextField, FormControlLabel, Radio } from "@material-ui/core"
import { Alert, TreeItem, TreeView } from "@material-ui/lab"
import { useState } from "react"
import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';

//import ExpandMoreIcon from '@material-ui/icons-material/ExpandMore';
//import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { connect } from "react-redux"
import { LOCATION_INPATIENT_TAG, LOCATION_OUTPATIENT_TAG, VISIT_OUTCOME_ADMIT, VISIT_OUTCOME_CURED, VISIT_OUTCOME_DIED, VISIT_OUTCOME_FOLLOW_UP, VISIT_OUTCOME_REVIEWED } from "../../../utils/constants"

function OutcomeOptions({ selectedOption, locations, selectedLocation, setSelectedLocation, selectedDate, setSelectedDate }) {
    const outPatientLocations = []
    const inpatientLocations = []

    locations.forEach(location => {
        location.tags.forEach(tag => {
            if (tag.display === LOCATION_INPATIENT_TAG) {
                inpatientLocations.push(location)
            }
            if (tag.display === LOCATION_OUTPATIENT_TAG) {
                outPatientLocations.push(location)
            }
        })
    });

    const selectLocation = (event, nodeId) => {
        setSelectedLocation(nodeId)

    }

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value)
    }
    switch (selectedOption.display) {
        case VISIT_OUTCOME_CURED:
            return <></>
        case VISIT_OUTCOME_REVIEWED:
            return <></>
        case VISIT_OUTCOME_DIED:
            return <>
                <TextField
                    id="date"
                    type="date"
                    inputProps={{ max: (new Date()).toISOString().substr(0, 10) }}
                    value={selectedDate}
                    defaultValue={new Date().toISOString().substr(0, 10)}
                    onChange={handleDateChange}
                />
            </>
        case VISIT_OUTCOME_FOLLOW_UP:
            return <>
                <TextField
                    id="date"
                    type="date"
                    inputProps={{ min: (new Date()).toISOString().substr(0, 10) }}
                    value={selectedDate}
                    defaultValue={new Date().toISOString().substr(0, 10)}
                    onChange={handleDateChange}
                /></>
        case VISIT_OUTCOME_ADMIT:
            return <>
                <h5>
                    Please select Location to Admit:
                </h5>
                {(selectedLocation === "1" || selectedLocation === "0") &&
                    <Alert severity="error">Plase select a proper Location</Alert>}
                <TreeView
                    defaultExpandIcon={<ChevronRight />}
                    defaultCollapseIcon={<ExpandMore />}
                    selected={selectedLocation}
                    onSelect={selectLocation}
                    onNodeSelect={selectLocation}
                >
                    <TreeItem nodeId="1" label={LOCATION_INPATIENT_TAG}>
                        {
                            outPatientLocations.map(location =>
                                <TreeItem nodeId={location.uuid} label={location.display} />
                            )
                        }
                    </TreeItem>
                    <TreeItem nodeId="0" label={LOCATION_OUTPATIENT_TAG}>
                        {
                            inpatientLocations.map(location =>
                                <TreeItem nodeId={location.uuid} label={location.display} />
                            )
                        }
                    </TreeItem>
                </TreeView>
            </>
        default:
            return
    }
}

const mapStateToProps = state => {
    return {
        loadingLocations: state.locations.loadingLocations,
        locations: state.locations.locations
    }
}

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(OutcomeOptions)