import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/LOLCard'
import LOLMatchingCards from '../components/LOLMatchingCards'
import LOLAllMatchingCards from '../components/LOLAllMatchingCards'
import './lolmatching.scss'

const LolMatching = () => {

    return (
        <div className="lolmatching__container">
            <h1>넘나 씐나는 매츼이잉</h1>
            <div className="lolmatching__cards__container">
                <LOLMatchingCards />
            </div>
            <div className="lolmatching__all__container">
                <LOLAllMatchingCards />
            </div>
        </div>
    )
}

export default LolMatching;