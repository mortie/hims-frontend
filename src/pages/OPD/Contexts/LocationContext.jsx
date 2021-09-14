import {
    useState,
    createContext
} from 'react'

export const LocationContext = createContext();

const LocationContextProvider = (props) => {
    const [location, setLocation] = useState(null);

    const changeLocation = (location) => {
        setLocation(location);
    }

    const valuesToReturn = { location, changeLocation }

    return (
        <LocationContext.Provider value={valuesToReturn}>
            {props.children}
        </LocationContext.Provider>
    )
}


export default LocationContextProvider