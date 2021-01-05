import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from './LOLCard'
import TinderCard from "react-tinder-card";
import { pull } from 'lodash';
import './lolmatchingcards.scss'
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import CircularProgress from '@material-ui/core/CircularProgress';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const LOLMatchingCards = () => {
    var _ = require('lodash');
    const [matchedUsers, setMatchedUsers] = useState(null)
    const [matchingLoading, setMatchingLoading] = useState(false)
    const [matchingError, setMatchingError] = useState(null)


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
            console.log('MatchedUsers[0] : ' + matchedUsers[0].lol_name)
        } catch (e) {
            setMatchingError(e);
            setMatchingLoading(false)
        }
        setMatchingLoading(false);
    };


    useEffect(() => {
        fetchMathedUsers();
    }, []);


    if (matchingLoading) return <div className="lolmatchingcards__container"><div className="cardContainer__loading"><CircularProgress></CircularProgress></div></div>
    if (matchingError) return <div className="lolmatchingcards__container"><div className="cardContainer__loading"><SentimentVeryDissatisfiedIcon /> 에러가 발생했어요. 잠시 후 다시 시도해주세요.</div></div>
    if (!matchedUsers) return null

    return (
        <div className="lolmatchingcards__container">
            <div className="cardContainer">
                {matchingLoading === true ? <h1>옿ㄴ옿ㅁㄴ아ㅣ럼니아</h1> : ''}
                {matchedUsers.map((user, index) => (
                    <TinderCard
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

export default LOLMatchingCards