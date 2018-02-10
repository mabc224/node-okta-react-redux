import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/Body/HomePage';
import RegistrationForm from './components/Body/Registartion/RegistrationForm';
import config from './app.config';
import LoginPage from './components/Body/Login/LoginPage';
import ProfilePage from './components/Body/Profile/ProfilePage';
import './App.css';

export default class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <main role="main">
                    <div className="container">
                        <main>
                            <Route path="/" exact={true} component={HomePage} />
                            <Route path="/implicit/callback" component={ImplicitCallback} />
                            <Route path="/login" render={() => <LoginPage baseUrl={config.url} />} />
                            <Route path="/register" component={RegistrationForm} />
                            <SecureRoute path="/profile" component={ProfilePage} />
                        </main>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}