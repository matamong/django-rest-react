import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import loginImg from '../login.svg'
import Button from '@material-ui/core/Button';
import "./login.scss";


const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup({ name, email, password, re_password });
            setAccountCreated(true);
        }
    };

    if (isAuthenticated)
        return <Redirect to='/' />;
    if (accountCreated) 
        return <Redirect to='/login' />;
    return (
        <div className="login__baseContainer">
            <div className="login__header">Sign Up</div>
            <div className="login__content">
                <div className="login__image">
                    <img src={loginImg} />
                </div>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="login__formContainer">
                        <div className="login__formGroup">
                            <label htmlFor="username">UserName</label>
                            <input
                                type='text'
                                placeholder='Name'
                                name='name'
                                value={name}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className="login__formGroup">
                            <label htmlFor="username">UserName</label>
                            <input
                                type='email'
                                placeholder='Email*'
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
                                placeholder='Password*'
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required
                            />
                        </div>
                        <div className="login__formGroup">
                            <label htmlFor="password">Password</label>
                            <input
                                type='password'
                                placeholder='Confirm Password*'
                                name='re_password'
                                value={re_password}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required
                            />
                        </div>
                        <p>Already have an account? <Link to='/login'>Sign In</Link></p>
                        <div className="login__footer">
                            <Button
                                type='submit'
                                variant="contained"
                                color="primary">
                                Register
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

export default connect(mapStateToProps, { signup })(Signup);