import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';
import loginImg from '../login.svg'
import Button from '@material-ui/core/Button';
import "./login.scss";


const Activate = (props) => {
    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        const uid = props.match.params.uid;
        const token = props.match.params.token;

        props.verify(uid, token);
        setVerified(true);
    };

    if (verified)
        return <Redirect to='/' />

    return (
        <div className="login__baseContainer">
            <div className="login__header">Login</div>
            <div className="login__content">
                <div className="login__image">
                    <img src={loginImg} />
                </div>
                <div className="login__formContainer">
                    <Button
                        onClick={verify_account}
                        type='button'
                        variant="contained"
                        color="primary">
                        Verify
                    </Button>
                </div>
            </div>
        </div>
    );
};


export default connect(null, { verify })(Activate);