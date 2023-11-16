import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SelectMultiple, ErrorSummary  } from '@cegal/ds-components';
import NavbarComponent from './Navbar.js';
import axios from 'axios';
import {Company} from  './Models.js'

function CompanyRegistrationPage() {

  // Use state hooks to store the values of the form fields
  const [company, setCompany] = useState(new Company('', '', '', '', ''));
  const [errorMessage, setErrorMessage] = useState('');
  const [validMessage, setValidMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  // Handle the change event of each input field
  const handleInputChange = (field, value) => {
      setCompany((prevCompany) => ({
        ...prevCompany,
        [field]: value,
      }));
    };



  // Handle the submit event of the form
  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
   
    const clonedCompany = Object.assign({}, company)

    clonedCompany.connectedDomains = clonedCompany.connectedDomains.map((it) => it.value)
   // clonedCompany.superUserEmail = clonedCompany.superUserEmail.map((it) => it.value)
    try {
     
      const response = await axios.post('https://on-poc-shared-apim.azure-api.net/api/c8a/beta/company/addCompany', 
        clonedCompany,
      );
      
      console.log(response);

      if (response.status==201) {
        // Handle success
        setSubmitting(false);
        setValidMessage("Company '" + clonedCompany.companyName + "' created!");
        setErrorMessage("");
      } else {
        // Handle errors
        setIsLoading(false);

        console.log(response.status);
        console.error('Error:', response);
        const errorText = await 'Server response: ' + response.status + ' ' + response.statusText;
        setErrorMessage(errorText);        
        setValidMessage("");
      }
    } catch (error) {
        setSubmitting(false);
        console.log(response.status);
        console.error('Error:', error);
        setErrorMessage(error.message);
        setValidMessage("");
    }

    console.log(JSON.stringify(clonedCompany));
  };
  

  return (    
    <div className="form-container">
      <NavbarComponent></NavbarComponent>
      <h1>Onboard New Company</h1>
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
          <label className="form-label" htmlFor="org-id">
            Org ID:
          </label>
          <input
            className="form-input"
            type="number"
            id="org-id"
            value={company.orgId}
            onChange={(e) => handleInputChange('orgId', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="primary-domain">
            Primary Domain:
          </label>
          <input
            className="form-input"
            type="text"
            id="primary-domain"
            value={company.primaryDomain}
            onChange={(e) => handleInputChange('primaryDomain', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="connected-domains">
            Connected Domains:
          </label>
        <SelectMultiple className="select-multiple"
            creatable
            value={company.connectedDomains}
            onChange={(values) => setCompany({
              ...company, connectedDomains:values
            })}
          options={[
          ]}
        />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="super-user-email">
          Super User Email:
          </label>
          <input
            className="form-input"
            type="text"
            id="super-user-email"
            value={company.superUserEmail}
            onChange={(e) => handleInputChange('superUserEmail', e.target.value)}
          />
        </div>
        
        {/* <div className="form-group">
          <label className="form-label" htmlFor="super-user-email">
            Super User Email:
          </label>
         <SelectMultiple className="select-multiple"
            creatable
            value={company.superUserEmail}
            onChange={(values) => setCompany({
              ...company, superUserEmail:values
            })}
          options={[
          ]}
        />
        </div>         */}
        
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
          <Link to={{
            pathname: "/appreg",
            state: company 
          }}>
            <button className="form-button-black-rounded">Continue to App Registration</button>
          </Link>
        )}
      </form>
    </div>
  );
}

export default CompanyRegistrationPage;

