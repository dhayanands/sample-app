import { Routes, Route } from "react-router-dom"
import React, { useState } from "react";
import CompanyRegPage from "./CompanyRegistrationPage"
import AppRegPage from "./AppRegistrationPage"
import SummaryPage from "./SummaryPage"
import { useIsAuthenticated, useMsal, useMsalAuthentication,useAccount ,MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import  RequestInterceptor from './RequestInterceptor'
import AddUsersToCompanyPage from "./AddUsersToCompany";
import AddUsersToApplicationPage from "./AddUsersToApplication";
import RemoveUsersFromCompanyPage from "./RemoveUsersFromCompany";
import RemoveUsersFromApplicationPage from "./RemoveUsersFromApplication";
import { loginRequest } from "./authConfig"

function App() {
 
  function Render() {}

 return (
    
    <MsalAuthenticationTemplate 
            interactionType={InteractionType.Redirect} 
            authenticationRequest={loginRequest} 
    >
    <RequestInterceptor>
    <div className="App">
      <Routes>
        <Route path="/" element={ <CompanyRegPage/> } />
        <Route path="/appreg" element={ <AppRegPage/> } />
        <Route path="/summary" element={ <SummaryPage/> } />
        <Route path="/addUsersToCompany" element={ <AddUsersToCompanyPage/> } />
        <Route path="/addUsersToApplication" element={ <AddUsersToApplicationPage/> } />
        <Route path="/removeUsersFromCompany" element={ <RemoveUsersFromCompanyPage/> } />
        <Route path="/removeUsersFromApplication" element={ <RemoveUsersFromApplicationPage/> } />
      </Routes>
    </div>
    </RequestInterceptor>
    </MsalAuthenticationTemplate>
    
  )
    }
 

export default App