import { Button, makeStyles, Popover, Typography } from '@material-ui/core'
import { typography } from '@material-ui/system'
import React from 'react'


const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function SimplePopover() {
    const classes = useStyles();

    const [anchorEl, setanchorEl] = React.useState(null);

    const handleClick = (event) => {
        setanchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setanchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open?'popover' : undefined;

    return (
        <div>
            <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                Open Popover
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose = {handleClose}
                anchorOrigin={{
                    vertical:'bottom',
                    horizontal:'center'
                }}
                transformOrigin={{
                    vertical:'top',
                    horizontal:'center',
                }}
                >
                    <Typography className={classes.typography} >This is the content of the popover</Typography>
                </Popover>
        </div>
    )
}