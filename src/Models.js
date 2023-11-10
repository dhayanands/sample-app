export class Company {
  constructor(companyName, orgNumb, primaryDomain, connectedDomains, superUserEmail, users) {
    this.companyName = companyName;
    this.orgNumb = orgNumb;
    this.primaryDomain = primaryDomain;
    this.connectedDomains = connectedDomains;
    this.superUserEmail = superUserEmail;
    this.users = users;
  }
}

export class Application {
  constructor(applicationName, applicationID, orgNumb, applicationOwner, users) {
    this.applicationName = applicationName;
    this.applicationID = applicationID;
    this.orgNumb = orgNumb;
    this.applicationOwner = applicationOwner;
    this.users = users;
  }
}

export class InviteUsersToAccessApp {
  constructor(email, applicationName, roleName) {
    this.email = email;
    this.applicationName = applicationName;
    this.roleName = roleName;
  }
}

