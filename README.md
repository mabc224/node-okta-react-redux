## APP [https://mabc224.github.io/node-okta-react-redux/](https://mabc224.github.io/node-okta-react-redux/)

If request is not reponding, click here to re activatate server on [heroku](https://damp-thicket-88805.herokuapp.com/api). 
________________________


# User authentication application with Node OKTA react redux
 
User aAuthentication application to perform registration, login, logout and change password functionality using node, react with redux
 and [OKTA](https://www.okta.com/)


## React OKTA APP (frontend)

#### Config

Set your [OKTA](https://www.okta.com/) config params in `src/app.config.js`

### Setup

```
npm install
npm run start
```

### Run Server

`http://localhost:3000`

### Routes

```
http://localhost:3000/
http://localhost:3000/login
http://localhost:3000/register
http://localhost:3000/profile (authenticated)
```

==============================================
----------------------------------------------

## Backend API for React OKTA APP

This part is only written to handle user registration and change password functionality using OKTA node.js sdk

#### Config

Set your okta config params in `config/oktaClient.js`

### Setup

```
npm install
npm run start
```

### Run Server

`http://localhost:3001`


### External References and Resources

* [Okta | Always On](https://www.okta.com/)
* [Add Okta authentication to your React app](https://developer.okta.com/code/react/okta_react)
* [NPM @okta/okta-react](https://www.npmjs.com/package/@okta/okta-react)
* [React Auth SDK sample](https://github.com/okta/samples-js-react)
* [Okta API wrapper for Node.js](https://github.com/okta/okta-sdk-nodejs)


