import React, { useState } from 'react';
import NavbarComponent from './Navbar';
import { SelectMultiple, ErrorSummary  } from '@cegal/ds-components';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import { Application } from './Models.js';
import axios from 'axios';

function AppRegistrationPage() {
  // Use state hooks to store the values of the form fields
  const [application, setApp] = useState(new Application('', '', '', ''));
  const [errorMessage, setErrorMessage] = useState('');
  const [validMessage, setValidMessage] = useState('');
  const location = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  //application.orgId = location.orgId;
  //application.applicationOwner = location.superUserEmail;
  console.log('Received: ' + JSON.stringify(location))

  // Handle the change event of each input field
  const handleInputChange = (field, value) => {
    setApp((prevApp) => ({
      ...prevApp,
      [field]: value,
    }));
    };


  // Handle the submit event of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const clonedApp = Object.assign({}, application)

    clonedApp.applicationOwners = clonedApp.applicationOwners.map((it) => it.value)
    try {
      const response = await axios.post('https://on-poc-shared-apim.azure-api.net/api/c8a/beta/application/addApplication', 
        clonedApp,
      );

      if (response.status==201) {
        // Handle success
        setSubmitting(false);
        setValidMessage("App '" + clonedApp.applicationName + "' created!");
        setErrorMessage("");
      } else {
        // Handle errors
        setSubmitting(false);
        console.error('Error:', response);
        const errorText = await 'Server response: Error: ' + response.status + ' ' + response.statusText;
        setErrorMessage(errorText);        
        setValidMessage("");
      }
    } catch (error) {
        setSubmitting(false);
        console.error('Error:', error);
        //alert('An error occurred while sending data to Azure Function: ' + error.message);
        setErrorMessage(error.message);
        setValidMessage("");
    }

    console.log('Sending: ' + JSON.stringify(clonedApp));    
  };

  return (
    <div className="form-container">
      <NavbarComponent></NavbarComponent>
      <h1>Onboard New App</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="app-name">
            App Name:
          </label>
          <input
            className="form-input"
            type="text"
            id="app-name"
            value={application.applicationName}            
            onChange={(e) => handleInputChange('applicationName', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="applicationId">
            Application ID:
          </label>
          <input
            className="form-input"
            type="text"
            id="applicationId"
            value={application.applicationId}
            onChange={(e) => handleInputChange('applicationId', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="users">
            Owners:
          </label>
         <SelectMultiple className="select-multiple"
            creatable
            value={application.applicationOwners}
            onChange={(values) => setApp({
              ...application, applicationOwners:values
            })}
          options={[
          ]}
        />  
        </div>     
        <button disabled={isSubmitting} className="form-button">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Submit
        </button>
        {validMessage && <div className="valid-message">{validMessage}</div>}
        <div className="paddedBox">
          {errorMessage && (          
              <ErrorSummary icon={false} heading='You must fix these errors before sending the data:'>
              <ErrorSummary.Item>
                  {errorMessage}
              </ErrorSummary.Item>
            </ErrorSummary>
            )
          }          
        </div>
        
        {validMessage && (
          <Link to="/summary">
            <button className="form-button-black-rounded">Continue to Summary</button>
          </Link>
        )}
      </form>
    </div>
  );
}

export default AppRegistrationPage;