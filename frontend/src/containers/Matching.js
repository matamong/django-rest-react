import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'
import MatchingTickets from '../components/MatchingTickets'
import Error from '../containers/Error'

const Matching = ({ isAuthenticated }) => {
    const [usergames, setUsergames] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

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
            
            axios.get("/api/matching/my/usergames", config)
            .then(function (response) {
                setUsergames(response.data)
            })
            .catch(function (error) {
                setError(true)
            });
        } catch (e) {
            setError(true);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchUsergames();
    }, []);

    if (loading) return <div>Loading..</div>
    if (error) return <Error />
    if (!usergames) return null

    return (
        <div>        
            <MatchingTickets lol={usergames['LolUserGame']} etc={usergames['UserGame']}/>
            {/* <ul>
                lol : <br />
                {usergames['LolUserGame'].map((usergame, index) => (
                    <li key={usergame.id}>
                        {usergame.lol_name}
                    </li>
                ))}
            </ul>
            <ul>
                기타 겜 : <br />
                {usergames['UserGame'].map(usergame => (
                    <li key={usergame.id}>
                        / {usergame.game_nickname} / 
                    </li>
                ))}
            </ul> */}
            <br />
        </div>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Matching)
