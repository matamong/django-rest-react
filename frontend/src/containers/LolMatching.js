import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/LOLCard'
import LOLMatchingCards from '../components/LOLMatchingCards'
import LOLAllMatchingCards from '../components/LOLAllMatchingCards'

const LolMatching = () => {

    return (
        <div>
            <LOLMatchingCards />
            <LOLAllMatchingCards />
        </div>
    )
}

export default LolMatching;