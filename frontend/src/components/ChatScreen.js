import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import './chatscreen.scss'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'


const ChatScreen = ({props, isAuthenticated, user }) => {
    const [chatContents, setChatContents] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [input, setInput] = useState(''); //keep track input type
  
    const pathname = useLocation().pathname;
    var regex = /\d+/g;
    var messageroom_id = Number(pathname.match(regex));

    const fetchChatContent = async() => {
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
            console.log('으아아앙')
            axios.get(`${process.env.REACT_APP_API_URL}/api/messages/` + messageroom_id, config)
            .then(function (response) {
                console.log(response.data);
                setChatContents(response.data)
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

    useEffect(() => {
        fetchChatContent();
    }, []);

    const handleSend = (e) => {
        e.preventDefault(); //엔터칠때 리프레쉬 되는거 방지해줌
        //setChatContents([...chatContents, { input }]);
        setInput(""); //Input 초기화
    };

    if (loading) return <div>loading..</div>
    if (error) return <div>error!</div>
    if (!chatContents) return null


    return (
        <div>
            <div className="chatScreen">
            <p className="chatScreen__timestamp">You matched with matamong on 10/08/20</p>
            {chatContents.map((message) => 
                message.reply_user.name !== user.name ? (
                    <div className="chatScreen__message">
                        <Avatar
                            calssName="chatScreen__image"
                        />
                        <p className="chatScreen__text">{message.content}</p>
                    </div>
                ) : (
                        <div className="chatScreen__message">
                            <p className="chatScreen__textUser">{message.content}</p>
                        </div>
                )
            )}
            <form className="chatScreen__input">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="chatScreen__inputField"
                    placeholder="메시지를 입력하세요."
                    type="text" />
                <button onClick={handleSend} type="submit" className="chatScreen__inputButton">보내기</button>
            </form>
        </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps)(ChatScreen)