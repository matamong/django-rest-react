import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { send_matching_message, update_matching_message_room, delete_matching_message_room } from '../actions/matching';
import './chatscreen.scss'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import MessageUsergameProfile from './MessageUsergameProfile'


const ChatScreen = ({ history, props, isAuthenticated, user, send_matching_message, update_matching_message_room, delete_matching_message_room }) => {
    const [chatContents, setChatContents] = useState(null)
    const [chatRoomInfo, setChatRoomInfo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [input, setInput] = useState(''); //keep track input type

    const messageRef = useRef();

    const pathname = useLocation().pathname;
    var regex = /\d+/g;
    var messageroom_id = Number(pathname.match(regex));

    const fetchChatInfo = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        try {
            setError(null);
            setChatRoomInfo(null);
            setLoading(true);
            axios.get("/api/messages/rooms/" + messageroom_id, config)
                .then(function (response) {
                    console.log(response.data);
                    setChatRoomInfo(response.data)
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

    const fetchChatContent = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        try {
            setError(null);
            setChatContents(null);
            setLoading(true);
            axios.get(`${process.env.REACT_APP_API_URL}/api/messages/` + messageroom_id, config)
                .then(function (response) {
                    setChatContents(response.data)
                })
                .catch(function (error) {
                    setError(true);
                });
        } catch (e) {
            setError(true);
            console.log(e)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchChatContent()
        fetchChatInfo()
    }, []);

    /**
    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest'
                })
        }
    }, [chatContents])
     */

    const handleSend = (e) => {
        send_matching_message(messageroom_id, input).then(setInput(""))
    };

    const handleConsent = (e) => {
        update_matching_message_room(messageroom_id).then(function(result){
            setTimeout(function() {
                window.location.reload();
              }, 1500);
        })
    }

    const handleDelete = (e) => {
        delete_matching_message_room(messageroom_id).then(function(result){
            setTimeout(function() {
                history.goBack()
              }, 1500);
        })
    }

    if (loading) return <div>loading..</div>
    if (error) return <div>error!</div>
    if (!chatContents) return null
    if (!chatRoomInfo) return null


    return (
        <div>
            <div className="chatScreen" ref={messageRef}>
                <p className="chatScreen__info">
                    &#127882; 매칭방이 열렸어요! &#127882; <br /> 상대방과 쪽지를 나누며 일정을 잡아보세요 :)
                </p>
                <p className="chatScreen__info">{chatRoomInfo.sender.name}님이 매칭요청을 했어요.</p>
                <div className="chatScreen__matchingUserGameProfile">
                    {chatRoomInfo.sender !== user ?
                        <div className="chatScreen__receiveUserGameProfile">
                            <MessageUsergameProfile
                                game_nickname={chatRoomInfo.sender_usergame_profile.game_nickname}
                                lv={chatRoomInfo.sender_usergame_profile.lv}
                                mic={chatRoomInfo.sender_usergame_profile.mic}
                                prefer_style={chatRoomInfo.sender_usergame_profile.prefer_style}
                                prefer_time={chatRoomInfo.sender_usergame_profile.prefer_time}
                                region={chatRoomInfo.sender_usergame_profile.region}
                                name={chatRoomInfo.sender.name}
                                game_name={chatRoomInfo.game_name}
                                profile={chatRoomInfo.sender.profile}
                            />
                        </div>
                        : 
                            <MessageUsergameProfile
                            game_nickname={chatRoomInfo.receiver_usergame_profile.game_nickname}
                            lv={chatRoomInfo.receiver_usergame_profile.lv}
                            mic={chatRoomInfo.receiver_usergame_profile.mic}
                            prefer_style={chatRoomInfo.receiver_usergame_profile.prefer_style}
                            prefer_time={chatRoomInfo.receiver_usergame_profile.prefer_time}
                            region={chatRoomInfo.receiver_usergame_profile.region}
                            game_name={chatRoomInfo.game_name}
                            profile={chatRoomInfo.receiver.profile}
                            />

                    }

                </div>
                {chatRoomInfo.receiver_consent === false ?
                    <p className="chatScreen__info">
                        &#129300; {chatRoomInfo.receiver.name}님이 매칭을 고민 중입니다.. <br /> 매칭을 수락하면 게임 닉네임이 공개돼요.
                        </p>
                    :
                    <p className="chatScreen__info">
                        &#128588; 매칭이 수락되었습니다! <br />  상대방과 쪽지를 나누며 일정을 잡아보세요. :)
                        </p>
                }
                {chatContents.map((message, index) =>
                    message.reply_user.name !== user.name ? (
                        <div className="chatScreen__message" key={index} id={index}>
                            <Avatar
                                calssName="chatScreen__image" src="https://raw.githubusercontent.com/matamatamong/img/main/Django-rest-React/Front/avatar.png"
                            />
                            <p className="chatScreen__text">{message.content}</p>
                        </div>
                    ) : (
                            <div className="chatScreen__message" key={index} id={index}>
                                <p className="chatScreen__textUser">{message.content}</p>
                            </div>
                        )
                )}
                <div className="chatScreen__border"></div>
                {
                    chatRoomInfo.receiver_consent === true ?
                        <form className="chatScreen__input">
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                className="chatScreen__inputField"
                                placeholder="메시지를 입력하세요."
                                type="text"
                            />
                            <button onClick={handleSend} type="submit" className="chatScreen__inputButton">보내기</button>
                        </form>

                        :
                        (chatRoomInfo.receiver.name === user.name ?
                            <form className="chatScreen__input">
                                <div className="chatScreen__consent">
                                    <div>
                                        <Button variant="contained" color="primary" onClick={handleConsent} >
                                            매칭수락
                                        </Button>
                                    </div>

                                    <div>
                                        <Button variant="contained" color="secondary" onClick={handleDelete}>
                                            매칭거절
                                        </Button>
                                    </div>
                                </div>
                            </form>
                            :
                            <form className="chatScreen__input">
                                <input
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    className="chatScreen__inputField"
                                    placeholder="상대방이 수락하면 쪽지를 보낼 수 있어요."
                                    type="text"
                                    disabled
                                />
                                <button onClick={handleSend} type="submit" className="chatScreen__inputButton" disabled>보내기</button>
                            </form>
                        )

                }

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { send_matching_message, update_matching_message_room, delete_matching_message_room })(ChatScreen)
