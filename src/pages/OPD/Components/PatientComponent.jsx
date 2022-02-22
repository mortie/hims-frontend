import { AppBar, Box, Button, Chip, FormControlLabel, Grid, Radio, RadioGroup, Tab, Tabs, TextareaAutosize, TextField, Typography, Dialog, DialogTitle, DialogContent, InputLabel, Tooltip, DialogActions,Paper } from '@material-ui/core';
import { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { connect } from 'react-redux'
import { loadPatientAndConcepts, savePatientDiagnosys,savePatientOrder } from '../../../actions/patientAction'
import PropTypes from 'prop-types';
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { PatientListContext } from '../Contexts/PatientListContext';
import { PatientContext } from '../Contexts/PatientContext';
import TransferList from './TransferListComponent';
import renderOutcomeOptions from './OutcomeOptions';
import { CONCEPT_DIAGNOSIS, CONCEPT_INVESTIGATION, CONCEPT_PROCEDURE, CONCEPT_SYMPTOPM, ENCOUNTER_TYPE_VITALS } from '../../../utils/constants';
import VisitOutcomeComponent from './VisitOutcomeComponent';
import { getAPI } from '../../../services';
import {HOSPITAL_NAME} from '../../../utils/constants'
import { GridContainer,GridItem } from '../../../components';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#EBECEC',
    },
    title: {
        backgroundColor: "#3EABC1",
        color: "#FFFFFF",
      },
    inputField: {
        width: 400,
        alignContent: 'left'
    }
}));


function Patient({
    loadPatientAndConcepts,
    patientData,
    patientObject,
    loadingPatient,
    symptom,
    diagnosis,
    investigation,
    procedure,
    vitals,
    allConcepts,
    savePatientDiagnosys,
    savePatientOrder
}) {

    console.log("Melaeke investigation prop is ", investigation)
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const [showVitalDialog, setShowVitalDialog] = useState(false);
    const [symptomsObject, setSymptomsObject] = useState([])
    const [diagnosisObject, setDiagnosisObject] = useState([])
    const [procedureObject, setProcedureObject] = useState([])
    const [investigationObject, setInvestigationObject] = useState([])
    
    const history = useHistory();
    const [selectedInvestigation, setSelectedInvestigation] = useState([])
    const [extraDiagnosis, setExtraDiagnosis] = useState([])
    const [extraSymptoms, setExtraSymptoms] = useState([])
    const [extraInvestigations, setExtraInvestigations] = useState([])
    const [extraProcedures, setExtraProcedures] = useState([])

    const [visitOutcomeDetails, setVisitOutcomeDetails] = useState(null)

    const { selectedVisit, selectVisit } = useContext(PatientContext)
    const [editVitals, setEditVitals] = useState(false)


    let latestVitalEncounter = null;

    if (patientObject) {
        patientObject.encounters.forEach(encounter => {
            if (encounter.encounterType.display === ENCOUNTER_TYPE_VITALS) {
                //This is a vital encounter
                if (latestVitalEncounter === null || (new Date(latestVitalEncounter.encounterDateTime) < new Date(encounter.encounterDateTime))) {
                    latestVitalEncounter = encounter
                }
            }
        })
    }
    const getSelectedValues = (theArray) => {
        return theArray.filter(obj => {
            return obj.selected;
        })
    }

    const handleSaveClick = () => {
 
        try{
            console.log(selectedVisit);
        let orderpayload = {
            patient: selectedVisit.id,
            location: selectedVisit.locationId,
            investigations: getSelectedValues(investigationObject),
            procedures: getSelectedValues(procedureObject),
        }
        console.log(orderpayload);
        savePatientOrder(orderpayload);
        let payload = {
            selectedDiagnosis: getSelectedValues(diagnosisObject),
            selectedSymptoms: getSelectedValues(symptomsObject),
            selectedInvestigation: getSelectedValues(investigationObject),
            selectedProcedures: getSelectedValues(procedureObject),
            visit: selectedVisit,
            visitOutcomeDetails: visitOutcomeDetails,
        }
        savePatientDiagnosys(payload);
        }
        catch (e){
            enqueueSnackbar("OPD Order not generated");
        }
        enqueueSnackbar("OPD Order has successfully generated");
        window.location.reload(false);
    }

    const handleVitalDialogClose = () => {
        setShowVitalDialog(false)
    }

    const handleVitalDialogOpen = () => {
        setShowVitalDialog(true)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const getMembers = (objects) => {
        let children = []
        objects.forEach(item => {
            if (item.selected)
                item.setMembers.forEach(element => {
                    let conceptClass = allConcepts[element.uuid].conceptClass.display

                    let selected = false;
                    let conceptClassFound = false;
                    switch (conceptClass) {
                        case CONCEPT_DIAGNOSIS: {
                            selected = diagnosisObject.filter(obj => { return obj.uuid === element.uuid })[0].selected
                            conceptClassFound = true;
                            break;
                        }
                        case CONCEPT_INVESTIGATION: {
                            selected = investigationObject.filter(obj => { return obj.uuid === element.uuid })[0].selected
                            conceptClassFound = true;
                            break;
                        }
                        case CONCEPT_PROCEDURE: {
                            selected = procedureObject.filter(obj => { return obj.uuid === element.uuid })[0].selected
                            conceptClassFound = true;
                            break;
                        }
                        case CONCEPT_SYMPTOPM: {
                            selected = symptomsObject.filter(obj => { return obj.uuid === element.uuid })[0].selected
                            conceptClassFound = true;
                            break;
                        } default: {
                            break;
                        }
                    }
                    if (conceptClassFound && !selected) {
                        children.push(element)
                    }
                })
        })

        if (children.length > 0) {
            let newArray = []
            children.forEach(child => {
                let concept = allConcepts[child.uuid]
                child.display = concept.display
                child.hidden = false
                child.selected = false
                child.checked = false
            })
            return children
        }
        return []
    }


    const handleInvestigationSelect = (investigations) => {
        let newInvestigations = genericSelect({ theObject: investigationObject, selectedArray: investigations })

        setInvestigationObject(newInvestigations)
        setExtraSymptoms(getMembers(newInvestigations))
    }

    const handleInvestigationUnselect = (investigations) => {
        let newInvestigations = genericUnSelect({ theObject: investigationObject, selectedArray: investigations })

        setInvestigationObject(newInvestigations)
        setExtraSymptoms(getMembers(newInvestigations))
    }

    const genericSelect = ({ theObject, selectedArray }) => {
        let newObj = [...theObject]
        newObj.forEach(obj => {
            selectedArray.forEach(selectedObj => {
                if (obj.uuid === selectedObj.uuid) {
                    obj.selected = true
                }
            })
        })

        return newObj
    }


    const genericUnSelect = ({ theObject, selectedArray }) => {
        let newObj = [...theObject]
        newObj.forEach(obj => {
            selectedArray.forEach(selectedObj => {
                if (obj.uuid === selectedObj.uuid) {
                    obj.selected = false
                }
            })
        })

        return newObj
    }

    const handleDiagnosisSelect = (diagnosis) => {
        let newDiagnosis = genericSelect({ theObject: diagnosisObject, selectedArray: diagnosis })

        setDiagnosisObject(newDiagnosis)
        setExtraDiagnosis(getMembers(newDiagnosis))
    }

    const handleDiagnosisUnselect = (diagnosis) => {
        let newDiagnosis = genericUnSelect({ theObject: diagnosisObject, selectedArray: diagnosis })

        setDiagnosisObject(newDiagnosis)
        setExtraDiagnosis(getMembers(diagnosisObject))
    }

    const handleSymptomSelect = (symptoms) => {
        let newSymptoms = genericSelect({ theObject: symptomsObject, selectedArray: symptoms })

        setSymptomsObject(newSymptoms)
        setExtraSymptoms(getMembers(newSymptoms))
    }

    const handleSymptomUnselect = (symptoms) => {
        let newSymptoms = genericUnSelect({ theObject: symptomsObject, selectedArray: symptoms })

        setSymptomsObject(newSymptoms)
        setExtraSymptoms(getMembers(newSymptoms))
    }


    const handleProcedureSelect = (procedures) => {
        let newProcedures = genericSelect({ theObject: procedureObject, selectedArray: procedures })

        setProcedureObject(newProcedures)
        setExtraProcedures(getMembers(newProcedures))
    }
    const handleProcedureUnselect = (procedures) => {
        let newProcedures = genericUnSelect({ theObject: procedureObject, selectedArray: procedures })

        setProcedureObject(newProcedures)
        setExtraProcedures(getMembers(newProcedures))
    }

    const handleExtraSelect = (value) => {
        let conceptClass = allConcepts[value.uuid].conceptClass.display

        switch (conceptClass) {
            case CONCEPT_DIAGNOSIS: {

                break;
            }
            case CONCEPT_INVESTIGATION: {
                let newObj = [...investigationObject]
                newObj.filter(obj => { return obj.uuid === value.uuid })[0].selected = true
                setInvestigationObject(newObj);
                break;
            }
            case CONCEPT_PROCEDURE: {

                break;
            }
            case CONCEPT_SYMPTOPM: {
                break;
            } default: {
                break;
            }
        }
        setExtraInvestigations(getMembers(investigationObject))
        setExtraDiagnosis(getMembers(diagnosisObject))
        setExtraSymptoms(getMembers(symptomsObject))
        setExtraProcedures(getMembers(procedureObject))
    }


    useEffect(() => {
        loadPatientAndConcepts(selectedVisit.id)
    }, [])

    const initializeObjects = (obj) => {
        //using string to make a deep copy.
        let newObj = JSON.parse(JSON.stringify(obj))
        newObj.forEach((obj, i) => {
            obj.hidden = false
            obj.selected = false
            obj.sortIndex = i
            obj.checked = false

            if (obj.display.startsWith('A') || obj.display.startsWith('B')) {
                obj.hidden = true;
            }
        })

        newObj.sort((a, b) => (a.display > b.display) ? 1 : -1)
        return newObj
    }

    //initialize diagnosis object.
    useEffect(() => {
        if (diagnosis) {
            setDiagnosisObject(initializeObjects(diagnosis));
        }
    }, [diagnosis])

    //initialize symptoms object
    useEffect(() => {
        if (symptom) {
            setSymptomsObject(initializeObjects(symptom))
        }
    }, [symptom])

    useEffect(() => {
        if (procedure) {
            setProcedureObject(initializeObjects(procedure))
        }
    }, [procedure])

    useEffect(() => {
        if (investigation) {
            setInvestigationObject(initializeObjects(investigation))
        }
    }, [investigation])


    return (
        /**
         * TODO 
         * make the Transfer lists in their own separate components so that reloading doesn't take that much time.
         * 
         */
        <div className={classes.root}>
            {!loadingPatient && patientObject ?
                <Paper>
                <Paper className={classes.root}>
                    <GridContainer >
                        <GridItem item xs container direction="column">
                            <Typography variant="subtitle1" spacing={2}>
                                <b>Name:</b> {patientObject.person.display}
                            </Typography>
                        
                        </GridItem>
                        <GridItem item xs container direction="column">
                        <Typography variant="subtitle1" spacing={2}>
                            <b>Gender:</b> {patientObject.person.gender === "M" ? "Male" : "Female"}
                         </Typography>
                        </GridItem>
                        </GridContainer>
                        <GridContainer>
                        <GridItem item xs container direction="column">
                        <Typography variant="subtitle1" spacing={2}>
                            <b>Identifier:</b> {patientObject.identifiers[0].identifier}
                         </Typography>
                        </GridItem>
                        <GridItem item xs container direction="column">
                        <Typography variant="subtitle1" spacing={2}>
                            <b>Location:</b> {selectedVisit.location}
                         </Typography>
                        </GridItem>
                    </GridContainer>
                    </Paper>
                    <br />
                    <AppBar position="static" >
                        <Tabs className={classes.title} value={value} variant="fullWidth" onChange={handleChange} aria-label="Tabs">
                            <Tab label="Clinical notes" />
                            <Tab label="Dashboard" />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <Dialog open={showVitalDialog}
                            maxWidth="lg"
                            onClose={handleVitalDialogClose}
                            fullWidth
                        >
                            <DialogTitle id="vitalsDialogTitle" >
                                <h3 style={{ margin: 0 }}>Vital Signs</h3>
                                <Chip
                                    label={`${patientObject.person.display}`} />
                            </DialogTitle>

                            <DialogContent dividers>
                                <Grid container spacing={2}>
                                    {
                                        vitals.map(vital => {
                                            let value = ""
                                            if (latestVitalEncounter) {
                                                latestVitalEncounter.obs.forEach(observation => {
                                                    if (observation.display.startsWith(vital.display)) {
                                                        console.log(observation, vital)
                                                        value = observation.display.split(":")[1].trim()
                                                        return;
                                                    }
                                                })
                                            }
                                            return (
                                                <Grid item xs={12} sm={6} md={3} key={vital.uuid}>
                                                    <Tooltip title={vital.display}>
                                                        <TextField InputProps={{ readOnly: !editVitals }} id={vital.display} label={vital.display} value={value} />
                                                    </Tooltip>

                                                </Grid>
                                            )
                                        })

                                    }
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={(() => {
                                    console.log("editing vitals")
                                    setEditVitals(false)
                                })} >Edit</Button>
                                <Button type="submit" color="primary">Save</Button>
                            </DialogActions>

                        </Dialog>
                        <Button
                            onClick={handleVitalDialogOpen} variant="contained"
                        >
                            Vitals
                        </Button>
                        <br/><br/>
                        <TransferList label="Symptoms"
                            options={symptomsObject}
                            handleExtraSelect={handleExtraSelect}
                            extraOptions={extraSymptoms}
                            handleSelect={handleSymptomSelect}
                            handleUnselect={handleSymptomUnselect}>

                        </TransferList>
                        <br />
                        <TransferList label="Diagnosis"
                            options={diagnosisObject}
                            extraOptions={extraDiagnosis}
                            handleExtraSelect={handleExtraSelect}
                            handleSelect={handleDiagnosisSelect}
                            handleUnselect={handleDiagnosisUnselect}></TransferList>
                        <br />
                        <TransferList label="Procedure"
                            extraOptions={extraProcedures}
                            handleExtraSelect={handleExtraSelect}
                            options={procedureObject}
                            handleSelect={handleProcedureSelect}
                            handleUnselect={handleProcedureUnselect}
                        ></TransferList>
                        <br />
                        <TransferList label="Investigation"
                            extraOptions={extraInvestigations}
                            options={investigationObject}
                            handleExtraSelect={handleExtraSelect}
                            handleSelect={handleInvestigationSelect}
                            handleUnselect={handleInvestigationUnselect}
                        ></TransferList>
                        <br />
                        <hr />
                       <br/>
                            Oter Instructions:
                        <br/>
                        <TextareaAutosize aria-label="minimum height" width={800} minRows={2} />

                        <br/>

                        <VisitOutcomeComponent setVisitOutcomeDetails={setVisitOutcomeDetails}></VisitOutcomeComponent>
                        

                        <Button
                            onClick={handleSaveClick} variant="contained"
                        >
                            Save
                        </Button>

                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Dashboard
                    </TabPanel></Paper>
                :
                <>
                    Loading patient
                </>
            }
        </div>
    )
}


const mapStateToProps = state => {
    console.log(state)
    return {
        patientData: state.location,
        patientObject: state.patient.patient,
        loadingPatient: state.patient.loadingPatient,
        symptom: state.concepts.symptom,
        diagnosis: state.concepts.diagnosis,
        procedure: state.concepts.procedure,
        investigation: state.concepts.investigation,
        vitals: state.concepts.vitals,
        allConcepts: state.concepts.allConcepts
    }
}

const mapDispatchToProps = {
    loadPatientAndConcepts,
    savePatientDiagnosys,
    savePatientOrder
}


export default connect(mapStateToProps, mapDispatchToProps)(Patient);