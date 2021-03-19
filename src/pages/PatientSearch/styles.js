const patientSearchStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  rootElement: {
    flexGrow: 1,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  root: {
    width: "92%",
    marginLeft: "4%",
  },
  containerTable: {
    maxHeight: 440,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 10,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  rootage: {
    width: 200,
  },
  input: {
    width: 42,
  },
});
export default patientSearchStyles;
