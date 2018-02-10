import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { authenticated: null };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.checkAuthentication();
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated });
        }
    }

    componentDidUpdate() {
        this.checkAuthentication();
    }

    render() {

        if (this.state.authenticated === null) return null;

        let navAuth = (
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className = "nav-item" >
                        <Link className = "nav-link" to="/profile" > Profile </Link>
                    </li>
                    <li className="nav-item">
                        {/*<Link className="nav-link" onClick={this.props.auth.logout}>Logout</Link>*/}
                        <a className="nav-link" href="javascript:void(0)" onClick={this.props.auth.logout}>Logout</a>
                    </li>
                </ul>
            </div>
            );

    let navNotAuth = (
        <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    {/*<Link className="nav-link" onClick={this.props.auth.login}>Login</Link>*/}
                    <a className="nav-link" href="javascript:void(0)" onClick={this.props.auth.login}>Login</a>
                </li>
                <li className = "nav-item" >
                    <Link className = "nav-link" to="/register" > Register </Link>
                </li >
            </ul>
        </div>
    );

        const authNav = this.state.authenticated ? navAuth : navNotAuth;


        return (
            /* Navigation */
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">React App</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {authNav}
                </div>
            </nav>
        )
    }

};

export default withAuth(Header);