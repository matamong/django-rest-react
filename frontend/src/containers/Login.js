import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import ReactDOM from 'react-dom';
import GoogleOAuth from '../components/SocialAuthGoogle'
import loginImg from '../login.svg'
import Button from '@material-ui/core/Button';
import "./login.scss";
import CircularProgress from '@material-ui/core/CircularProgress';




const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false)

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
            <div className="login__content">
                <div className="login__image">
                    <img src={loginImg} />
                </div>
                <div className="login__social__google">
                    <GoogleOAuth />
                </div>
                <div className="login__line__container">
                    <div className="login__line"></div>
                    <div style={{margin:'1rem 0 0 0 ', padding:'0 1rem'}}>OR</div>
                    <div className="login__line"></div>
                </div>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="login__formContainer">
                        <div className="login__formGroup">
                            <input
                                type='email'
                                placeholder='이메일'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className="login__formGroup">
                            <input
                                type='password'
                                placeholder='비밀번호'
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required
                            />
                        </div>
                        <div className="login__phrase__container">
                            <p className="login__phrase">Game Duos에 처음이신가요?<span className="login__lilnk"><Link to='/signup'>회원가입 하기</Link></span></p>
                            <p className="login__phrase">비밀번호가 기억나지않나요? <span className="login__lilnk"><Link to='/reset-password'>비밀번호 변경하기</Link></span></p>
                        </div>
                        <div className="login__footer">
                            {loading === true ?  <div><CircularProgress /></div> : 
                                <Button
                                    type='submit'
                                    variant="contained"
                                    color="primary">
                                    로그인
                                </Button>
                            }
                            
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