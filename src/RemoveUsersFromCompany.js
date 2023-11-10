
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SelectMultiple, ErrorSummary  } from '@cegal/ds-components';
import NavbarComponent from './Navbar.js';
import axios from 'axios';
import { Company } from './Models.js';

function RemoveUsersFromCompanyPage() {
  // Use state hooks to store the values of the form fields
  const [company, setCompany] = useState(new Company('', '', '', '', ''));
  const [errorMessage, setErrorMessage] = useState('');
  const [validMessage, setValidMessage] = useState('');

  // Handle the change event of each input field
  const handleInputChange = (field, value) => {
      setCompany((prevCompany) => ({
        ...prevCompany,
        [field]: value,
      }));
    };



  // Handle the submit event of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const clonedCompany = Object.assign({}, company)

    clonedCompany.users = clonedCompany.users.map((it) => it.value)
    try {
     
      const response = await axios.post('https://on-poc-shared-apim.azure-api.net/api/c8a/beta/RemoveUsersFromCompany', {
        method: 'POST',
        body: JSON.stringify(clonedCompany),
      });

      if (response.ok) {
        // Handle success
        setValidMessage("Company '" + clonedCompany.companyName + "' created!");
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

    console.log(JSON.stringify(clonedCompany));
  };
  

  return (    
    <div className="form-container">
      <NavbarComponent></NavbarComponent>
      <h1>Remove Users From Company</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="company-name">
            Company Name:
          </label>
          <input
            className="form-input"
            type="text"
            id="company-name"
            value={company.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="org-number">
            Org Number:
          </label>
          <input
            className="form-input"
            type="number"
            id="org-numb"
            value={company.orgNumb}
            onChange={(e) => handleInputChange('orgNumb', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="super-user-email">
            Users:
          </label>
         <SelectMultiple className="select-multiple"
            creatable
            value={company.users}
            onChange={(values) => setCompany({
              ...company, users:values
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

export default RemoveUsersFromCompanyPage;