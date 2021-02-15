import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar'
import './chat.scss'


const Chat = ({ user, id, sender, receiver, game_name, created_at }) => {
    console.log(id, sender, receiver, created_at)
    console.log(user)

    return (
        <div className="chat_container">
            <Link to={`/matching-chat-detail/${id}`}>
                <div className="chat">
                    <Avatar className="chat__image" />
                    <div className="chat__details">
                        {sender === user.name ? <h3>{receiver}</h3> : <h3>{sender}</h3>}
                        <p>이이이거는 나중에 머 해야겠따</p>
                    </div>
                    <p className="chat__timestamp">2초전</p>
                </div>
            </Link>
        </div>
    )

}

export default Chat