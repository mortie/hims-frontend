const ConceptStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    // padding: theme.spacing(2),
  },
  header:{
    backgroundColor: "#3EABC1",
    color: "#FFFFFF",
    fontSize:18
  },
  root: {
    width: '100%',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  subcontent:{
    
    marginLeft: theme.spacing(6),
  },
  field: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  button: {
    marginRight: theme.spacing(2),
  },
  containerTable: {
    maxHeight: 440,
  },
  checkbox:{
    marginTop: 20
  }
});
export default ConceptStyles;
