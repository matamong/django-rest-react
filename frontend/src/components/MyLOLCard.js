import React, { useState, useEffect  } from 'react'
import axios from 'axios'
import LOLCard from './LOLCard'


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
            
            axios.get(`${process.env.REACT_APP_API_URL}/api/matching/lol/my/usergame`, config)
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
    if (!profile) return null


    return (
        <div>
            {profile !== null ? 
                <LOLCard 
                    name={profile.lol_name}
                    region={profile.region}
                    intro={profile.intro}
                    prefer_style={profile.prefer_style}
                    prefer_time={profile.prefer_time}
                    main_champion_name={profile.main_champ_info.name}
                    main_champion_avatar={profile.main_champ_info.champion_avatar}
                />
            :
                <div>등록하세요!</div>
            }
        
        </div>
    )
}


export default MyLOLCard