import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import {withAuth} from '@okta/okta-react';
import { connect } from 'react-redux';

import { loginApiCall } from '../../../actions/Login';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            username: '',
            password: ''
        }

        this.oktaAuth = new OktaAuth({url: props.baseUrl});

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.loginApiCall(this.oktaAuth, this.state.username, this.state.password);
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    render() {
        if (this.props.sessionToken) {
            this.props.auth.redirect({sessionToken: this.props.sessionToken});
            return null;
        }

        const errorMessage = this.props.error ?
            <span className="error-message">{this.props.error}</span> :
            null;

        return (
            <form className="form-horizontal col-sm-6" onSubmit={this.handleSubmit}>
                <h3>Login Form</h3>
                <br />
                {errorMessage}
                <div className="form-group">
                    <label className="control-label">Email:</label>
                    <input
                        className="form-control"
                        id="username" type="text"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}/>
                </div>

                <div className="form-group">
                    <label className="control-label">Password:</label>
                    <input
                        className="form-control"
                        id="password" type="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}/>
                </div>
                <input className="btn btn-outline-success col-2" id="submit" type="submit" value="Submit"/>
            </form>

        );
    }
};


const mapStateToProps = (state) => {
    return {
        sessionToken: state.login.sessionToken,
        error: state.login.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loginApiCall: (oktaAuth, username, password) => dispatch(loginApiCall(oktaAuth, username, password))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuth(LoginForm));

// export default withAuth(LoginForm);