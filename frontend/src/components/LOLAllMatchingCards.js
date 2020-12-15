import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from './LOLCard'

const LOLAllMatchingCards = () => {
    const [allUsers, setAllUsers] = useState(null)
    const [allUserLoading, setAllUserLoading] = useState(false)
    const [allUserError, setAllUserError] = useState(null)

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
            setAllUserError(null);
            setAllUsers(null);
            // loading 상태를 true 로 바꿉니다.
            setAllUserLoading(true);
            const response = await axios.get(
                'http://localhost:8000/api/matching/lol/usergames',
                config
            );
            setAllUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
            console.log(response.data)
        } catch (e) {
            setAllUserError(e);
        }
        setAllUserLoading(false);
    };

    return (
        <div>
            <button onClick={fetchAllUsers}>모든 사용자 불러오기</button>
            {allUserLoading === true ? '유저 가져오는 중...' : ''}
            {allUsers === null ? '' :
                <ul>
                    {allUsers['results'].map(user => (
                        <li key={user.id}>
                            <Card
                                profile={user}
                            />
                            {user.lol_name}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )

}

export default LOLAllMatchingCards