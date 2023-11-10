# Getting Started with Sample App


## Prerequisites

* [Node.js](https://nodejs.org/en/download/) must be installed to run this sample.
* A modern web browser.
* A service  account in **Azure AD** tenant.


## How to start

- Clone the Repo

- Update the configurations
    - Update {CLIENT-ID} & {TENANT-ID} in the file `.\src\authConfig.js` file
    ```js
        auth: {
        clientId: "{CLIENT-ID}",
        authority: "https://login.microsoftonline.com/{TENANT-ID}",
        redirectUri: "http://localhost:3000/"
    },
    ```
    - Update {APIM-SUBSCRIPTION-KEY} in the `.\src\RequestInterceptor.js` file


- Start the application
    ```bash
    npm install
    npm start
    ```
    Runs the app in the development mode.\
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

