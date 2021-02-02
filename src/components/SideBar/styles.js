import {
  drawerWidth,
  whiteColor,
  blackColor,
  infoColor,
  defaultFont,
  hexToRgb,
  successColor,
} from "../../assets/jss/styles";

const sideBarStyles = (theme) => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  item: {
    textDecoration: "none",
  },
  blue: {
    backgroundColor: infoColor[1],
    borderLeft: "5px solid" + successColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(infoColor[1]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(infoColor[1]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: infoColor[1],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(infoColor[1]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(infoColor[1]) +
        ",.2)",
    },
  },
  whiteFont: {
    color: whiteColor,
  },
});

export default sideBarStyles;
