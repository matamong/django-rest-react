import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';
import loginImg from '../login.svg'
import Button from '@material-ui/core/Button';
import "./login.scss";


const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password);
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
                            <label htmlFor="password">Password</label>
                            <input
                                type='password'
                                placeholder='New Password'
                                name='new_password'
                                value={new_password}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required
                            />
                        </div>
                        <div className="login__formGroup">
                            <label htmlFor="password">Password</label>
                            <input
                                type='password'
                                placeholder='Confirm New Password'
                                name='re_new_password'
                                value={re_new_password}
                                onChange={e => onChange(e)}
                                minLength='6'
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);