import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/LOLCard'
import { connect } from 'react-redux';
import LOLMatchingCards from '../components/LOLMatchingCards'
import LOLAllMatchingCards from '../components/LOLAllMatchingCards'
import LOLMatchingList from '../components/LOLMatchingList'
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import './lolmatching.scss'

const LolMatching = ({ name }) => {
    const [usergames, setUsergames] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchUsergames = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        try {
            setError(null);
            setUsergames(null);
            setLoading(true);
            
            axios.get("/api/matching/lol/", config)
            .then(function (response) {
                console.log(response.data)
                setUsergames(response.data)
            })
            .catch(function (error) {
                setError(error);
            });
        } catch (e) {
            setError(e);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchUsergames();
    }, []);
    
    if (loading) return <div>Loading..</div>
    if (error) return <div>Error!</div>
    if (!usergames) return null


    return (
        <div className="lolmatching__container">
            <div className="lolmatching__title">
                <h1 className="lolmatching__title__emoji">&#128064;</h1>
                {_.isEmpty(usergames) ?
                    <p className="lolmatching__title__text">매칭리스트가 비었네요. {name}님과 실력이 비슷한 분들을 기다려주세요. </p>
                :
                    <p className="lolmatching__title__text">{name}님을 기다리는 분들이에요!</p>
                }
            </div>
            <div className="lolmatching__list__container">
            {usergames.map((usergame, index) => (
                <LOLMatchingList
                    isMyUsergame={false}
                    name={usergame.user.name}
                    odds={usergame.odds.odds}
                    intro={usergame.intro}
                    main_champ_info={usergame.main_champ_info}
                    lol_position={usergame.lol_position}
                    lol_prefer_mode={usergame.lol_prefer_mode}
                    prefer_style={usergame.prefer_style}
                    prefer_time={usergame.prefer_time}
                    region={usergame.region}
                    solo_rank={usergame.solo_rank}
                    solo_tier={usergame.solo_tier}
                    profile={usergame.user.profile}
                    mic={usergame.mic}
                    key={index}
                />
            ))}
            </div>
            <div className="lolmatching__all__container">
                <LOLAllMatchingCards />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    name: state.auth.user.name
});

export default connect(mapStateToProps)(LolMatching)