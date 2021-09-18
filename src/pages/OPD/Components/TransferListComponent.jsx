import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Popover, TextField } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        height: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
    popover: {
        width: 800,
        overflow: 'auto'
    }
}));

const LEFT = "LEFT"
const RIGHT = "RIGHT"

export default function TransferList({ options, handleSelect, handleUnselect, label, extraOptions, handleExtraSelect }) {
    const classes = useStyles();
    const [searchText, setSearchText] = React.useState("");
    const [allOptions, setAllOptions] = React.useState([])

    const [popoverAnchor, setPopoverAnchor] = React.useState(false)

    const [leftLength, setLeftLength] = React.useState(0)
    const [rightLength, setRightLength] = React.useState(0)
    const [leftCheckedLength, setLeftCheckedLength] = React.useState(0);
    const [rightCheckedLength, setRightCheckedLength] = React.useState(0);

    React.useEffect(() => {
        let allOptions = JSON.parse(JSON.stringify(options));
        setAllOptions(allOptions)
    }, [options])

    const handlePopoverClick = (e) => {
        setPopoverAnchor(e.currentTarget);
    }

    const handlePopoverClose = () => {
        setPopoverAnchor(null)
    }

    const handleToggle = (value) => () => {
        var newOptions = [...allOptions]
        let tempObject = newOptions[newOptions.indexOf(value)]
        if (tempObject.checked === false) {
            tempObject.checked = true;
        } else {
            tempObject.checked = false
        }

        let leftChecked = 0;
        let rightChecked = 0;
        newOptions.forEach(item => {
            if (item.checked) {//this item is checked
                console.log(item.selected)
                if (item.selected) {
                    rightChecked = rightChecked + 1
                }
                else {
                    if (item.selected === false) {
                        leftChecked = leftChecked + 1
                    }
                }
            }
        })

        setLeftCheckedLength(leftChecked)
        setRightCheckedLength(rightChecked)

        setAllOptions(newOptions)
    };


    const handleAllRight = () => {
        //let newOptions = [...options]

        let selectedOnes = []

        allOptions.forEach(option => {
            if (option.selected === false) {
                if (
                    searchText === "" && option.hidden === false || (
                        searchText !== "" && option.display.toLowerCase().includes(searchText.toLowerCase())
                    )
                ) {
                    selectedOnes.push(option)
                }
            }
        })
        //setLeftLength(0);
        //setRightLength(selectedOnes.length);
        //Inform parent of operation.
        handleSelect(selectedOnes);

        //setAllOptions(newOptions)
    };

    const handleAllLeft = () => {
        let unselectedItems = []

        allOptions.forEach(option => {
            if (option.selected === true) {
                unselectedItems.push(option)
            }
        })
        //setRightLength(selectedOnes.length);
        //Inform parent of operation.
        handleUnselect(unselectedItems);
    };

    const handleCheckedRight = () => {
        let selectedItems = []
        allOptions.forEach(item => {
            //check if it is on the left side. If it is not selected perform nothing.
            if (item.selected === false && item.checked === true) {
                //select the item
                selectedItems.push(item)
            }
        })

        if (selectedItems.length > 0) {
            //uncheck the items now.
            //inform parent about change
            handleSelect(selectedItems)
        }
    };

    const handleCheckedLeft = () => {
        let unselectedItems = []

        allOptions.forEach(item => {
            //filter out only selected and checked items
            if (item.selected === true && item.checked === true) {
                unselectedItems.push(item)
            }
        })

        if (unselectedItems.length > 0) {
            //inform parent about change
            handleUnselect(unselectedItems)
        }
    };

    const handleSearchTextChange = (text) => {
        setSearchText(text)
    }

    const LeftList = () => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {allOptions.map((value) => {
                    const labelId = `transfer-list-item-${value.uuid}-label`;

                    return (
                        <>
                            {!value.selected &&
                                ((searchText === "" && !value.hidden) || (searchText !== "" && value.display.toLowerCase().includes(searchText.toLowerCase()))) &&
                                <ListItem display={value.selected === true ? "none" : ""} key={value.uuid} role="listitem" button onClick={handleToggle(value)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={value.checked}
                                            tabIndex={-1}
                                            disabled={value.selected}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`${value.display}`} />
                                </ListItem>
                            }
                        </>
                    );
                })}
                <ListItem />
            </List>
        </Paper >
    );

    const RightList = () => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {allOptions.map((value) => {
                    const labelId = `transfer-list-item-${value.uuid}-label`;

                    return (
                        <>
                            {
                                value.selected &&
                                <ListItem key={value.uuid} role="listitem" button onClick={handleToggle(value)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={value.checked}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`${value.display}`} />
                                </ListItem>
                            }
                        </>
                    );
                })}
                <ListItem />
            </List>
        </Paper >
    );

    console.log("melaeke extra options is ", extraOptions)
    const RecommendationsList = () => (
        <Paper className={classes.popover}>
            <List dense component="div" role="list">
                {extraOptions.map((value) => {
                    const labelId = `transfer-list-item-${value.uuid}-label-all`;

                    return (
                        <>
                            {
                                <ListItem key={value.uuid} role="listitem" button
                                    onClick={() => {
                                        handleExtraSelect(value)
                                        handleSelect();
                                    }}>
                                    <ListItemText id={labelId} primary={`${value.display}`} />
                                </ListItem>
                            }
                        </>
                    );
                })}
                <ListItem />
            </List>
        </Paper >
    );

    return (
        <>
            <h4>{label} :
                <TextField
                    className={classes.inputField}
                    id={label + "-serach"}
                    label=""
                    value={searchText}
                    onChange={
                        (event) => { handleSearchTextChange(event.target.value) }
                    }
                >
                </TextField></h4>
            <Grid
                container
                spacing={1}
                justifyContent="left"
                alignItems="center"
                className={classes.root}>
                <Grid item xs={6}>{LeftList()}</Grid>
                <Grid item xs={1}>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            id={label + "-popover"}
                            variant="outlined"
                            size="big"
                            className={classes.button}
                            onClick={handlePopoverClick}
                            disabled={!(extraOptions && extraOptions.length > 0)}
                            aria-label="More"
                        >
                            <MoreVertIcon />
                        </Button>
                        {extraOptions && extraOptions.length > 0 &&
                            <Popover
                                className={classes.popover}
                                id={label + '-popover'}
                                open={Boolean(popoverAnchor)}
                                anchorEl={popoverAnchor}
                                onClose={handlePopoverClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center'
                                }}
                            >
                                <RecommendationsList />
                            </Popover>
                        }
                        <Button
                            variant="outlined"
                            size="big"
                            className={classes.button}
                            onClick={handleAllRight}
                            disabled={leftLength !== 0}
                            aria-label="move all right"
                        >
                            ≫
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedRight}
                            disabled={leftCheckedLength === 0}
                            aria-label="move selected right"
                        >
                            &gt;
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedLeft}
                            disabled={rightCheckedLength === 0}
                            aria-label="move selected left"
                        >
                            &lt;
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleAllLeft}
                            disabled={rightLength !== 0}
                            aria-label="move all left"
                        >
                            ≪
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={5}>{RightList()}</Grid>
            </Grid>
        </ >

    );
}
