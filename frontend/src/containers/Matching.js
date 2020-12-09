import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Matching = () => {
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
            
            axios.get(`${process.env.REACT_APP_API_URL}/api/matching/my/usergames`, config)
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
            <h1>현재 님이 등록한 게임덜ㄹㄹㄹ</h1>
            <ul>
                lol : <br />
                {usergames['LolUserGame'].map(usergame => (
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
            </ul>
            <br />
            그거머시기냐 매칭 티켓 component 만들어서 등록된거 없을 때 핸들링하기. my page에도 써먹기 / 매칭 티켓 정해지고 핸들링해보기
        </div>
    )
}

export default Matching