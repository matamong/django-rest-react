import React, { useState } from 'react'
import axios from 'axios'
import Card from './LOLCard'
import './lolallmatchingcards.scss'
import Button from '@material-ui/core/Button';
import GroupIcon from '@material-ui/icons/Group';
import LOLMatchingList from '../components/LOLMatchingList'
import CircularProgress from '@material-ui/core/CircularProgress';


const LOLAllMatchingCards = () => {
    const [allUsers, setAllUsers] = useState(null)
    const [allUserLoading, setAllUserLoading] = useState(false)
    const [allUserError, setAllUserError] = useState(false)

    const fetchAllUsers = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setAllUserError(false);
            setAllUsers(null);
            // loading 상태를 true 로 바꿉니다.
            setAllUserLoading(true);
            const response = await axios.get(
                "/api/matching/lol/usergames",
                config
            );
            setAllUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
            setAllUserError(true);
        }
        setAllUserLoading(false);
    };
    
    if (allUserError) return <div>Error!</div>

    return (
        <div className="lolallmatchingcards__container">
            <div className="lolallmatchingcards__button">
                {
                    allUserLoading ? 
                    <div><CircularProgress /></div>
                    :
                    <Button variant="contained" onClick={fetchAllUsers}>
                        <GroupIcon /> 모든 사용자 보기
                    </Button>
                }
            </div>
            <div>
                {allUsers === null ? '' :
                    <ul>
                        {allUsers.map((usergame, index) => (
                            <li key={index}>
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
                                    mic={usergame.mic}
                                    profile={usergame.user.profile}
                                    key={index}
                                />
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    )

}

export default LOLAllMatchingCards
