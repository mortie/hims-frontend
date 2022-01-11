import React from 'react';
import BillingNavbar from './BillingNavbar';
import BillingTabHomeComponent from './BillingTabHomeComponent';
import OpdQue from './OpdQue';
import TabPanelComponent from './TabPanelComponent';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';


function Billing(props) {
    
    return (
    <>
     <TabPanelComponent></TabPanelComponent>
      {/* <BrowserRouter>
      <BillingNavbar>
      <switch>
      <Route path="/app/billing/home" component={BillingTabHomeComponent}></Route>
      <Route path="/departments" component={OpdQue}></Route>
      </BillingNavbar>
      </switch>
      </BrowserRouter>
     */}
     </> 
    );
}

export default Billing;
