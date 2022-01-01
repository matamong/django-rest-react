import React from 'react'
import { Link } from 'react-router-dom'
import ProgressBarLine from './ProgressBarLine'
import { Hearing, KeyboardVoice, AccessTime } from '@material-ui/icons';
import { Chip } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import './messageUsergameProfile.scss'

const MessageUsergameProfile = ({ name, game_name, game_nickname, lv, mic, prefer_style, prefer_time, rank, region, consent, profile, tier }) => {

    return (
        <div className="messageUsergameProfile__container">
            <div className="courses-container">
                <div className="course">
                    <div className="course-preview">
                        <h6>Profile</h6>
                        <div className="course-preview-left"><Avatar src={profile.avatar_url}/></div>
                        <div className="course-preview-left">{name}</div>
                        <div className="course-preview-left">
                            {mic === 'MIC' ? <KeyboardVoice fontSize="small" /> : ''}
                            {mic === 'HEARING' ? <Hearing fontSize="small" /> : ''}
                            {mic === 'RANDOM_MIC' ? <AccessTime fontSize="small" /> : ''}
                        </div>
                        <div className="course-preview-left">{tier}</div>
                    </div>
                    <div className="course-info">
                        <div className="progress-container">
                            <span className="progress-text">
                                <Link to={`/${game_name}/${name}`}>더 보기(준비 중) &#62;</Link>
				            </span>
                        </div>
                        <div className="progress-info-container">
                            <div className="progress-info-title">
                                <h4>{game_nickname}</h4>
                                <h6>{profile.title}</h6>
                            </div>
                            <div className="progress-info-content">
                                <div className="progressbar">
                                    <ProgressBarLine animate={prefer_style * 0.1} />
                                </div>
                                <div className="time">
                                    <h6>{prefer_time}</h6>
                                </div>
                                <div className="prefer">
                                    <Chip label="AI대전" color={"primary"} clickable={true} />
                                    <Chip label="빠른대전" color={"primary"} clickable={true} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageUsergameProfile