import {
    useState,
    createContext,
    useEffect
} from 'react'

export const PatientContext = createContext();

const PatientContextProvider = (props) => {
    const [selectedPatientId, setSelectedPatientId] = useState(null);

    const selectPatientId = (patientId) => {
        setSelectedPatientId(patientId)
    }

    const valuesToReturn = { selectedPatientId, selectPatientId }

    return (
        <PatientContext.Provider value={valuesToReturn}>
            {props.children}
        </PatientContext.Provider>
    )
}


export default PatientContextProvider