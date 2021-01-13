import React , { useState, useEffect  }from 'react'
import MyLoLCard from '../components/MyLOLCard'
import ProfileToken from '../components/ProfileToken'
import axios from 'axios'
import { connect } from 'react-redux';
import './mypage.scss'


const MyPage = () => {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchProfile = async () => {
        const config = {
            headers : {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        try {
            setError(null);
            setProfile(null);
            setLoading(true);
            
            axios.get(`${process.env.REACT_APP_API_URL}/api/users/my`, config)
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

    console.log(profile)
    return (
        <div className="mypage__container">
            <div className="mypage__profileToken__container">
                <div className="mypage__profileToken__item">
                    <ProfileToken profile={profile} />
                </div>
            </div>
            <div className="mypage__card__container">
                <ul className="mypage__card__item">
                    <li><MyLoLCard /></li>
                </ul>                
            </div>
        </div>
    )
}


export default MyPage