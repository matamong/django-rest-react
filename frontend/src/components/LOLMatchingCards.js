import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import { connect } from 'react-redux';
import { create_matching_message_room, send_matching_message } from '../actions/matching';
import { setAlert } from '../actions/alert';
import axios from 'axios'
import Card from './LOLCard'
import TinderCard from "react-tinder-card";
import { pull } from 'lodash';
import './lolmatchingcards.scss'
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import CircularProgress from '@material-ui/core/CircularProgress';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Modal from './Modal'
import TextField from '@material-ui/core/TextField';



const LOLMatchingCards = ({ isAuthenticated, create_matching_message_room, send_matching_message, setAlert }) => {

    var _ = require('lodash');
    const [matchedUsers, setMatchedUsers] = useState(null)
    const [matchingLoading, setMatchingLoading] = useState(false)
    const [matchingError, setMatchingError] = useState(null)
    const [modalForm, setModalForm] = useState({
        receiver : null,
        content: ''
    })
    const { receiver, content } = modalForm

    const modalRef = useRef();


    const fetchMathedUsers = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        try {
            setMatchingError(null);
            setMatchedUsers(null);
            setMatchingLoading(true);

            const response = await axios.get(
                'http://localhost:8000/api/matching/lol/',
                config
            );

            setMatchedUsers(_.shuffle(JSON.parse(JSON.stringify(response.data))));

            console.log(response.data)
        } catch (e) {
            console.log(e)
            setMatchingError(e);
            setMatchingLoading(false)
        }
        setMatchingLoading(false);
    };


    useEffect(() => {
        fetchMathedUsers();
    }, []);


    //modal

    const setModalUser = (obj) => {
        setModalForm({
            ...modalForm,
            receiver: obj,
            content: ''
        })
    }

    const onChange = e => {
        setModalForm({
            ...modalForm,
            [e.target.name]: e.target.value
        })
    }


    const swiped = (direction, userObj) => {
        console.log('You swiped: ' + direction)
        console.log('user : ' + userObj.user.name)
        if (direction === 'right') {
            setModalUser(userObj)
            modalRef.current.open()
        }
        console.log(modalForm)
    }
    const onCancle = (e) => {
        e.preventDefault();
        modalRef.current.close()
    }

    const onSubmit = e => {
        e.preventDefault();
        // 500 에러 났을 때 핸들링 해야함!
        create_matching_message_room(receiver.user.name, 'lol').then(function(result){
            if(result !== undefined) {send_matching_message(result.id, content)}
        })
    }


    if (matchingLoading) return <div className="lolmatchingcards__container"><div className="cardContainer__loading"><CircularProgress></CircularProgress></div></div>
    if (matchingError) return <div className="lolmatchingcards__container"><div className="cardContainer__loading"><SentimentVeryDissatisfiedIcon /> 에러가 발생했어요. 잠시 후 다시 시도해주세요.</div></div>
    if (!matchedUsers) return null

    return (
        <div className="lolmatchingcards__container">
            <Modal ref={modalRef}>
                <div className="matchingmodals__item">
                    <span className="matchingmodals__item__emoji">&#128588;</span><h3>상대방에게 인삿말을 보내주세요!</h3>
                    <p>상대방도 매칭을 수락할 수 있게 간단한 인삿말을 보내주세요.</p>
                    <form className="matchingmodals__item__form" onSubmit={e => onSubmit(e)}>
                        <div className="matchingmodals__item__input">
                            <TextField
                                type="text"
                                name='content'
                                value={content}
                                id="outlined-basic" 
                                label="인삿말" 
                                variant="outlined" 
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className="matchingmodals__item__buttons">
                            <div className="matchingmodals__item__button"><Button variant="contained" color="primary" type="submit">보내기</Button></div>
                            <div className="matchingmodals__item__button"><Button variant="contained" color="secondary" onClick={(e) => onCancle(e)}>취소</Button></div>
                        </div>
                    </form>
                </div>
            </Modal>
            <div className="cardContainer">
                {matchingLoading === true ? <h1>옿ㄴ옿ㅁㄴ아ㅣ럼니아</h1> : ''}
                {matchedUsers.map((user, index) => (
                    <TinderCard
                        onSwipe={(dir) => swiped(dir, user)}
                        className="swipe"
                        key={user.id}
                        preventSwipe={['up', 'down']}
                    >
                        <Card className="card"
                            profile={user}
                        />
                    </TinderCard>

                ))}
                <div className="cardEnd">
                    <h3>매칭리스트가 비었네요! 멋진 분이 오는 것을 기다려주세요</h3>
                </div>
            </div>
            <div className="lolmatching__button">
                <Button variant="contained" onClick={fetchMathedUsers} >
                    <RefreshIcon /> Refresh
                </Button>
            </div>
        </div>
    )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { create_matching_message_room, send_matching_message, setAlert })(LOLMatchingCards)