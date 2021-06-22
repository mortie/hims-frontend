import React,{ useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { GridContainer, GridItem } from "../../../components/Grid";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function TextType(props) {
    const classes = useStyles();
    var data = props.textdata;
    var uuid = data.uuid;
    var [successcheck, setSuccesscheck] = useState(false);

    const handleChange = (event) => {
        var btnid = event.target.value
        var cVal = {
            "name": uuid,
            "value":btnid
        }
        setSuccesscheck(true)
        props.onChange(cVal)
    };

    return (
        <GridContainer>
            <GridItem item xs={12} sm={6} md={6}>
                <Typography variant="body1" className={classes.type}>
                {data.display}
                </Typography>
            </GridItem>
            <GridItem item xs={12} sm={6} md={6}>
                <TextField
                id="outlined-multiline-static"
                label={data.display}
                variant="outlined"
                size="small"
                margin="normal"
                className="commentClass"
                onChange={handleChange}
                />
            {/* {successcheck &&
            <Alert severity="success">Saved Successfully!</Alert>
            } */}
            </GridItem>
            <br></br>
            <br></br>

        </GridContainer>
        )
}