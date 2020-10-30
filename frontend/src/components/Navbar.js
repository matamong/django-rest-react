import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {
    const guestLinks = () => (
        <Fragment>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
        </Fragment>
    );

    const authLinks = () => (
        <a href="#!" onClick={logout}>Logout</a>
    );
    
    return (
        <div>{isAuthenticated ? authLinks() : guestLinks()}</div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);