import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { connect, useSelector } from 'react-redux';
import LOLCard from './LOLCard'
import { Redirect } from 'react-router-dom';

// redux가 axios보다 느리게 작동해서 user id값을 못 보내고 undefined값을 서버에 보내버림
// user가 아니라 아예 redux에서 다 처리해둔 profile을 가져오자
// redux에 load_self_profile을 만들어서 profile값을 state에 박아버려
const MyLOLCard = ({ auth: { user, isLolUsergameSaved } }) => {

    const [profile, setProfile] = useState({
        lol_name: '',
        region: '',
        prefer_style: 0,
        prefer_time: '',
        intro: '',
        lol_position : {
            id: 0,
            is_top_possible: 0,
            is_jungle_possible: 0,
            is_mid_possible: 0,
            is_ad_possible: 0,
            is_sup_possible: 0
        },
        lol_prefer_mode: {
            id: 0,
            ai: false,
            normal: false,
            solo_duo_rank: false,
            flex_rank: false,
            howling_abyss: false,
            team_fight_tactics: false,
            team_fight_tactics_rank: false
        }
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchProfile = async () => {
        if (user !== null && user !== 'undefined'){
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            }
            try {
                setError(null);
                setLoading(true);

                const response = await axios.get(
                    'http://localhost:8000/api/matching/lol/usergame/' + user.id,
                    config
                )
                setProfile({
                    lol_name: response.data.lol_name,
                    region: response.data.region,
                    prefer_style: response.data.prefer_style,
                    prefer_time: response.data.prefer_time,
                    intro: response.data.intro,
                    lol_position : {
                        id: response.data.lol_position.id,
                        is_top_possible: response.data.lol_position.is_top_possible,
                        is_jungle_possible: response.data.lol_position.is_jungle_possible,
                        is_mid_possible: response.data.lol_position.is_mid_possible,
                        is_ad_possible: response.data.lol_position.is_ad_possible,
                        is_sup_possible: response.data.lol_position.is_sup_possible
                    },
                    lol_prefer_mode: {
                        id: response.data.lol_prefer_mode.id,
                        ai: response.data.lol_prefer_mode.ai,
                        normal: response.data.lol_prefer_mode.normal,
                        solo_duo_rank: response.data.lol_prefer_mode.solo_duo_rank,
                        flex_rank: response.data.lol_prefer_mode.flex_rank,
                        howling_abyss: response.data.lol_prefer_mode.howling_abyss,
                        team_fight_tactics: response.data.lol_prefer_mode.team_fight_tactics,
                        team_fight_tactics_rank: response.data.lol_prefer_mode.team_fight_tactics_rank
                    }

                })
                console.log(response.data.lol_name)
            } catch (e) {
                setError(e);
                console.log('error!!')
            }
            setLoading(false);
        } 
    }

    useEffect(() => {
        fetchProfile();
    }, [user]);

    return (
        <LOLCard 
            name={profile.lol_name}
            region={profile.region}
            intro={profile.intro}
            prefer_style={profile.prefer_style}
            prefer_time={profile.prefer_time}
        />
        // <div>
        //     {profile.lol_name}
        //     {profile.lol_position.is_mid_possible}
        // </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(MyLOLCard)