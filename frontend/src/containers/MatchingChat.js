import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
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

            axios.get(`${process.env.REACT_APP_API_URL}/api/messages/rooms`, config)
            .then(function (response) {
                setChatList(response.data)
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
            });
        } catch (e) {
            setError(true);
            
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchMatchingChatList();
    }, []);


    //if (!isAuthenticated)
    //    return <Redirect to='/login' />;
    if (loading) return <div>Loading..</div>
    if (error) return <div>Error!</div>
    if(!chatList) return null


    return (
        <div className="matchingChat__container">
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});


export default connect(mapStateToProps)(MatchingChat)