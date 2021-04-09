import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import './navbar.scss';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DehazeIcon from '@material-ui/icons/Dehaze';
import CloseIcon from '@material-ui/icons/Close';

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
            <Link to="/my-page">
                <IconButton>
                    <PersonIcon className="header__icon" fontSize="large" />
                </IconButton>
            </Link>
            <IconButton>
                <ExitToAppIcon className="header__icon" fontSize="large" onClick={logout} />
            </IconButton>
        </Fragment>
    );

    const guestMenu = () => (
        <Fragment>

        </Fragment>
    )

    const authMenu = () => (
        <Fragment>
            <Link to='/matching'>
                    <a className="menu_a">매칭</a>
                </Link>
                <Link to='/matching-chat'>
                    <a className="menu_a">매칭 리스트</a>                    
                </Link>
                <Link to='/'>
                    <a className="menu_a">커뮤니티(준비 중)</a>                    
                </Link>
        </Fragment>
    )

    return (
        <div className="header">
            <Link to='/'>
                <div className="logo"><h2>&#128064;GameDuoS</h2></div>
            </Link>
            <input type="checkbox" id="chk" />
            <label htmlFor="chk" className="show-menu-btn">
                <DehazeIcon />
            </label>
            <ul className="menu">
                {isAuthenticated ? authMenu() : ''}
                <div className="header__profile">
                    {isAuthenticated ? authLinks() : guestLinks()}
                </div>
                <label htmlFor="chk" className="hide-menu-btn">
                    <CloseIcon />
                </label>
            </ul>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);