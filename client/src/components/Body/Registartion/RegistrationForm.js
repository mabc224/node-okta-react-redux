import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';

import { registrationApiCall } from '../../../actions/Registration';
import config from '../../../app.config';

class RegistrationForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };
        this.oktaAuth = new OktaAuth({ url: config.url });
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.checkAuthentication();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

    }

    async checkAuthentication() {
        const sessionToken = await this.props.auth.getIdToken();
        if (sessionToken) {
            this.setState({ sessionToken });
        }
    }

    componentDidUpdate() {
        this.checkAuthentication();
    }

    handleFirstNameChange(e){
        this.setState({firstName:e.target.value});
    }
    handleLastNameChange(e) {
        this.setState({ lastName: e.target.value });
    }
    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.registrationApiCall(this.oktaAuth, this.state);
    }

    render(){
        if (this.props.sessionToken) {
            this.props.auth.redirect({ sessionToken: this.props.sessionToken });
            return null;
        }

        const errorMessage = this.props.error ?
            <span className="error-message">{this.props.error}</span> :
            null;

        return(
            <form className="form-horizontal col-sm-6" onSubmit={this.handleSubmit}>
                <h3>Registration Form</h3>
                <br />
                {errorMessage}
                <div className="form-group">
                    <label>First Name:</label>
                    <input className="form-control" type="text" id="firstName" value={this.state.firstName}
                           onChange={this.handleFirstNameChange} />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input className="form-control" type="text" id="lastName" value={this.state.lastName}
                           onChange={this.handleLastNameChange} />
                </div>
                <div className="form-group">
                    <label className="control-label">Email:</label>
                    <input className="form-control" type="email" id="email" value={this.state.email}
                           onChange={this.handleEmailChange}/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input className="form-control" type="password" id="password" value={this.state.password}
                           onChange={this.handlePasswordChange} />
                </div>
                <input className="btn btn-outline-success col-2" type="submit" id="submit" value="Register"/>
            </form>
        );
    }

};


const mapStateToProps = (state) => {
    return {
        sessionToken: state.login.sessionToken,
        error: state.registration.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        registrationApiCall: (oktaAuth, data) => dispatch(registrationApiCall(oktaAuth, data))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuth(RegistrationForm));