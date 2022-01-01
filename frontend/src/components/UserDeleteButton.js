import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { delete_user, logout} from '../actions/auth';
import './userdeletebutton.scss'

const UserDeleteButton = ({ delete_user, logout }) => {
    const [buttonClicked, setButtonClicked] = useState(false)
    const [formData, setFormData] = useState({
        current_password: ''
    });
    const { current_password } = formData;
    const [requestSent, setRequestSent] = useState(false);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        delete_user(current_password);
    };

    if (requestSent)
        return <Redirect to='/' />;

    const renderForm = () => {
        if (buttonClicked) {
            return (
                <div className="userDeleteButton__form__container">
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="userDeleteButton__form__item">
                            <TextField
                                id="standard-basic"
                                type="password"
                                label="비밀번호"
                                name="current_password"
                                placeholder="삭제를 위해 비밀번호 입력"
                                value={current_password}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <div className="userDeleteButton__form__item">
                            <Button color="secondary" variant="contained" type="submit">삭제</Button>
                        </div>
                    </form>
                </div>
            )
        } else {

        }
    }

    return (
        <div className="userDeleteButton__container">
            <Button
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => { setButtonClicked(true) }}
            >
                회원정보 삭제
            </Button>
            {renderForm()}
        </div>
    )
}

export default connect(null, { delete_user, logout })(UserDeleteButton);