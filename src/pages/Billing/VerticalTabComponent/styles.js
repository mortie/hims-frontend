const panelVerticalstyle = (theme) =>({
    root: {
       
        backgroundColor: theme.palette.background.paper,
        //display: 'flex',
       
      },
      tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
      },
      panelfirst:{
        flexGrow: 1
      }
  });
  
  export default panelVerticalstyle;