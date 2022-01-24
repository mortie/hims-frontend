import {
    useState,
    createContext
} from 'react'
import { calculateAge } from '../../../utils/commons';
import moment from "moment";

export const PatientListContext = createContext();

const PatientListContextProvider = (props) => {
    const [patientsList, setPatientList] = useState([])

    const filterPatientList = ({ visits, location, searchText }) => {
        if (!visits) {
            return;
        }
        let list = visits.filter((visit) => {
            if (location && visit.location.display !== location.display) {
                return false;
            }
            if (searchText) {
                let name = visit.patient.person.display
                let patientId = visit.patient.identifiers[0].identifier
                if (!(name.toLowerCase().includes(searchText.toLowerCase()) ||
                    patientId.toLowerCase().includes(searchText.toLowerCase()))) {
                    return false;
                }
            }
            return true;
        }).map((visit) => {
            return {
                visit: visit.uuid,
                id: visit.patient.uuid,
                patientId: visit.patient.identifiers[0].identifier,
                name: visit.patient.person.display,
                gender: visit.patient.person.gender,
                locationId:visit.location.uuid,
                location: visit.location.display,
                age: calculateAge(visit.patient.person.birthdate),
                time: moment(visit.startDatetime).format("DD-MM-YYYY hh:mm A")
            }
        })
        list = list.filter((visit) => {
            var visitDate = visit.time.split(" ")
            var date = moment(new Date()).format("DD-MM-YYYY")
            if (visitDate[0] === date) {
                return visit
            }
        })
        setPatientList(list)
    }


    const valuesToReturn = { patientsList, filterPatientList }

    return (
        <PatientListContext.Provider value={valuesToReturn}>
            {props.children}
        </PatientListContext.Provider>
    )
}


export default PatientListContextProvider