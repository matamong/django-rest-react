import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';
import loginImg from '../login.svg'
import Button from '@material-ui/core/Button';
import "./login.scss";


const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent)
        return <Redirect to='/' />;

    return (
        <div className="login__baseContainer">
            <div className="login__header">Request Password Reset</div>
            <div className="login__content">
                <div className="login__image">
                    <img src={loginImg} />
                </div>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="login__formContainer">
                        <div className="login__formGroup">
                            <input
                                type='email'
                                placeholder='Email'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className="login__footer">
                            <Button
                                type='submit'
                                variant="contained"
                                color="primary">
                                Reset Password
                        </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default connect(null, { reset_password })(ResetPassword);