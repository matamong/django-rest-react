import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import loginImg from '../login.svg'
import Button from '@material-ui/core/Button';
import "./login.scss";
import Checkbox from '@material-ui/core/Checkbox';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import { createChainedFunction } from '@material-ui/core';


const Signup = ({ signup, isAuthenticated }) => {
    var Isemail = require('isemail');
    const [accountCreated, setAccountCreated] = useState(false);
    
    // Form Data state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: ''
    });
    const { name, email, password, re_password } = formData;


    // Validate state
    const [valueData, setValueData] = useState({
        nameEntered: '',
        isNameValid: false,
        nameMessage: '',
        emailEntered: '',
        isEmailValid: false,
        emailMessage: ''
    })
    const [isNameDuplicated, setIsNameDuplicated] = useState(false)
    const [isEmailDuplicated, setIsEmailDuplicated] = useState(false)
    const [isChecked, setIsChecked] = useState({
        term1: false,
        term2: false,
        term3: false
    })



    // Validate function

    const checkDuplicatedName = (nickname) => {
        try{
            axios.head(
                "/api/users/search/name/" + nickname
            ).catch(function (error) {
                if (error.response.status === 404) {
                  setIsNameDuplicated(false)
                } else {
                  setIsNameDuplicated(true)
                }
              });
        } catch(e) {
            return false
        }
            
    }
    

    const checkDuplicatedEmail = (email) => {
        try {
            axios.head(
                "/api/users/search/email/" + email
            ).catch(function (error) {
                if (error.response.status === 404) {
                  setIsEmailDuplicated(false)
                } else {
                  setIsEmailDuplicated(true)
                }
              });
        } catch(e) {
            return false
        }
        
    }



    const validateName = (set, field, value, e) => {
        var specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
        var nickLength = changeEngKorLength(value)

        if (nickLength > 2 && nickLength <= 18 && !specialCheck.test(value) && value.search(/\s/) == -1) {
            checkDuplicatedName(value)
            setValueData({
                ...valueData,
                nameEntered: value,
                isNameValid: true
            })
            onChange(e)
        } else {
            setValueData({
                ...valueData,
                nameEntered: value,
                isNameValid: false,
                nameMessage: '유효하지 않은 닉네임형식이에요.'
            })
            onChange(e)
        }
    }

    const validateEmail = (set, field, value, e) => {
        // Validate Black-List later
        if(Isemail.validate(value)){
            checkDuplicatedEmail(value)
            setValueData({
                ...valueData,
                emailEntered: value,
                isEmailValid: true,
                emailMessage: ''
            })
            onChange(e)
        } else {
            setValueData({
                ...valueData,
                emailEntered: value,
                isEmailValid: false,
                emailMessage: '유효하지않은 이메일 형식이에요.'
            })
            onChange(e)
        }
    }

    function changeEngKorLength(str) {
        var nickLength = 0
        for(var i=0; i<str.length; i++){ //한글은 2, 영문은 1로 치환 
            var charStr = str.charAt(i); 
            
            if(escape(charStr).length >4){ 
                nickLength += 2; 
            }else{
                 nickLength += 1; 
            } 
        }
        return nickLength
    }

    const isEnteredNameValid = () => {
        const { nameEntered, isNameValid } = valueData
        if (nameEntered) return isNameValid
    }

    const isFieldValid = () => {
        const isNameValid = valueData.isNameValid
        const isEmailValid = valueData.isEmailValid

        if (isNameValid === true && isNameDuplicated === false && isEmailValid === true && isEmailDuplicated === false && formData.password.length >= 8) {
            if (isChecked.term1 === true && isChecked.term2 === true && isChecked.term3 === true)
                return true
            else
                return false
        }
        else
            return false
    }




    // On Change function

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onCheck = (e) => {
        setIsChecked({ ...isChecked, [e.target.name]: e.target.checked });
    }

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup({ name, email, password, re_password }).then(function (result){
                if (result === true)
                    setAccountCreated(true);
            })
        }
    };

    


    // Render function
    const renderEmailMessage = () => {
        return (
            <div className="signup__message">
                {valueData.emailMessage}
            </div>
        )
    }
    const renderNameMessage = () => {
        return (
            <div className="signup__message">
                {valueData.nameMessage}
            </div>
        )
    }

    const renderSubmitBtn = () => {
        if (isFieldValid()) {
            return (
                <div className="login__footer">
                    <Button
                        type='submit'
                        variant="contained"
                        color="primary"
                    >
                        가입하기
                    </Button>
                </div>
            )
        }
        return (
            <div className="login__footer">
                <Button
                    type='submit'
                    variant="contained"
                    color="primary"
                    disabled
                >
                    가입하기
                </Button>
            </div>
        )
    }

    if (isAuthenticated)
        return <Redirect to='/' />;
    if (accountCreated)
        return <Redirect to='/SignupSuccess' />;

        return (
        <div className="login__baseContainer">
            <div className="login__content">
                <div className="login__image">
                    <img src={loginImg} />
                </div>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="login__formContainer">
                        <div className="login__formGroup">
                            <label htmlFor="username">닉네임</label>
                            <div className="signup__message">{isNameDuplicated === true ? '이미 존재하는 닉네임이에요.' : ''}</div>
                            <div className="signup__message">{valueData.isNameValid === false ? renderNameMessage() : ''}</div>
                            <input
                                type='text'
                                placeholder='한글 3~8자 / 영문 3~16자 / 특문, 공백 제외'
                                name='name'
                                value={name}
                                onChange={e => validateName(formData, 'name', e.target.value, e)}
                                required
                            />
                        </div>
                        <div className="login__formGroup">
                            <label htmlFor="username">이메일 주소</label>
                            {isEmailDuplicated === true ? <div className="signup__message">이미 가입 된 이메일이에요. </div> : ''}
                            {valueData.isEmailValid === false ? renderEmailMessage() : ''}
                            <input
                                type='email'
                                placeholder='gameduos@gameduos.net*'
                                name='email'
                                value={email}
                                onChange={e => validateEmail(formData, 'email', e.target.value, e)}
                                required
                            />
                        </div>
                        <div className="login__formGroup">
                            <label htmlFor="password">비밀번호</label>
                            <input
                                type='password'
                                placeholder='비밀번호는 최소 8자 이상입니다.'
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required
                            />
                        </div>
                        <div className="login__formGroup">
                            <label htmlFor="password">비밀번호 재확인</label>
                            <input
                                type='password'
                                placeholder='비밀번호를 다시 한번 입력해주세요.'
                                name='re_password'
                                value={re_password}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required
                            />
                        </div>
                        <div className="signup__terms__container">
                            <div className="signup__terms__item">
                                <label className="signup__terms__title" htmlFor="term">
                                    <span className="signup__terms__icon">&#128195;</span>
                                    <span>약관정보 동의</span>
                                </label>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src=""
                                    frameBorder="0" allowtransparency="true" scrolling="yes">
                                </iframe>
                                <div className="signup__terms__checkbox">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isChecked.term1}
                                                onChange={onCheck}
                                                name="term1"
                                                color="primary"
                                            />
                                        }
                                        label="동의합니다."
                                    />
                                </div>
                            </div>
                            <div className="signup__terms__item">
                                <label className="signup__terms__title" htmlFor="term">
                                    <span className="signup__terms__icon">&#128195;</span>
                                    <span>개인정보 동의</span>
                                </label>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src=""
                                    frameBorder="0" allowtransparency="true" scrolling="yes">
                                </iframe>
                                <div className="signup__terms__checkbox">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isChecked.term2}
                                                onChange={onCheck}
                                                name="term2"
                                                color="primary"
                                            />
                                        }
                                        label="동의합니다."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="signup__terms__checkbox">
                            <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isChecked.term3}
                                            onChange={onCheck}
                                            name="term3"
                                            color="primary"
                                        />
                                    }
                                    label="만 14세 이상입니다."
                                />
                            </div>
                        </div>
                        <div className="login__footer">
                            {renderSubmitBtn()}
                        </div>
                        <p className="login__phrase" style={{margin: '0 0 3rem 0'}}>이미 아이디가 있나요? <span className="login__lilnk"><Link to='/login'>Sign In</Link></span></p>
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
