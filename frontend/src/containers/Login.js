import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import ReactDOM from 'react-dom';
import GoogleOAuth from '../components/SocialAuthGoogle'
import loginImg from '../login.svg'
import Button from '@material-ui/core/Button';
import "./login.scss";


const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };

    if (isAuthenticated)
        return <Redirect to='/' />;

    return (
        <div className="login__baseContainer">
            <div className="login__header">Login</div>
            <div className="login__content">
                <div className="login__image">
                    <img src={loginImg} />
                </div>
                <div className="login__social__google">
                    <GoogleOAuth />
                </div>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="login__formContainer">
                        <div className="login__formGroup">
                            <label htmlFor="username">UserName</label>
                            <input
                                type='email'
                                placeholder='Email'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className="login__formGroup">
                            <label htmlFor="password">Password</label>
                            <input
                                type='password'
                                placeholder='Password'
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required
                            />
                        </div>
                        <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                        <p>Forgot your Password? <Link to='/reset-password'>Reset Password</Link></p>
                        <div className="login__footer">
                            <Button
                                type='submit'
                                variant="contained"
                                color="primary">
                                Login
                        </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);