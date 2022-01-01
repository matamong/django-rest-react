import React , { useState, useEffect  }from 'react'
import { Link, Redirect } from 'react-router-dom';
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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import UserDeleteButton from '../components/UserDeleteButton'
import LOLMatchingList from '../components/LOLMatchingList'
import EditIcon from '@material-ui/icons/Edit';
import Error from '../containers/Error'

const MyPage = ({ isAuthenticated }) => {
    
    const [profile, setProfile] = useState(null)
    const [lolusergames, setLolusergames] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    let myUser = '/api/users/my'
    let myUsergames = '/api/matching/my/usergames'

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
            setLolusergames(null);
            setLoading(true);

            axios.all([
                axios.get(myUser, config), 
                axios.get(myUsergames, config)
            ]).then(axios.spread((responseMyUser, responseMyUsergames) => {
                const responseMyUserData = responseMyUser.data
                const responseMyUsergamesData = responseMyUsergames.data

                setProfile(responseMyUserData)
                setLolusergames(responseMyUsergamesData.LolUserGame[0])
                // use/access the results 
              })).catch(errors => {
                setLoading(false);
                setError(true)
              })
            
        } catch (e) {
            setError(true);
        }
        setLoading(false)
    }


    useEffect(() => {
        fetchProfile();
    }, []);


    if (!isAuthenticated)
        return <Redirect to='/login' />;
    if (loading) return <div>Loading..</div>
    if (error) return <Error />
    if (!profile) return null
    if (!lolusergames) return null

    
    return (
        <div className="mypage__container">
            <div className="mypage__profileToken__container">
                <div className="mypage__profileToken__background"></div>
                <div className="mypage__profileToken__item">
                    <ProfileToken profile={profile}  />
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
                            <Tab icon={<FavoriteIcon />} label="coming soon" />
                            <Tab icon={<ChatBubbleOutlineIcon />} label="coming soon" />
                            <Tab icon={<ThumbUpAltIcon />} label="coming soon" />
                        </Tabs>
                            
                    </Paper>
                </div>
            </div>
            <div className="mypage__card__container">
                <h2 className="mypage__card__title">
                    <div><SportsEsportsIcon /></div><div>나의 매칭 정보</div>
                </h2>
                <ul className="mypage__card__list">
                    <li>
                        <div className="mypage__list__item">
                            <div className="mypage__item__card">
                                <LOLMatchingList
                                    isMyUsergame={true}
                                    name={profile.name}
                                    odds={lolusergames.odds.odds}
                                    intro={lolusergames.intro}
                                    main_champ_info={lolusergames.main_champ_info}
                                    lol_position={lolusergames.lol_position}
                                    lol_prefer_mode={lolusergames.lol_prefer_mode}
                                    prefer_style={lolusergames.prefer_style}
                                    prefer_time={lolusergames.prefer_time}
                                    region={lolusergames.region}
                                    solo_rank={lolusergames.solo_rank}
                                    solo_tier={lolusergames.solo_tier}
                                    profile={profile.profile}
                                    mic={lolusergames.mic}
                                />  
                            </div>
                            <div className="mypage__card__icon">
                                <Link to="/lol-update-form">
                                    <IconButton><EditIcon /></IconButton>
                                </Link>
                            </div>
                        </div>
                    </li>
                </ul>                
            </div>
            <div className="mypage__button">
                <div className="mypage__button__item" >
                    <Button variant="outlined" color="primary" disabled>회원정보 수정</Button>
                </div>
                <div className="mypage__button__item">
                    <UserDeleteButton />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(MyPage)
