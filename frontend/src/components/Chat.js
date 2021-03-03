import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {delete_matching_message_room } from '../actions/matching';
import { Hearing, KeyboardVoice, AccessTime } from '@material-ui/icons';
import ForwardIcon from '@material-ui/icons/Forward';
import Avatar from '@material-ui/core/Avatar'
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/ko'
import './chat.scss'

const GameLogo = {
     lol : {
        src: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lcu-bootstrap-ui/global/default/images/lol-logo-4x.png",
        style: {
            height: "51px",
            margin: "22px 12px"
        },
        label: "rgb(170, 123, 54)"
    }
};

Moment.globalLocale = 'ko';

const Chat = ({ user, id, delete_matching_message_room, sender, receiver, consent, game_name, region, lv, rank, prefer_time, prefer_style, mic, created_at, message}) => {
    console.log(message)
    const [active, handleActive] = useState(false);

    const handleOnDelete = (e) => {
        delete_matching_message_room(id).then(function(result){
            setTimeout(function() {
                window.location.reload();
              }, 1500);
        })
    }

    return (
        <div className="chat__canvas">
            <div className="chat_container">
                <div className="chat__wrapper">
                    <div
                        className="chat__card__container"
                        style={{
                            height: active ? `20rem` : `7rem`,
                            transition: "0.9s"
                        }}
                        onClick={() => {
                            handleActive(!active);
                        }}
                    >
                        <div className="firstDisplay">
                            <div className="flightDetail">
                                <div
                                    className="detailLabel"
                                    style={{ fontWeight: "bold", color: GameLogo[`${game_name}`].label }}
                                >
                                    From
                                </div>
                                {sender}
                                <div className="detailLabel">프로 찍먹러(칭호)</div>
                            </div>
                            <div
                                className="flightDetail"
                                style={{
                                    marginTop: "15px"
                                }}
                            >
                                <ForwardIcon fontSize="large" />
                            </div>
                            <div className="flightDetail">
                                <div
                                    className="detailLabel"
                                    style={{ fontWeight: "bold", color: GameLogo[`${game_name}`].label }}
                                >
                                    To
                                </div>
                                {receiver}
                                <div className="detailLabel">5살에 데몬을 잡은</div>
                            </div>
                        </div>
                        <div
                            className="first"
                            style={{
                                transform: active
                                    ? `rotate3d(1, 0, 0, -180deg)`
                                    : `rotate3d(1, 0, 0, 0deg)`,
                                transitionDelay: active ? "0s" : "0.3s"
                            }}
                        >
                            <div className="firstTop">
                                <img className="fistTop__img" style={GameLogo[`${game_name}`].style} src={GameLogo[`${game_name}`].src} />
                                <div className="timecontainer">
                                    <div className="detailDate">
                                        10살에 데몬을 잡은
                                        <div className="detailTime">
                                            {user.name === sender ? (receiver) : (sender)}
                                        </div>
                                    </div>
{/*                                     <img
                                        style={{
                                            wclassNameth: "30px",
                                            height: "26px",
                                            marginTop: "22px",
                                            marginLeft: "16px",
                                            marginRight: "16px"
                                        }}
                                        src="https://github.com/pizza3/asset/blob/master/airplane2.png?raw=true"
                                    /> */}
 {/*                                    <div className="detailDate">
                                        프로 찍먹러(칭호)
                                        <div className="detailTime">최대여섯글자여덟</div>
                                        June 12
                                    </div> */}
                                </div>
                            </div>
                            <div className="firstBehind">
                                <div className="firstBehindDisplay">
                                    <div className="firstBehindTop">
                                        <div className="detail" style={{margin: "-0.1rem 0 0.6rem 0"}}>
                                            {prefer_time}
                                        </div>
                                    </div>
                                    <div className="firstBehindBottom">
                                        <div className="firstBehindRow">
                                            {/*                             <div className="detail">
                                6:20 - 8:45
                                <div className="detailLabel">Flight Time</div>
                                </div> */}
                                            <div className="detail">
                                                {lv}
                                                <div className="detailLabel">Lv</div>
                                            </div>
                                        </div>
                                        <div className="firstBehindRow">
                                            {/*                             <div className="detail">
                                                    2h 25 min
                                                    <div className="detailLabel">Duration</div>
                                            </div> */}
                                            <div className="detail">
                                                {rank.solo_tier}<div className="detailLabel">랭크(솔로기준)</div>
                                            </div>
                                        </div>
                                        <div className="firstBehindRow">
                                            {/*                             <div className="detail">
                                5:35
                                <div className="detailLabel">Boarding</div>
                            </div> */}
                                            <div className="detail">
                                                20A
                                                <div className="detailLabel">Seat</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="second"
                                    style={{
                                        transform: active
                                            ? `rotate3d(1, 0, 0, -180deg)`
                                            : `rotate3d(1, 0, 0, 0deg)`,
                                        transitionDelay: active ? "0.2s" : "0.2s"
                                    }}
                                >
                                    <div className="secondTop" />
                                    <div className="secondBehind">
                                        <div className="secondBehindDisplay">
                                            <div className="price">
                                                {mic === 'MIC' ? <KeyboardVoice fontSize="small" /> : ''}
                                                {mic === 'HEARING' ? <Hearing fontSize="small" /> : ''}
                                                {mic === 'RANDOM_MIC' ? <AccessTime fontSize="small" /> : ''}
                                                <div className="priceLabel">마이크</div>
                                            </div>
                                            <div className="price">
                                                {region}
                                                <div className="priceLabel">지역</div>
                                            </div>
                                            <div className="price">
                                            <Moment fromNow>{created_at}</Moment>
                                                <div className="priceLabel">매칭 요청일</div>
                                            </div>
{/*                                             <img
                                                className="barCode"
                                                src="https://github.com/pizza3/asset/blob/master/barcode.png?raw=true"
                                            /> */}
                                        </div>
                                        <div
                                            className="third"
                                            style={{
                                                transform: active
                                                    ? `rotate3d(1, 0, 0, -180deg)`
                                                    : `rotate3d(1, 0, 0, 0deg)`,
                                                transitionDelay: active ? "0.4s" : "0s"
                                            }}
                                        >
                                            <div className="thirdTop" />
                                                <div className="secondBehindBottom">
                                                    <Link to={`/matching-chat-detail/${id}`}>
                                                        <button
                                                            className="button"
                                                            style={{
                                                                color: GameLogo[`${game_name}`].label,
                                                                border: `1px solid ${GameLogo[`${game_name}`].label}`
                                                            }}
                                                        >   
                                                        매칭방 가기
                                                        </button>
                                                    </Link>
                                                    <button
                                                            className="button"
                                                            onClick={handleOnDelete}
                                                            style={{
                                                                color: 'rgb(220, 0, 0)',
                                                                border: `1px solid rgb(220, 0, 78)`
                                                            }}
                                                        >   
                                                        매칭방 탈퇴
                                                        </button>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="chat__message__container">
                        
                            {message.content === '' ? <p className="chat__message__Nocontent"></p> : <div className="chat__message__content">{message.content}</div>}
                        
                        
                            {message.content === '' ? '' : (<div className="chat__message__time"><Moment fromNow>{message.time_stamp}</Moment></div>)}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, { delete_matching_message_room })(Chat)