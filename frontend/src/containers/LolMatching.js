import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/LOLCard'
import { connect } from 'react-redux';
import LOLMatchingCards from '../components/LOLMatchingCards'
import LOLAllMatchingCards from '../components/LOLAllMatchingCards'
import LOLMatchingList from '../components/LOLMatchingList'
import { Redirect } from 'react-router-dom';
import './lolmatching.scss'

const LolMatching = ({ isAuthenticated }) => {
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
                console.log('ddd', response);
                setUsergames(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        } catch (e) {
            setError(e);
            console.log(e)
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
            <h1>넘나 씐나는 매츼이잉</h1>
            <div className="lolmatching__list__container">
            {usergames.map((usergame, index) => (
                <LOLMatchingList
                    name={usergame.user.name}
                    intro={usergame.intro}
                    lol_position={usergame.lol_position}
                    lol_prefer_mode={usergame.lol_prefer_mode}
                    champion_avatar={usergame.main_champ_info.champion_avatar}
                    odds={usergame.odds.odds}
                    prefer_style={usergame.prefer_style}
                    prefer_time={usergame.prefer_time}
                    region={usergame.region}
                    solo_rank={usergame.solo_rank}
                    user={usergame.user}
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
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(LolMatching)