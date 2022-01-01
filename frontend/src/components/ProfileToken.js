import react from 'react'
import './profileToken.scss'
import AlarmIcon from '@material-ui/icons/Alarm';
import FavoriteIcon from '@material-ui/icons/Favorite';

const ProfileToken = (props) => {
    return (
        <span className="profileToken">
            <div className="profileToken__content">
                <div className="profileToken__card">
                    <div className="profileToken__card__firstinfo">
                        <img src={props.profile.profile.avatar_url}/>
                        <div className="profileToken__card__profileinfo">
                            <h3 className="profileToken__card__name"> {props.profile.name} </h3>
                            <h4 className="profileToken__card__title"> {props.profile.profile.title} </h4>
                            <div>
                                <div className="profileToken__card__bio">
                                    <FavoriteIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profileToken__badgescard">
                    <span className="profileToken__badgescard__icon">
                    </span>
                </div>
            </div>
        </span>
    )
}

export default ProfileToken