import { Button, FormControl, FormControlLabel, InputLabel, makeStyles, MenuItem, Select, TextField, Radio, RadioGroup } from '@material-ui/core'
import { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { LocationContext } from '../Contexts/LocationContext'
import { getAllLocationsAction } from '../../../actions/locationActions'
import { Autocomplete } from '@material-ui/lab'
import renderOutcomeOptions from './OutcomeOptions'
import OutcomeOptions from './OutcomeOptions'

function VisitOutcome({ getAllLocationsAction, loadingLocations, locations, visitOutcomes, setVisitOutcomeDetails }) {
    useEffect(() => {
        getAllLocationsAction();
    }, [])
    const [visitOutcome, setVisitOutcome] = useState(null)
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [selectedDate, setSelectedDate] = useState("")

    const handleVisitOutcomeChange = (event) => {
        console.log("melaeke vis visit outcomes are ",visitOutcomes)
        setVisitOutcome(visitOutcomes.answers.filter(element => element.display === event.target.value)[0])
        setSelectedDate("")
        setSelectedLocation(null)
    }

    useEffect(() => {
        //here validate if the visit outcome is valid or not.
        setVisitOutcomeDetails({ visitOutcome, selectedLocation, selectedDate, valid:false })
    }, [visitOutcome, selectedLocation, selectedDate])

    return (
        < div >
            <h4>
                OPD Visit outcome*:
            </h4>
            <RadioGroup row aria-label="OPD-visit-outcome" name="visitOutcome" value={visitOutcome ? visitOutcome.display : ""} onChange={handleVisitOutcomeChange}>
                {
                    visitOutcomes.answers.map(answer =>
                        <FormControlLabel value={answer.display} control={<Radio />} label={answer.display} />
                    )
                }
            </RadioGroup>
            {visitOutcome &&
                <OutcomeOptions selectedOption={visitOutcome}
                    selectedLocation={selectedLocation}
                    selectedDate={selectedDate}

                    setSelectedLocation={setSelectedLocation}
                    setSelectedDate={setSelectedDate}
                >
                </OutcomeOptions>
            }
        </div >
    )
}


const mapStateToProps = state => {
    return {
        loadingLocations: state.locations.loadingLocations,
        locations: state.locations.locations,
        visitOutcomes: state.concepts.visitOutcomes
    }
}

const mapDispatchToProps = {
    getAllLocationsAction

}


export default connect(mapStateToProps, mapDispatchToProps)(VisitOutcome);