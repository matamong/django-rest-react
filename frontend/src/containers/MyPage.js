import React , { useState, useEffect  }from 'react'
import MyLoLCard from '../components/MyLOLCard'
import ProfileToken from '../components/ProfileToken'
import axios from 'axios'
import { connect } from 'react-redux';
import './mypage.scss'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

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
                <div className="mypage__profileToken__background"></div>
                <div className="mypage__profileToken__item">
                    <ProfileToken profile={profile} />
                </div>
            </div>
            <div className="mypage__profilemenue__container">
                <div className="mypage__profilemenue__item">
                    <Paper square>
                        <Tabs
                            variant="fullWidth"
                            indicatorColor="secondary"
                            textColor="secondary"
                            aria-label="icon label tabs example"
                        >
                            <Tab icon={<FavoriteIcon />} label="50" />
                            <Tab icon={<ChatBubbleOutlineIcon />} label="50" />
                            <Tab icon={<ThumbUpAltIcon />} label="34" />
                        </Tabs>
                            
                    </Paper>
                </div>
            </div>
            <div className="mypage__card__container">
                <h2 className="mypage__card__title">
                    <div><SportsEsportsIcon /></div><div>등록된 매칭게임</div>
                </h2>
                <ul className="mypage__card__item">
                    <li><MyLoLCard /></li>
                </ul>                
            </div>
            <div>아바타바꾸기/호칭바꾸기 는 프로필 토큰에서 해부러,  
                회원정보 수정비번수정/삭제, 
                매칭 등록/수정/삭제는 각 카드에 해부러, </div>
        </div>
    )
}


export default MyPage