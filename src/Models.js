export class Company {
  constructor(companyName, orgId, primaryDomain, connectedDomains, superUserEmail, users) {
    this.companyName = companyName;
    this.orgId = orgId;
    this.primaryDomain = primaryDomain;
    this.connectedDomains = connectedDomains;
    this.superUserEmail = superUserEmail;
    this.users = users;
  }
}

export class Application {
  constructor(applicationName, applicationId, applicationOwners, users) {
    this.applicationName = applicationName;
    this.applicationId = applicationId;
    this.applicationOwners = applicationOwners;
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

