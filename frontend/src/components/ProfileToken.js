import react from 'react'
import './profileToken.scss'
import AlarmIcon from '@material-ui/icons/Alarm';


const ProfileToken = () => {
    return (
        <span className="profileToken">
            <div className="profileToken__content">
                <div className="profileToken__card">
                    <div className="profileToken__card__firstinfo">
                        <img src="https://randomuser.me/api/portraits/lego/6.jpg"/>
                        <div className="profileToken__card__profileinfo">
                            <h3> 마석용 </h3>
                            <h4> Over Watch </h4>
                            <p>
                                <div className="profileToken__card__bio">
                                    아이콘 아이콘 아이콘 
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