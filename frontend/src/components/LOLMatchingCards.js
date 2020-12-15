import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from './LOLCard'

const LOLMatchingCards = () => {
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
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setMatchingError(null);
            setMatchedUsers(null);
            // loading 상태를 true 로 바꿉니다.
            setMatchingLoading(true);
            const response = await axios.get(
                'http://localhost:8000/api/matching/lol/',
                config
            );
            setMatchedUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
            console.log(response.data)
        } catch (e) {
            setMatchingError(e);
        }
        setMatchingLoading(false);
    };

    useEffect(() => {
        fetchMathedUsers();
    }, []);

    if (!matchedUsers) return null

    return (
        <div>
            <ul>
                {matchingLoading === true ? '매칭중...' : ''}
                {matchedUsers.map(user => (
                    <li key={user.id}>
                        <Card
                            profile={user}
                        />
                        {user.lol_name}
                    </li>
                ))}
            </ul>
            <button onClick={fetchMathedUsers}>다시 불러오기</button>
        </div>
    )

}

export default LOLMatchingCards