const opdStyles = (theme) => ({
    root: {
      width: "100%",
    },
    paper: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
    },
    field: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
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
    table: {
      minWidth: 650,
    }
   
  });
  
  export default opdStyles ;
  