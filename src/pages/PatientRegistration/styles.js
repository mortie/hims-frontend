const patientRegistrationStyles = (theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  field: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  phoneField: {
    border: "1px solid #f44336 !important",
    boxShadow: "none !important",
  },
  phoneFieldHelperText: {
    marginTop: "-5px",
    marginLeft: "14px",
    marginRight: "14px"
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  card: {
    cursor: "pointer",
  },
  cardSelected: {
    background: "#fafafa",
    boxShadow: "0 1px 4px 0 #3f51b5",
    transition: "all .3s cubic-bezier(0,0,1,1)",
  },
  cardBodyInfo: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
});

export default patientRegistrationStyles;
