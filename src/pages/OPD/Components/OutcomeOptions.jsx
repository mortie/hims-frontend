import { TextField } from "@material-ui/core"
import { FormControlLabel } from "@material-ui/pickers"

let renderOutcomeOptions = (options) => {
    switch (options) {
        case 'cured':
            return <></>
        case 'referred':
            return <></>
        case 'followup':
            return <>
                <TextField
                    id="date"
                    label="Date"
                    type="date"
                    defaultValue={new Date().toISOString().substr(0, 10)}
                />
            </>
        case 'reviewed':
            return <></>
        case 'dead':
            return <>
                <TextField
                    id="date"
                    label="Date"
                    type="date"
                    defaultValue={new Date().toISOString().substr(0, 10)}
                /></>
        case 'admit':
            return <></>
        default:
            return
    }
}
export default renderOutcomeOptions