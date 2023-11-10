import React from "react"
import { useMsal, useAccount } from "@azure/msal-react"
import axios from "axios"
import { loginRequest } from "./authConfig"

const RequestInterceptor = ({ children }) => {
    const { instance, accounts } = useMsal();
    const account = useAccount(accounts[0]);
  
  /* eslint-disable no-param-reassign */
  axios.interceptors.request.use(async config => {
    if (!account) {
      throw Error("No active account! Verify a user has been signed in.")
    }

    const response = await instance.acquireTokenSilent({
      loginRequest,
      account
    })
   
    const bearer = `Bearer ${response.accessToken}`
    config.headers.Authorization = bearer;
    config.headers['Ocp-Apim-Subscription-Key'] = '{APIM-SUBSCRIPTION-KEY}';
    config.headers["Content-Type"] = 'application/json';
    config.headers['Access-Control-Allow-Origin'] = '*'
    console.log(config);
    return config
  })
  /* eslint-enable no-param-reassign */

  return <>{children}</>
}

export default RequestInterceptor
