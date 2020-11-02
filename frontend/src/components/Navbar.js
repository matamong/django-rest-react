import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import './navbar.scss';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Navbar = ({ logout, isAuthenticated }) => {
    const guestLinks = () => (
        <div className="header__profile">
            <Link to="/login">
                <IconButton>
                    <PersonIcon className="header__icon" fontSize="large" />
                </IconButton>
            </Link>
        </div>
    );

    const authLinks = () => (
        <div className="header__profile">
            <Link to="/profile">
                <IconButton>
                    <PersonIcon className="header__icon" fontSize="large" />
                </IconButton>
            </Link>
            <IconButton>
                <ExitToAppIcon className="header__icon" fontSize="large" onClick={logout} />
            </IconButton>
        </div>
    );

    return (
        <div className="header">
            <Link to="/">
                <img className="header__log" src="https://1000logos.net/wp-content/uploads/2018/07/tinder-logo.png"
                    alt="tinder logo"></img>
            </Link>
            {isAuthenticated ? authLinks() : guestLinks()}
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);