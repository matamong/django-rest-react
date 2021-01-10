import react from 'react'
import './profileToken.scss'
import AlarmIcon from '@material-ui/icons/Alarm';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const ProfileToken = (props) => {
    return (
        <span className="profileToken">
            <div className="profileToken__content">
                <div className="profileToken__card">
                    <div className="profileToken__card__firstinfo">
                        <img src="https://randomuser.me/api/portraits/lego/6.jpg"/>
                        <div className="profileToken__card__profileinfo">
                            <h3 className="profileToken__card__name"> {props.profile.name} </h3>
                            <h4 className="profileToken__card__title"> 스타듀밸리 주민 </h4>
                            <p>
                                <div className="profileToken__card__bio">
                                    <FavoriteIcon /> 51
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="profileToken__badgescard">
                    <span className="profileToken__badgescard__icon">
                        <AlarmIcon fontSize="small" />
                    </span>
                </div>
            </div>
        </span>
    )
}

export default ProfileToken