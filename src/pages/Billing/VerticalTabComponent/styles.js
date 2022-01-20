const panelVerticalstyle = (theme) =>({
    root: {
       
        backgroundColor: theme.palette.background.paper,
       marginTop:`1rem`,
       marginBottom: "1rem"
       
      },
      tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        background:`#fff`,
        color:`#000`
      },
      a: {
        color: "#000",
        "&:hover": {
            color: "#000"
           
        }
      }
    
  });
  
  export default panelVerticalstyle;