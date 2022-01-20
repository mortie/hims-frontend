import React from 'react';
import BillingNavbar from './BillingNavbar';
import BillingTabHomeComponent from './BillingTabHomeComponent';
import OpdQue from './OpdQue';
import TabPanelComponent from './TabPanelComponent';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';


function Billing(props) {
    
    return (
    <>
      {/* <TabPanelComponent></TabPanelComponent>  */}
      {/* <Router>
      <BillingNavbar>
      <switch>
        <Route path="/app/billing/home" exact component={BillingTabHomeComponent}></Route>
        <Route path="/app/billing/billingnew" component={OpdQue} exact></Route>
      </switch>
      </BillingNavbar>

      </Router> */}
    
      <BillingNavbar>
      </BillingNavbar>
 
      {/* <BillingTabHomeComponent></BillingTabHomeComponent> */}
     </> 
    );
}

export default Billing;
