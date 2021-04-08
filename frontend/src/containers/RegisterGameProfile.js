import react , { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import ProgressBarSemiCircle from '../components/ProgressBarSemiCircle'
import ProgressBarLine from '../components/ProgressBarLine'
import './registerGameProfile.scss'


const RegisterGameProfile = () => {
    const pathname = useLocation().pathname;
    const pathArr = pathname.split('/')

    console.log(pathArr)
    const searchName = pathArr[1]
    const gameName = pathArr[2]
    const userName = pathArr[3]

    const catchUrl = () => {
        if (searchName === 'profile') {
            return `${process.env.REACT_APP_API_URL}/api/matching/${gameName}/usergame/user/${userName}`
        }else {
            return `${process.env.REACT_APP_API_URL}/api/matching/${gameName}/usergame/user/${userName}`
        }
    }

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

            
            axios.get(catchUrl(), config)
                .then(function (response) {
                    console.log(response.data);
                    setProfile(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (e) {
            setError(false);
            console.log(e)
        }
        setLoading(false)

    }

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) return <div>loading..</div>
    if (error) return <div>error!</div>
    
    //없으면 찾을 수 없다고 하기
    if (!profile) return <div>후로피루 읎어</div>

    return (
        <div className="registerGameProfile__container">
            <div className="registerGameProfile__profile__container">
                <div className="registerGameProfile__profile__item">
                    <div className="registerGameProfile__profile__info">
                        <span className="registerGameProfile__info__tier">
                            <img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/04_gold/images/gold_baseface_matte.png" />
                        </span>
                        <img className="registerGameProfile__info__img" src={profile.main_champ_info.champion_image}></img>
                        <div className="registerGameProfile__info__title"><h2>마석용</h2></div>
                        <p>후로피루후로후로피루후로피루후로피루후로피루후로피루후로피루후로피루후로피루후로피루후로피루피루후로피루</p>
                    </div>
                </div>
                <div className="registerGameProfile__profile__item">
                    <div><ProgressBarSemiCircle animate={0.5} /></div>
                    <div>후로피루후로피루후로후로피루후로피루후로피루후로피루후로피루후로피루후로피루피루</div>
                </div>
                <div className="registerGameProfile__profile__item"><div><ProgressBarSemiCircle animate={0.2} /></div><div>후로피루후로피루후로피루후로피루후로피루후로피루후로피루후로피루</div></div>
                <div className="registerGameProfile__profile__item"><div><ProgressBarSemiCircle animate={1} /></div><div>후로피루후로피루후로피루후로피루후로피루후로피루후로피루후로피루후로피루후로피루후로피루</div></div>
            </div>
        </div>
    )
}

export default RegisterGameProfile