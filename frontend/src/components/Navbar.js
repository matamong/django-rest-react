import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import './navbar.scss';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';

const Navbar = ({ logout, isAuthenticated }) => {
    const guestLinks = () => (
        <Fragment>
            <Link to="/login">
                <IconButton>
                    <PersonIcon className="header__icon" fontSize="large" />
                </IconButton>
            </Link>
        </Fragment>
    );

    const authLinks = () => (
        <Fragment>
            <Link to="/profile">
                <IconButton>
                    <PersonIcon className="header__icon" fontSize="large" />
                </IconButton>
            </Link>
            <IconButton>
                <ExitToAppIcon className="header__icon" fontSize="large" onClick={logout} />
            </IconButton>
        </Fragment>
    );

    return (
        <div className="header">
            <Link to="/">
                <img className="header__log" src="https://1000logos.net/wp-content/uploads/2018/07/tinder-logo.png"
                    alt="tinder logo"></img>
            </Link>
            <div className="header__menue">
                <Link to="/matching">
                    <IconButton>
                        <FaceIcon className="header__icon" fontSize="large" />
                    </IconButton>
                </Link>
                <Link to="/lol">
                    <IconButton>
                        <img className="header__icon" 
                        src="http://ddragon.leagueoflegends.com/cdn/10.23.1/img/spell/SummonerFlash.png" 
                        alt="lol" ></img>
                    </IconButton>
                </Link>
            </div>
            <div className="header__profile">
                {isAuthenticated ? authLinks() : guestLinks()}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);