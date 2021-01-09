import React , { useState, useEffect  }from 'react'
import MyLoLCard from '../components/MyLOLCard'
import ProfileToken from '../components/ProfileToken'
import axios from 'axios'
import { connect } from 'react-redux';
import './mypage.scss'


const MyPage = () => {

    return (
        <div className="mypage__container">
            <div className="mypage__profileToken__container">
                <div className="mypage__profileToken__item">
                    <ProfileToken />
                </div>
            </div>
            <div className="mypage__card__container">
                <ul className="mypage__card__item">
                    <li><MyLoLCard /></li>
                </ul>                
            </div>
        </div>
    )
}


export default MyPage