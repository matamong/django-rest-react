import React, { useState, useEffect  } from 'react'
import axios from 'axios'
import LOLCard from './LOLCard'
import Button from '@material-ui/core/Button';

// Loading / Error Card에 넘겨주기. 
const MyLOLCard = () => {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchProfile = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        try {
            setError(null);
            setProfile(null);
            setLoading(true);
            
            axios.get("/api/matching/lol/my/usergame", config)
            .then(function (response) {
                console.log(response);
                setProfile(response.data)
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
        fetchProfile();
    }, []);

    if (loading) return <div>Loading..</div>
    if (error) return <div>Error!</div>

    
    return (
        <div>
            {profile === null ? 
                <Button variant="contained" color="primary">
                    LOL 매칭 카드 만들기
                </Button>
            :
                <LOLCard 
                    profile={profile}
                />
            }
        
        </div>
    )
}


export default MyLOLCard
