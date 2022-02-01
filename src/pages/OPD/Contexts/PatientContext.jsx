import {
    useState,
    createContext,
    useEffect
} from 'react'

export const PatientContext = createContext();

const PatientContextProvider = (props) => {
    /**
     * For the visit, id is the patient ID, 
     * visit is the visit id.
     */
    const [selectedVisit, setSelectedVisit] = useState(null);

    const selectVisit = (visit) => {
        setSelectedVisit(visit)
    }

    const valuesToReturn = { selectedVisit, selectVisit }

    return (
        <PatientContext.Provider value={valuesToReturn}>
            {props.children } 
        </PatientContext.Provider>
    )
}


export default PatientContextProvider