import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import Chat from '../components/Chat'
import { Redirect } from 'react-router-dom';
import Error from '../containers/Error'
import './matchingchat.scss'


const MatchingChat = ({ isAuthenticated, user }) => {
    const [chatList, setChatList] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchMatchingChatList = async() => {
        const config = {
            headers : {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        try {
            setError(null);
            setChatList(null);
            setLoading(true);

            axios.get("/api/messages/rooms", config)
            .then(function (response) {
                setChatList(response.data)
            })
            .catch(function (error) {
                setLoading(false)
                setError(true);
            });
        } catch (e) {
            setError(true);
            
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchMatchingChatList();
    }, []);

    if (!isAuthenticated)
    return <Redirect to="/login" />;


    //if (!isAuthenticated)
    //    return <Redirect to='/login' />;
    if (loading) return <div>Loading..</div>
    if (error) return <Error />
    if(!chatList) return null


    return (
        <div className="matchingChat__container">
            <div className="matchingChat__title">
                <span className="matchingChat__title__emoji">&#128172;</span>
                <p className="matchingChat__title__second">매칭을 신청하거나 신청받으면 매칭방이 생깁니다! <br />매칭방에서 쪽지를 주고받으며 일정을 잡아보세요.</p>
            </div>
            {chatList.map((chat, index) => (
                chat.sender.name === user.name ?
                <Chat 
                    user={user}
                    id={chat.id}
                    sender={chat.sender.name}
                    senderProfile={chat.sender.profile}
                    receiver={chat.receiver.name}
                    receiverProfile={chat.receiver.profile}                    
                    created_at={chat.created_at}
                    game_name={chat.game_name}
                    consent={chat.receiver_consent}
                    profile={chat.receiver.profile}
                    lv={chat.receiver_usergame_profile.lv}
                    mic={chat.receiver_usergame_profile.mic}
                    prefer_time={chat.receiver_usergame_profile.prefer_time}
                    prefer_style={chat.receiver_usergame_profile.prefer_style}
                    region={chat.receiver_usergame_profile.region}
                    rank={chat.receiver_usergame_profile.rank}
                    message={chat.last_message}
                />
                :
                <Chat 
                    user={user}
                    id={chat.id}
                    sender={chat.sender.name}
                    senderProfile={chat.sender.profile}
                    receiver={chat.receiver.name}
                    receiverProfile={chat.receiver.profile}                    
                    created_at={chat.created_at}
                    game_name={chat.game_name}
                    consent={chat.receiver_consent}
                    profile={chat.sender.profile}
                    lv={chat.sender_usergame_profile.lv}
                    mic={chat.sender_usergame_profile.mic}
                    prefer_time={chat.sender_usergame_profile.prefer_time}
                    prefer_style={chat.sender_usergame_profile.prefer_style}
                    region={chat.sender_usergame_profile.region}
                    rank={chat.sender_usergame_profile.rank}
                    message={chat.last_message}
                />
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});


export default connect(mapStateToProps)(MatchingChat)
