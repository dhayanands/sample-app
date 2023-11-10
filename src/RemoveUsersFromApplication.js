import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SelectMultiple, ErrorSummary  } from '@cegal/ds-components';
import NavbarComponent from './Navbar.js';
import axios from 'axios';
import { Application } from './Models.js';

function RemoveUsersFromApplicationPage () {
  // Use state hooks to store the values of the form fields
  const [application, setApplication] = useState(new Application('', '', '', ''));
  const [errorMessage, setErrorMessage] = useState('');
  const [validMessage, setValidMessage] = useState('');

  // Handle the change event of each input field
  const handleInputChange = (field, value) => {
      setApplication((prevApp) => ({
        ...prevApp,
        [field]: value,
      }));
    };



  // Handle the submit event of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const clonedApp = Object.assign({}, application)

    clonedApp.users = clonedApp.users.map((it) => it.value)
    try {
     
      const response = await axios.post('https://on-poc-shared-apim.azure-api.net/api/c8a/beta/application/RemoveUsers', {
        method: 'POST',
        body: JSON.stringify(clonedApp),
      });

      if (response.ok) {
        // Handle success
        setValidMessage("Application '" + clonedApp.applicationName + "' created!");
        setErrorMessage("");
      } else {
        // Handle errors
        console.error('Error:', response);
        const errorText = await 'Server response: ' + response.status + ' ' + response.statusText;
        setErrorMessage(errorText);        
        setValidMessage("");
      }
    } catch (error) {
        console.error('Error:', error);
        setErrorMessage(error.message);
        setValidMessage("");
    }

    console.log(JSON.stringify(clonedApp));
  };
  

  return (    
    <div className="form-container">
      <NavbarComponent></NavbarComponent>
      <h1>Remove Users From Application</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="application-name">
            Application Name:
          </label>
          <input
            className="form-input"
            type="text"
            id="application-name"
            value={application.applicationName}
            onChange={(e) => handleInputChange('applicationName', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="org-number">
            Application ID:
          </label>
          <input
            className="form-input"
            type="number"
            id="application-id"
            value={application.applicationID}
            onChange={(e) => handleInputChange('applicationID', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="super-user-email">
            Users:
          </label>
         <SelectMultiple className="select-multiple"
            creatable
            value={application.users}
            onChange={(values) => setApplication({
              ...application, users:values
            })}
          options={[
          ]}
        />
        </div>        
        <button className="form-button" type="submit">
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

export default RemoveUsersFromApplicationPage;