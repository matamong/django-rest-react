import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'
import MatchingTickets from '../components/MatchingTickets'

const Matching = ({ isAuthenticated }) => {
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
            
            axios.get("/api/matching/my/usergames", config)
            .then(function (response) {
                console.log(response);
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
