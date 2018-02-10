const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
    orgUrl: 'https://dev-702756-admin.oktapreview.com',
    token: '00VbFxEzI6qKxwunMbc4FEQCdt4IuEhL7cxjBn5M6m'
});

module.exports = client;